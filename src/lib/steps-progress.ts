/** מילוי קו השלבים + הדלקת מספרים בגלילה */
export function bindStepsProgress(): void {
  const root = document.querySelector<HTMLElement>('[data-steps]')
  if (!root) return

  const fill = root.querySelector<HTMLElement>('[data-steps-fill]')
  const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'))
  if (!fill || steps.length === 0) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    fill.style.setProperty('--p', '1')
    steps.forEach((s) => s.classList.add('is-active'))
    return
  }

  let ticking = false
  let prevActive = -1

  const update = () => {
    ticking = false
    const rect = root.getBoundingClientRect()
    const vh = window.innerHeight
    // מתחיל מוקדם: ברגע שהסקשן נכנס לתחתית המסך
    const start = vh * 0.92
    const end = vh * 0.28
    const travel = Math.max(rect.height * 0.85 + (start - end) * 0.55, 1)
    const raw = (start - rect.top) / travel
    const p = Math.min(1, Math.max(0, raw))

    fill.style.setProperty('--p', p.toFixed(4))

    let latest = -1
    steps.forEach((step, i) => {
      // נדלק מוקדם יותר בכל שלב
      const onAt = (i + 0.05) / (steps.length + 0.15)
      const on = p >= onAt
      step.classList.toggle('is-active', on)
      if (on) latest = i
    })

    // פעימה חד־פעמית כששלב חדש נדלק
    if (latest > prevActive && latest >= 0) {
      const el = steps[latest]
      el.classList.remove('is-pop')
      void el.offsetWidth
      el.classList.add('is-pop')
    }
    prevActive = latest
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
