import {
  Command,
  EditorState,
  TextSelection,
  Transaction,
} from 'prosemirror-state'
import { keymap } from 'prosemirror-keymap'
import { getFakeHashtags, getFakeUsers } from './fake-data'
import { EditorView } from 'prosemirror-view'
import {
  AutocompleteBox,
  getAutocompleteBox,
  isBoxOpened,
} from './autocomplete-ui'
import { findTemporary } from './autocomplete-helpers'
import { getFakerByMode, getSchemaTypeByMode, MODE } from './mode'

/**
 * This file handle the special keys and commands for the autocomplete feature.
 * It is responsible for handling the `@`, '#', '<>', 'Up & Down', 'Escape', and the Enter key.
 *
 * However, other keys also interact with the autocomplete box, by updating the content of the box
 * or even exiting it when no content is available.
 * This is done in the dispatchAutocompleteTransaction function.
 *
 * @param state
 * @param dispatch
 */

const doEnter: Command = (state: EditorState, dispatch) => {
  if (isBoxOpened()) {
    const box = getAutocompleteBox()!
    const activeItem = box.getActiveItem()
    if (!activeItem) {
      return false
    } else {
      box.onSelect(activeItem)
      return true
    }
  }

  return true
}

// Keymap handler for the `@` character
const handleAtKey: Command = (
  state: EditorState,
  dispatch?: (tr: Transaction) => void,
  view?: EditorView
) => {
  if (!view) return false
  const { schema, tr } = state

  // Get the caret position
  const { $from } = state.selection
  const caretPosition = $from.pos

  if (isBoxOpened() && dispatch) {
    return insertAndUpdateText(view, '@')
  }

  // Create a temporary node with an empty string as content
  const temporaryNode = schema.nodes.temporary.create({}, schema.text('@'))
  if (dispatch) {
    tr.insert(caretPosition, temporaryNode)
    const endPosition = caretPosition + 2
    tr.setSelection(TextSelection.create(tr.doc, endPosition))

    dispatch(tr)
  } else {
    //console.log('### no dispatch')
  }

  // Show the autocomplete box
  showAutocompleteBox('PEOPLE', view)

  return true // Indicate the key was handled
}

const handleHashKey: Command = (
  state: EditorState,
  dispatch?: (tr: Transaction) => void,
  view?: EditorView
) => {
  if (!view) return false
  const { schema, tr } = state

  // Get the caret position
  const { $from } = state.selection
  const caretPosition = $from.pos

  if (isBoxOpened() && dispatch) {
    return insertAndUpdateText(view, '#')
  }

  // Create a temporary node with an empty string as content
  const temporaryNode = schema.nodes.temporary.create({}, schema.text('#'))
  if (dispatch) {
    tr.insert(caretPosition, temporaryNode)
    const endPosition = caretPosition + 2
    tr.setSelection(TextSelection.create(tr.doc, endPosition))

    dispatch(tr)
  } else {
    //console.log('### no dispatch')
  }

  // Show the autocomplete box
  showAutocompleteBox('HASHTAG', view)

  return true // Indicate the key was handled
}

export const autocompleteCommands = keymap({
  Enter: doEnter,
  '@': handleAtKey,
  '#': handleHashKey,
})

// Function to show the autocomplete box
function showAutocompleteBox(mode: MODE, view: EditorView): AutocompleteBox {
  const rect = view.dom.getBoundingClientRect()
  const cursorPos = view.coordsAtPos(view.state.selection.$from.pos)

  const x = cursorPos.left - rect.left
  const y = cursorPos.top - rect.top

  const faker = getFakerByMode(mode)

  const autocomplete = new AutocompleteBox(mode, {
    container: view.dom.parentElement as HTMLElement,
    fetch: faker,
    onSelect: item => {
      console.log('Selected:', item)
      insertModeNode(view, item, mode) // Insert the selected person node
      autocomplete.exit()
    },
    onClose: () => {
      console.log('Autocomplete box closed')
    },
  })

  autocomplete.setPosition(x + 30, y + 40) // Adjust position
  autocomplete
    .update('') // Initialize with the current match string
    .catch(error => {
      console.error('Error fetching autocomplete items:', error)
    })

  return autocomplete // Return the instance for external updates
}

// Function to handle inserting a PeopleNode
function insertModeNode(view: EditorView, name: string, mode: MODE): void {
  console.log('>>>> Inserting', { name, mode })
  const { state, dispatch } = view
  const { schema, tr } = state

  const tempNode = findTemporary(state)
  if (tempNode) {
    const { node, pos } = tempNode

    const modeNode = getSchemaTypeByMode(schema, mode).create({ name })

    const transaction = tr.replaceWith(pos, pos + node.nodeSize, modeNode)
    tr.insertText(' ')
    dispatch(transaction)
  }
}

function insertAndUpdateText(view: EditorView, text: string): boolean {
  const { state } = view

  const transaction = state.tr.insertText(text)
  const newState = state.apply(transaction)
  view.updateState(newState)
  return true
}
