import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { autocompleteSchema } from './autocomplete-schema'

import { autocompleteCommands } from './autocomplete-plugin'
import { dispatchAutocompleteTransaction } from './dispatch-autocomplete-transaction'
import { ProseEditor } from '@/components/prosemirror/helpers/types'

export function createProseEditorAutocomplete(
  domElement: Element
): ProseEditor {
  let state = EditorState.create({
    schema: autocompleteSchema,
    plugins: [autocompleteCommands],
  })

  let view = new EditorView(domElement, {
    state,

    dispatchTransaction: transaction => {
      dispatchAutocompleteTransaction(view, transaction)
    },
  })
  return { view, state }
}
