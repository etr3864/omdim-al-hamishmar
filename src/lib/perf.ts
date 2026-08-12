/** הקלות ביצועים בלי לשנות את המראה — השהיית אנימציות כשהטאב ברקע */
export function bindPerfGuards(): void {
  const root = document.documentElement

  const sync = () => {
    root.classList.toggle('is-bg-paused', document.hidden)
  }

  sync()
  document.addEventListener('visibilitychange', sync)
}
