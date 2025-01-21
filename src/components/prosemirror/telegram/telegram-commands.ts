import { Command, EditorState } from 'prosemirror-state'
import { keymap } from 'prosemirror-keymap'

const insertStopNode: Command = (state: EditorState, dispatch) => {
  const { schema, tr } = state
  const stopNode = schema.nodes.stop.create()
  if (dispatch) {
    dispatch(tr.replaceSelectionWith(stopNode).scrollIntoView())
  }
  return true
}

export const telegramCommands = keymap({
  Enter: insertStopNode,
})
