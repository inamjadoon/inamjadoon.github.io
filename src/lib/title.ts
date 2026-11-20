/** "KaraGLOF — Glacial Lake …" → { name: "KaraGLOF", tagline: "Glacial Lake …" } */
export function splitTitle(title: string) {
  const [name, ...rest] = title.split(' — ')
  return { name, tagline: rest.join(' — ') }
}
