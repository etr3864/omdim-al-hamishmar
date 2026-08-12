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

  const light = window.matchMedia('(max-width: 720px), (hover: none) and (pointer: coarse)').matches

  let active = -1
  let ticking = false
  let listening = false

  const setActive = (i: number) => {
    if (i === active) return
    active = i
    cards.forEach((c, j) => {
      c.classList.toggle('is-active', j === i)
      c.classList.toggle('is-near', Math.abs(j - i) === 1)
      if (light) {
        const f = j === i ? 1 : Math.abs(j - i) === 1 ? 0.5 : 0.12
        c.style.setProperty('--focus', String(f))
      }
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

      if (!light) {
        const falloff = Math.max(0, 1 - dist / (window.innerHeight * 0.55))
        card.style.setProperty('--focus', falloff.toFixed(3))
      }
    })

    setActive(best)
  }

  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(update)
  }

  const start = () => {
    if (listening) return
    listening = true
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
  }

  const stop = () => {
    if (!listening) return
    listening = false
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  }

  // רצים רק כשהסקשן באזור המסך — לא בכל גלילה בעמוד
  if (typeof IntersectionObserver === 'undefined') {
    start()
    return
  }

  const io = new IntersectionObserver(
    (entries) => {
      const on = entries.some((e) => e.isIntersecting)
      if (on) start()
      else stop()
    },
    { rootMargin: '20% 0px', threshold: 0 },
  )
  io.observe(root)
}
