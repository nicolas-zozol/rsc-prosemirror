import { EditorView } from 'prosemirror-view'
import { Transaction } from 'prosemirror-state'
import { getAutocompleteBox } from './autocomplete-ui'
import {
  detectWritingIntoTemporary,
  extractMatchString,
  findTemporary,
  replaceNodeByText,
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
    const matchString = extractMatchString(newState, box.mode)

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
          // That depends on the mode !
          newState = replaceNodeByText(newState, node, pos, matchString)
          view.updateState(newState)
        }
      })
      .catch(console.error)
  } else {
    //console.log('Not writing into tempPeople')
  }
}
