import { marked } from 'marked'
import type { Plugin } from 'vite'
import { parseEntry } from '../src/content/parse.ts'
import { collections, type CollectionName } from '../src/content/schemas.ts'

/**
 * Turns each content/<collection>/*.md into a JS module at build time:
 * frontmatter is validated with the zod schema and the body is converted to HTML.
 * The browser never ships yaml/zod/marked.
 */
export default function contentPlugin(): Plugin {
  return {
    name: 'portfolio-content',
    transform(code, id) {
      const m = /[\\/]content[\\/]([^\\/]+)[\\/]([^\\/]+)\.md$/.exec(id.split('?')[0])
      if (!m || !(m[1] in collections)) return null
      const schema = collections[m[1] as CollectionName]
      const entry = parseEntry(schema, `content/${m[1]}/${m[2]}.md`, code)
      const html = marked.parse(entry.body, { async: false })
      return { code: `export default ${JSON.stringify({ ...entry, html })}`, map: null }
    },
  }
}
