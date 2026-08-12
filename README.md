# עומדים על המשמר

אתר RTL בשלושה עמודים, מודולרי, מוכן לפיקסלים והמרות.

## הרצה

```bash
npm install
npm run dev
```

- `/` — דף הבית  
- `/start.html` — ביצוע  
- `/thanks.html` — תודה  

## איפה לערוך

| מה | איפה |
|---|---|
| טקסטי דף הבית | `src/content/home.ts` |
| טקסטי ביצוע | `src/content/start.ts` |
| טקסטי תודה | `src/content/thanks.ts` |
| רבנים + ציטוטים | `src/content/rabbis.ts` |
| FAQ | `src/content/faq.ts` |
| וואטסאפ / מונה / פיקסלים | `src/config/site.ts` |

## פיקסלים

ב־`src/config/site.ts` → `analytics`:

- `metaPixelId` — Meta Pixel  
- `ga4MeasurementId` — GA4  
- `gtmId` — Google Tag Manager  

אירועים נשלחים מ־`src/lib/analytics.ts` (`track(...)`).

## מבנה

```
src/
  config/     הגדרות אתר + אנליטיקס
  content/    כל הקופי (עריכה בלי לגעת ב־UI)
  lib/        אנליטיקס, העתקה, DOM
  pages/      הרכבת HTML לכל עמוד
  ui/         קומפוננטות (header, CTA, FAQ, רבנים)
  styles/     טוקנים + רכיבים
public/assets/
  logos/ rabbis/ videos/ textures/
```
