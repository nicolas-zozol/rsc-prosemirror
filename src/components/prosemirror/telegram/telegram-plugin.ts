import { Plugin } from 'prosemirror-state'

export const transformStopToEnd = new Plugin({
  appendTransaction(transactions, oldState, newState) {
    let docChanged = transactions.some(tr => tr.docChanged)
    if (!docChanged) return

    let { doc } = newState
    let tr = newState.tr
    let replaced = false

    doc.descendants((node, pos) => {
      if (replaced) {
        return false
      }
      if (node.type.name === 'stop') {
        let nextNode = doc.nodeAt(pos + node.nodeSize)
        if (nextNode && nextNode.type.name === 'stop') {
          // Replace the two `STOP` nodes with an `END` node
          let endNode = newState.schema.nodes.end.create()
          // we assume the size of a stop node is 1
          tr.replaceWith(pos, pos + 2, endNode)
          replaced = true
          return false // Stop further traversal
        }
      }
    })

    return replaced ? tr : null
  },
})

export const truncateAfterEndPlugin = new Plugin({
  appendTransaction(transactions, oldState, newState) {
    let docChanged = transactions.some(tr => tr.docChanged)
    if (!docChanged) return

    let { doc } = newState
    let tr = newState.tr
    let endFound = false

    const docSize = doc.content.size
    let endPosition: number | undefined = undefined

    doc.descendants((node, pos, parent) => {
      if (endFound) {
        return false
      }

      if (node.type.name === 'end') {
        if (!endFound) {
          endPosition = pos
        }
        endFound = true // Mark that END is found
        return false // Stop traversal
      }
    })

    // now deleting after the end
    if (endFound && endPosition) {
      tr.delete(endPosition + 1, docSize) // Remove content
    }

    return endFound ? tr : null
  },
})
