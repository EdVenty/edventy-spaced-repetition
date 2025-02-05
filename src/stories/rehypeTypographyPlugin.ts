/**
 * @import {Root} from 'hast'
 */

import {visit} from 'unist-util-visit';

/**
 * Add `id`s to headings.
 *
 * @returns
 *   Transform.
 */
export default function rehypeSlug() {
  /**
   * @param {Root} tree
   * @return {undefined}
   */
  return function (tree: any) {
    visit(tree, 'element', function (node) {
      if (
        node.tagName === 'h1' ||
        node.tagName === 'h2' ||
        node.tagName === 'h3' ||
        node.tagName === 'h4' ||
        node.tagName === 'h5' ||
        node.tagName === 'h6' ||
        node.tagName === 'p'
      ) {
        node.properties.className = `text-${node.tagName}`;
      }
    })
  }
}