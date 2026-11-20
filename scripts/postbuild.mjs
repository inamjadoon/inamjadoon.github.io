// After `vite build`: GitHub Pages helpers.
//  - 404.html = index.html so deep links (/projects/x) load the app
//  - .nojekyll so Pages serves files as-is
//  - sitemap.xml + robots.txt for search engines
import { copyFileSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const SITE = 'https://inamjadoon.github.io'
const root = join(import.meta.dirname, '..')
const dist = join(root, 'dist')

copyFileSync(join(dist, 'index.html'), join(dist, '404.html'))
writeFileSync(join(dist, '.nojekyll'), '')

const slugs = (dir) =>
  readdirSync(join(root, 'content', dir))
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map((f) => f.replace(/\.md$/, ''))

const urls = ['/', '/cv', ...slugs('projects').map((s) => `/projects/${s}`), ...slugs('hackathons').map((s) => `/hackathons/${s}`)]
// Real files for each route so GitHub Pages serves them with status 200 (better for Google)
for (const u of urls.filter((u) => u !== '/')) {
  mkdirSync(join(dist, u), { recursive: true })
  copyFileSync(join(dist, 'index.html'), join(dist, u, 'index.html'))
}

writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${SITE}${u}</loc></url>`)
    .join('\n')}\n</urlset>\n`,
)
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`)
console.log(`✓ postbuild: 404.html, .nojekyll, ${urls.length - 1} route pages, sitemap, robots.txt`)
