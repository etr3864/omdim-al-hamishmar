/**
 * הגדרות אתר מרכזיות — לשנות כאן, לא בתוך הקומפוננטות.
 * אנליטיקס / וואטסאפ / מונה / קישורים.
 */
export const site = {
  name: 'עומדים על המשמר',
  slogan: 'שומרים אחד על השני',
  orgType: 'ארגון ללא מטרות רווח',
  url: 'https://omdimalhamishmar.co.il',

  /** מספר תמיכה בוואטסאפ (בינלאומי, בלי +) — לעדכן */
  whatsappSupport: '972500000000',

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

  videos: {
    /** דף הבית — הרב סנדרו (לכלל הציבור) */
    explain: '/assets/videos/explain.mp4',
    explainPoster: '/assets/videos/explain-poster.png',
    /** דף ביצוע — מדריך אנכי */
    tutorial: '/assets/videos/tutorial.mp4',
    tutorialPoster: '/assets/videos/tutorial-poster.png',
    /** דף תודה — סרטון סנדרו #2 (מסר נפרד, אנכי) */
    sandro: '/assets/videos/sandro.mp4',
    sandroPoster: '/assets/videos/sandro-poster.jpg',
  },

  logos: {
    mark: '/assets/logos/logo-mark.svg',
    markGold: '/assets/logos/logo-mark-gold.svg',
    full: '/assets/logos/logo-full.svg',
    goldMono: '/assets/logos/logo-gold-mono.svg',
  },

  texture: '/assets/textures/texture-1929.jpg',
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
