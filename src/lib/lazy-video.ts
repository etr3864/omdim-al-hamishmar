/** טעינת וידאו רק באינטראקציה ראשונה — הפוסטר נשאר, הקובץ הכבד לא יורד בגלילה */
export function bindLazyVideos(): void {
  document.querySelectorAll<HTMLVideoElement>('video[data-lazy-src]').forEach((video) => {
    let loading = false

    const ensureSource = (): boolean => {
      if (video.dataset.lazyReady === '1') return true
      const src = video.getAttribute('data-lazy-src')
      if (!src) return false
      if (video.querySelector('source')) {
        video.dataset.lazyReady = '1'
        return true
      }

      const source = document.createElement('source')
      source.src = src
      source.type = 'video/mp4'
      video.appendChild(source)
      video.load()
      video.dataset.lazyReady = '1'
      return true
    }

    const arm = () => {
      if (loading || video.dataset.lazyReady === '1') return
      loading = true
      ensureSource()
    }

    // לפני Play / לחיצה — מכניסים source כדי שהנגן יעבוד
    video.addEventListener('pointerdown', arm, { passive: true })
    video.addEventListener('touchstart', arm, { passive: true })
    video.addEventListener(
      'play',
      () => {
        arm()
      },
      { passive: true },
    )
  })
}
