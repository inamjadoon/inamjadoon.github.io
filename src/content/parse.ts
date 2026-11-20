import { parse as parseYaml } from 'yaml'
import type { z } from 'zod'

/** Splits a Markdown file into YAML frontmatter and body. */
export function splitFrontmatter(raw: string): { data: unknown; body: string } {
  const text = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n')
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(text)
  if (!m) return { data: {}, body: text.trim() }
  return { data: parseYaml(m[1]) ?? {}, body: m[2].trim() }
}

/** "content/projects/agriboost.md" → "agriboost" */
export function slugFromPath(path: string): string {
  return path.split('/').pop()!.replace(/\.md$/, '')
}

export function parseEntry<S extends z.ZodType>(schema: S, path: string, raw: string) {
  let parsed: { data: unknown; body: string }
  try {
    parsed = splitFrontmatter(raw)
  } catch (e) {
    throw new Error(`Invalid YAML in ${path}:\n  ${(e as Error).message.split('\n')[0]}`)
  }
  const { data, body } = parsed
  const result = schema.safeParse(data)
  if (!result.success) {
    const issues = result.error.issues.map((i) => `  - ${i.path.join('.') || '(root)'}: ${i.message}`).join('\n')
    throw new Error(`Invalid content in ${path}:\n${issues}`)
  }
  return { ...(result.data as z.infer<S> & object), slug: slugFromPath(path), body }
}
