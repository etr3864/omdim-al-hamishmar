import type { Rabbi } from '@/content/rabbis'

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
        (r) => `
      <div class="trust-face">
        <div class="trust-face__ring">
          <img src="${r.photo}" alt="${r.name}" width="88" height="88" loading="lazy">
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
        <img src="${r.full}" alt="${r.name}" loading="${i < 2 ? 'eager' : 'lazy'}">
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
