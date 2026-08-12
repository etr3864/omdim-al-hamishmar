import { analytics } from '@/config/site'

type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

/** טוען פיקסלים רק אם הוגדרו מזהים ב־config */
export function initAnalytics(): void {
  if (analytics.metaPixelId) injectMetaPixel(analytics.metaPixelId)
  if (analytics.ga4MeasurementId) injectGa4(analytics.ga4MeasurementId)
  if (analytics.gtmId) injectGtm(analytics.gtmId)
}

/** אירוע המרה / מעקב — עובד עם Meta + GA4 כשהם מוגדרים */
export function track(event: string, params: EventParams = {}): void {
  try {
    window.fbq?.('trackCustom', event, params)
    // Standard Meta events for funnel
    if (event === 'Lead' || event === 'CompleteRegistration' || event === 'ViewContent') {
      window.fbq?.('track', event, params)
    }
    window.gtag?.('event', event, params)
    window.dataLayer?.push({ event, ...params })
  } catch {
    /* ignore analytics errors */
  }
}

function injectMetaPixel(id: string): void {
  if (document.getElementById('meta-pixel')) return
  const s = document.createElement('script')
  s.id = 'meta-pixel'
  s.async = true
  s.textContent = `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${id}');fbq('track','PageView');
`
  document.head.appendChild(s)
}

function injectGa4(id: string): void {
  if (document.getElementById('ga4-src')) return
  const src = document.createElement('script')
  src.id = 'ga4-src'
  src.async = true
  src.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(src)
  const inline = document.createElement('script')
  inline.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`
  document.head.appendChild(inline)
}

function injectGtm(id: string): void {
  if (document.getElementById('gtm-src')) return
  const s = document.createElement('script')
  s.id = 'gtm-src'
  s.textContent = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`
  document.head.appendChild(s)
}
