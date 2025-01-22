import { EditorState } from 'prosemirror-state'
import { Node } from 'prosemirror-model'

import { findNodeByName } from '../helpers/state-helper'
import { NodeWithPos } from '../helpers/types'
import { MODE } from '@/components/prosemirror/autocomplete/mode'

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
export function extractMatchString(state: EditorState, mode: MODE): string {
  const node = findTemporary(state)
  if (!node) {
    return ''
  }
  const discriminator = mode === 'FLOW' ? 2 : 1

  return node.node.textContent?.substring(discriminator) || ''
}

// TODO: replace ths with a transaction
export function replaceTemporaryNode(state: EditorState): EditorState {
  const nodeWithPos = findTemporary(state)
  if (!nodeWithPos) {
    return state
  }
  const { node, pos } = nodeWithPos
  const text = node.textContent || ''
  return replaceNodeByText(state, node, pos, text)
}

export function replaceNodeByText(
  state: EditorState,
  node: Node,
  pos: number,
  text: string
): EditorState {
  const { tr, schema } = state
  const nodeSize = node.nodeSize
  return state.apply(tr.replaceWith(pos, pos + nodeSize, schema.text(text)))
}
