import { initAnalytics, track } from '@/lib/analytics'
import { bindFaq } from '@/ui/faq'
import { bindA11y } from '@/ui/a11y'
import { $all } from '@/lib/dom'
import { bindPageTransitions } from '@/lib/page-transition'
import { bindStepsProgress } from '@/lib/steps-progress'
import { bindRabbisCarousel } from '@/lib/rabbis-carousel'

export function bootPage(page: 'home' | 'start' | 'thanks'): void {
  initAnalytics()
  track('ViewContent', { page })
  bindFaq()
  bindA11y()
  bindTracking()
  bindPageTransitions()
  if (page === 'home') {
    bindStepsProgress()
    bindRabbisCarousel()
  }
}

function bindTracking(): void {
  $all('[data-track]').forEach((el) => {
    el.addEventListener('click', () => {
      const name = el.getAttribute('data-track')
      if (name) track(name, { page: location.pathname })
    })
  })

  $all('[data-track-play]').forEach((el) => {
    el.addEventListener(
      'play',
      () => {
        const name = el.getAttribute('data-track-play')
        if (name) track(name, { page: location.pathname })
      },
      { once: true },
    )
  })
}
