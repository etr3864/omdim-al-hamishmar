/** הדגשת כרטיס רב לפי מיקום במסך — אנכי ועדין */
export function bindRabbisCarousel(): void {
  const root = document.querySelector<HTMLElement>('[data-rabbis-stack]')
  if (!root) return

  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-rabbi-card]'))
  if (!cards.length) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    cards.forEach((c) => c.classList.add('is-active'))
    return
  }

  let active = -1
  let ticking = false

  const setActive = (i: number) => {
    if (i === active) return
    active = i
    cards.forEach((c, j) => {
      c.classList.toggle('is-active', j === i)
      c.classList.toggle('is-near', Math.abs(j - i) === 1)
    })
  }

  const update = () => {
    ticking = false
    const mid = window.innerHeight * 0.48
    let best = 0
    let bestDist = Infinity

    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const dist = Math.abs(center - mid)
      if (dist < bestDist) {
        bestDist = dist
        best = i
      }

      // עוצמה רציפה לפי קרבה למרכז (למעבר רך)
      const falloff = Math.max(0, 1 - dist / (window.innerHeight * 0.55))
      card.style.setProperty('--focus', falloff.toFixed(3))
    })

    setActive(best)
  }

  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(update)
  }

  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
}
