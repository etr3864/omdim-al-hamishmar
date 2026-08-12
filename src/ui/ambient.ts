/** רקע דקורטיבי מעומעם — קשתות זהב, זוהר, לוגו שקוף */
export function ambient(opts: {
  variant?: 'a' | 'b' | 'c' | 'd'
  mark?: string
} = {}): string {
  const v = opts.variant ?? 'a'
  const mark = opts.mark
    ? `<img class="ambient__mark" src="${opts.mark}" alt="" decoding="async">`
    : ''

  return `
<div class="ambient ambient--${v}" aria-hidden="true">
  <span class="ambient__glow ambient__glow--1"></span>
  <span class="ambient__glow ambient__glow--2"></span>
  <span class="ambient__arc ambient__arc--outer"></span>
  <span class="ambient__arc ambient__arc--inner"></span>
  ${mark}
</div>`
}
