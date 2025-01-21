import { Schema, NodeSpec, MarkSpec } from 'prosemirror-model'

const autocompleteNodes: Record<string, NodeSpec> = {
  doc: {
    content: 'inline*',
  },
  text: {
    group: 'inline',
  },
  temporary: {
    group: 'inline',
    inline: true,
    atom: false, // Allow editing
    content: 'text*',
    toDOM: () => ['span', { class: 'temporary' }, 0],
    parseDOM: [{ tag: 'span.temporary' }],
  },
  people: {
    inline: true,
    atom: true,
    group: 'inline',
    attrs: { name: { default: '' } },
    toDOM: node => [
      'span',
      { class: 'mention', 'data-name': node.attrs.name },
      `@${node.attrs.name}`,
    ],
  },

  hashtag: {
    inline: true,
    atom: true,
    group: 'inline',
    attrs: { name: { default: '' } },
    toDOM: node => [
      'span',
      { class: 'hashtag', 'data-name': node.attrs.name },
      `#${node.attrs.name}`,
    ],
  },

  flow: {
    inline: true,
    atom: true,
    group: 'inline',
    attrs: { name: { default: '' } },
    toDOM: node => [
      'span',
      { class: 'flow', 'data-name': node.attrs.name },
      `#${node.attrs.name}`,
    ],
  },
}

const autocompleteMarks: Record<string, MarkSpec> = {}

export const autocompleteSchema = new Schema({
  nodes: autocompleteNodes,
  marks: autocompleteMarks,
})
