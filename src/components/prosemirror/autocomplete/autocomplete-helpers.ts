import { EditorState } from 'prosemirror-state'
import { findNodeByName } from '../helpers/state-helper'
import { NodeWithPos } from '../helpers/types'

export function detectWritingIntoTemporary(state: EditorState): boolean {
  return findTemporary(state) !== null
  /*
  const json = state.doc.toJSON()
  let containsTemporary = false
  if (json && json.content) {
    containsTemporary = json.content.some(
      (node: any) => node.type === 'temporary'
    )
  }
  return containsTemporary*/
}

export function findTemporary(state: EditorState): NodeWithPos | null {
  return findNodeByName(state, 'temporary')
}

// Helper to extract the match string (text without @ symbol)
export function extractMatchString(state: EditorState): string {
  const node = findTemporary(state)
  if (!node) {
    return ''
  }

  return node.node.textContent?.substring(1) || ''
}
