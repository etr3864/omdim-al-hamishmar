import type { Rabbi } from '@/content/rabbis'

function picture(opts: {
  webp: string
  fallback: string
  alt: string
  width: number
  height: number
  loading: 'eager' | 'lazy'
  fetchpriority?: 'high'
}): string {
  const fp = opts.fetchpriority ? ` fetchpriority="${opts.fetchpriority}"` : ''
  return `<picture>
          <source srcset="${opts.webp}" type="image/webp">
          <img src="${opts.fallback}" alt="${opts.alt}" width="${opts.width}" height="${opts.height}"
            loading="${opts.loading}" decoding="async"${fp}>
        </picture>`
}

export function renderTrustStrip(rabbis: Rabbi[], label: string): string {
  return `
<div class="trust-strip">
  <div class="trust-strip__label">
    <span></span>
    <em>${label}</em>
    <span></span>
  </div>
  <div class="trust-strip__faces">
    ${rabbis
      .map(
        (r, i) => `
      <div class="trust-face">
        <div class="trust-face__ring">
          ${picture({
            webp: r.photoWebp,
            fallback: r.photo,
            alt: r.name,
            width: 88,
            height: 88,
            loading: i < 4 ? 'eager' : 'lazy',
            fetchpriority: i === 0 ? 'high' : undefined,
          })}
        </div>
        <span>${r.name.replace(' שליט״א', '')}</span>
      </div>`,
      )
      .join('')}
  </div>
</div>`
}

export function renderRabbisWall(rabbis: Rabbi[]): string {
  const cards = rabbis
    .map(
      (r, i) => `
    <article class="rabbi-card" data-rabbi-card style="--i:${i}">
      <div class="rabbi-card__photo">
        ${picture({
          webp: r.fullWebp,
          fallback: r.full,
          alt: r.name,
          width: 168,
          height: 168,
          loading: i < 1 ? 'eager' : 'lazy',
        })}
      </div>
      <div class="rabbi-card__body">
        <p class="rabbi-card__quote">״${r.quote}״</p>
        <div class="rabbi-card__name">${r.name}</div>
      </div>
    </article>`,
    )
    .join('')

  return `
<div class="rabbis-stack" data-rabbis-stack>
  ${cards}
</div>`
}
