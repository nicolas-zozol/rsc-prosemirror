import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { dispatchBasicTransaction, ProseEditor } from '../prose-editor'
import { minimalSchema, minimalSchemaWithParagraph } from './minimal-schema'

export function createProseEditorMinimal(domElement: Element): ProseEditor {
  let state = EditorState.create({
    schema: minimalSchema,
    plugins: [], // minimalSchemaWithParagraph needs keymap
  })

  let view = new EditorView(domElement, {
    state,

    dispatchTransaction: transaction => {
      dispatchBasicTransaction(view, transaction)
    },
  })
  return { view, state }
}
