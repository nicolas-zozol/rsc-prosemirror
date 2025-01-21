import { EditorView } from 'prosemirror-view'
import { EditorState, Transaction } from 'prosemirror-state'
import { Node } from 'prosemirror-model'
import { getAutocompleteBox } from './autocomplete-ui'
import {
  detectWritingIntoTemporary,
  extractMatchString,
  findTemporary,
} from './autocomplete-helpers'

/**
 * This function is responsible for handling the autocomplete box when the user types
 * regular text into the editor.
 * @param view
 * @param transaction
 */

export function dispatchAutocompleteTransaction(
  view: EditorView,
  transaction: Transaction
) {
  const initialState = view.state
  let newState = view.state.apply(transaction)
  view.updateState(newState)

  const writingIntoTemporary = detectWritingIntoTemporary(initialState)

  const box = getAutocompleteBox()
  const tempNode = findTemporary(newState)

  if (writingIntoTemporary && box && tempNode) {
    const matchString = extractMatchString(newState)

    box
      .update(matchString)
      .then(active => {
        if (active.found) {
          console.log('## active', active.found)
        } else {
          console.log('## not active, text replacing')
          // box exited, replace the temporary node by the matchString
          box.exit()
          const { pos, node } = tempNode
          newState = replaceNodeByText(newState, node, pos, matchString)
          view.updateState(newState)
        }
      })
      .catch(console.error)
  } else {
    //console.log('Not writing into tempPeople')
  }
}

function replaceNodeByText(
  state: EditorState,
  node: Node,
  pos: number,
  text: string
): EditorState {
  const { tr, schema } = state
  const nodeSize = node.nodeSize
  tr.replaceWith(pos, pos + nodeSize, schema.text(text))
  return state.apply(tr)
}
