// Build a fontEmbedCSS string with base64-embedded WOFF2 fonts so html-to-image
// can inline fonts without parsing external stylesheets (works around Firefox parsing bug).
// This is fetched once per session and cached.

interface FontDef {
  family: string
  weight: number
  style?: 'normal' | 'italic'
  url: string
}

let cachedCSS: string | null = null

function uint8ToBase64(bytes: Uint8Array): string {
  // Convert bytes to base64 in chunks to avoid stack/argument limits
  const chunkSize = 0x8000 // 32KB
  let binary = ''
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize)
    binary += String.fromCharCode.apply(null, Array.from(chunk))
  }
  return btoa(binary)
}

async function fetchAsBase64(url: string): Promise<string> {
  const res = await fetch(url, { credentials: 'same-origin' })
  if (!res.ok) {
    throw new Error(`Failed to fetch font: ${url} (${res.status})`)
  }
  const buf = await res.arrayBuffer()
  const b64 = uint8ToBase64(new Uint8Array(buf))
  return `data:font/woff2;base64,${b64}`
}

export async function getFontEmbedCSS(): Promise<string> {
  if (cachedCSS) return cachedCSS

  const fonts: FontDef[] = [
    { family: 'museo-slab', weight: 500, style: 'normal', url: '/fonts/museo-slab-500.woff2' },
    { family: 'roc-grotesk', weight: 400, style: 'normal', url: '/fonts/roc-grotesk-regular.woff2' },
    { family: 'roc-grotesk-compressed', weight: 700, style: 'normal', url: '/fonts/roc-grotesk-compressed-bold.woff2' },
    { family: 'roc-grotesk-wide', weight: 700, style: 'normal', url: '/fonts/roc-grotesk-wide-bold.woff2' },
  ]

  // Fetch all fonts as base64 data URLs concurrently
  const dataUrls = await Promise.all(fonts.map(f => fetchAsBase64(f.url)))

  const rules = fonts.map((f, idx) => `@font-face {\n  font-family: '${f.family}';\n  src: url('${dataUrls[idx]}') format('woff2');\n  font-weight: ${f.weight};\n  font-style: ${f.style ?? 'normal'};\n  font-display: swap;\n}`)

  cachedCSS = rules.join('\n\n')
  return cachedCSS
}
