/**
 * Validates everything in content/ before a build. Run: npm run check:content
 * Fails with a readable message if a file is missing a field or links to something that doesn't exist.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parseEntry } from '../src/content/parse.ts'
import { areasSchema, collections, profileSchema, skillsSchema } from '../src/content/schemas.ts'

const root = join(import.meta.dirname, '..', 'content')
const errors: string[] = []
const loaded: Record<string, { slug: string; [k: string]: unknown }[]> = {}

for (const [name, schema] of Object.entries(collections)) {
  const dir = join(root, name)
  loaded[name] = []
  if (!existsSync(dir)) continue
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.md') && !f.startsWith('_'))) {
    const path = `content/${name}/${file}`
    try {
      loaded[name].push(parseEntry(schema, path, readFileSync(join(dir, file), 'utf8')))
    } catch (e) {
      errors.push((e as Error).message)
    }
  }
}

for (const [file, schema] of [['profile.json', profileSchema], ['skills.json', skillsSchema], ['areas.json', areasSchema]] as const) {
  const r = schema.safeParse(JSON.parse(readFileSync(join(root, file), 'utf8')))
  if (!r.success) errors.push(`Invalid content/${file}:\n${r.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n')}`)
}

// Cross-references
const areaIds = new Set((JSON.parse(readFileSync(join(root, 'areas.json'), 'utf8')) as { id: string }[]).map((a) => a.id))
for (const p of loaded.projects) {
  for (const a of p.areas as string[])
    if (!areaIds.has(a)) errors.push(`content/projects/${p.slug}.md: area "${a}" is not defined in content/areas.json`)
}
const slugs = (n: string) => new Set(loaded[n].map((e) => e.slug))
for (const p of loaded.projects) {
  if (p.hackathon && !slugs('hackathons').has(p.hackathon as string))
    errors.push(`content/projects/${p.slug}.md: hackathon "${p.hackathon}" has no file in content/hackathons/`)
}
for (const h of loaded.hackathons) {
  if (h.project && !slugs('projects').has(h.project as string))
    errors.push(`content/hackathons/${h.slug}.md: project "${h.project}" has no file in content/projects/`)
}

if (errors.length) {
  console.error(`\n✗ Content check failed (${errors.length}):\n\n${errors.join('\n\n')}\n`)
  process.exit(1)
}
const counts = Object.entries(loaded).map(([k, v]) => `${v.length} ${k}`).join(', ')
console.log(`✓ Content OK: ${counts}`)
