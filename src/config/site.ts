/**
 * הגדרות אתר מרכזיות — לשנות כאן, לא בתוך הקומפוננטות.
 * אנליטיקס / וואטסאפ / מונה / קישורים.
 */

/** Cloudflare R2 — מדיה מואצת ב־CDN */
const CDN = 'https://pub-ba5d067c6c7c4c99a84c9f8c1692a663.r2.dev'

export const site = {
  name: 'עומדים על המשמר',
  slogan: 'שומרים אחד על השני',
  orgType: 'ארגון ללא מטרות רווח',
  url: 'https://omdimalhamishmar.co.il',

  /** מספר תמיכה בוואטסאפ (בינלאומי, בלי +) */
  whatsappSupport: '972523006544',

  /**
   * קישורים לרשתות — ריק = לא מוצג בפוטר.
   * שלח לידיים אמיתיות ואמלא.
   */
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61573648945589',
    instagram: 'https://www.instagram.com/omdimalhamishmar/',
    youtube: '',
    tiktok: '',
  },

  /** מונה בדף תודה (זמני עד חיבור ל־API) */
  counterText: '3,847',

  /** וריאנט הירו: 'strip' = 7 רבנים | 'single' = סנדרו בלבד */
  heroVariant: 'strip' as 'strip' | 'single',

  paths: {
    home: '/',
    start: '/start.html',
    thanks: '/thanks.html',
  },

  cdn: CDN,

  videos: {
    /** דף הבית — הרב סנדרו (לכלל הציבור) */
    explain: `${CDN}/videos/explain.mp4`,
    explainPoster: `${CDN}/videos/explain-poster.webp`,
    /** דף ביצוע — מדריך אנכי */
    tutorial: `${CDN}/videos/tutorial.mp4`,
    tutorialPoster: `${CDN}/videos/tutorial-poster.webp`,
    /** דף תודה — סרטון סנדרו #2 (מסר נפרד, אנכי) */
    sandro: `${CDN}/videos/sandro.mp4`,
    sandroPoster: `${CDN}/videos/sandro-poster.webp`,
  },

  logos: {
    mark: `${CDN}/logos/logo-mark.svg`,
    markGold: `${CDN}/logos/logo-mark-gold.svg`,
    full: `${CDN}/logos/logo-full.svg`,
    goldMono: `${CDN}/logos/logo-gold-mono.svg`,
  },

  texture: `${CDN}/textures/texture-1929.jpg`,
} as const

/**
 * מזהי פיקסלים — ממלאים כשמוכנים להטמעה.
 * ריק = לא נטען כלום (בטוח בפיתוח).
 */
export const analytics = {
  metaPixelId: '', // לדוגמה: '1234567890'
  ga4MeasurementId: '', // לדוגמה: 'G-XXXXXXXX'
  gtmId: '', // לדוגמה: 'GTM-XXXXXXX'
} as const
