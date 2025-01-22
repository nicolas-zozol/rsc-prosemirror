import {
  Command,
  EditorState,
  TextSelection,
  Transaction,
} from 'prosemirror-state'
import { keymap } from 'prosemirror-keymap'
import { EditorView } from 'prosemirror-view'
import {
  AutocompleteBox,
  getAutocompleteBox,
  isBoxOpened,
  resetAutocompleteBox,
} from './autocomplete-ui'
import {
  detectWritingIntoTemporary,
  findTemporary,
} from './autocomplete-helpers'
import { getFakerByMode, getSchemaTypeByMode, MODE } from './mode'
import {
  getContentAt,
  removeNode,
} from '@/components/prosemirror/helpers/state-helper'

/**
 * This file handle the special keys and commands for the autocomplete feature.
 * It is responsible for handling the `@`, '#', '<>', 'Up & Down', 'Escape', and the Enter key.
 *
 * However, other keys also interact with the autocomplete box, by updating the content of the box
 * or even exiting it when no content is available.
 * This is done in the dispatchAutocompleteTransaction function.
 *
 */

const doEnter: Command = () => {
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

  return false
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

const handleFlowKey: Command = (
  state: EditorState,
  dispatch?: (tr: Transaction) => void,
  view?: EditorView
) => {
  if (!view) return false
  const { schema, tr } = state

  // Get the caret position
  const { $from } = state.selection
  const caretPosition = $from.pos

  const previousChar = getContentAt(state, caretPosition - 1, 1)
  const isFlowChar = previousChar === '<'

  if (isBoxOpened() && dispatch) {
    return false
  }

  if (!isFlowChar) {
    return false
  }

  // Create a temporary node with an empty string as content
  const temporaryNode = schema.nodes.temporary.create({}, schema.text('<>'))
  if (dispatch) {
    tr.replaceWith(caretPosition - 1, caretPosition, temporaryNode)

    const endPosition = caretPosition + 2
    tr.setSelection(TextSelection.create(tr.doc, endPosition))

    dispatch(tr)
  }

  // Show the autocomplete box
  showAutocompleteBox('FLOW', view)

  return true // Indicate the key was handled
}

const handleDelInterception: Command = (
  state: EditorState,
  dispatch?: (tr: Transaction) => void,
  view?: EditorView
) => {
  const previousState = state

  // Apply a dummy transaction for DEL
  let transaction = state.tr.delete(
    Math.max(0, state.selection.from - 1), // Go one step backward
    state.selection.to || state.selection.from
  )
  let newState = state.apply(transaction)

  // Check if we were writing into the `temporaryPeople` node
  const wasWritingBefore = detectWritingIntoTemporary(previousState)
  const isWritingAfter = detectWritingIntoTemporary(newState)

  const temporary = findTemporary(newState)
  let temporaryEmpty = false
  if (temporary) {
    if (temporary.node.textContent === '') {
      temporaryEmpty = true
      // adding to the transaction
      transaction = state.tr.delete(
        Math.max(0, state.selection.from - 2), // Go one step backward
        state.selection.to || state.selection.from
      )
    }
  }

  if (temporaryEmpty || (wasWritingBefore && !isWritingAfter)) {
    // Node was removed, reset the autocomplete box
    getAutocompleteBox()?.exit()
  }

  // Let ProseMirror handle the actual delete operation
  if (dispatch) {
    dispatch(transaction)
  }
  return true
}

export const autocompleteCommands = keymap({
  Enter: doEnter,
  '@': handleAtKey,
  '#': handleHashKey,
  '>': handleFlowKey,
  Delete: handleDelInterception,
  Backspace: handleDelInterception,
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

  autocomplete.setPosition(x + 10, y + 25) // Adjust position
  autocomplete
    .update('') // Initialize with the current match string
    .catch(error => {
      console.error('Error fetching autocomplete items:', error)
    })

  return autocomplete // Return the instance for external updates
}

// Function to handle inserting a PeopleNode
function insertModeNode(view: EditorView, name: string, mode: MODE): void {
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
