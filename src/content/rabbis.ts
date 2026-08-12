import { site } from '@/config/site'

export type Rabbi = {
  id: string
  name: string
  quote: string
  photo: string
  full: string
}

const cdn = site.cdn

export const rabbis: Rabbi[] = [
  {
    id: '01',
    name: 'הרב יגאל כהן שליט״א',
    quote: 'אין לקדוש ברוך הוא עונג יותר גדול מיהודי ששומר את העיניים והברית',
    photo: `${cdn}/rabbis/01.jpg`,
    full: `${cdn}/rabbis/01f.png`,
  },
  {
    id: '02',
    name: 'הרב חיים יוסף דוד אברג׳יל שליט״א',
    quote: 'הארגון מסייע לעם ישראל הטהורים והקדושים לשמור על העיניים',
    photo: `${cdn}/rabbis/02.jpg`,
    full: `${cdn}/rabbis/02f.png`,
  },
  {
    id: '03',
    name: 'הרב יהושוע מרגלית שליט״א',
    quote: 'זיכוי הרבים מובהק, חבל שרק עכשיו מפרסמים את השיטה הזאת',
    photo: `${cdn}/rabbis/03.jpg`,
    full: `${cdn}/rabbis/03f.png`,
  },
  {
    id: '04',
    name: 'הרב שרון זר שליט״א',
    quote: 'ארגון עומדים על המשמר הוא ארגון מבורך, גן עדן מובטח',
    photo: `${cdn}/rabbis/04.jpg`,
    full: `${cdn}/rabbis/04f.png`,
  },
  {
    id: '05',
    name: 'הרב דוד טויטו שליט״א',
    quote: 'ידוע בספרים הקדושים ששמירת הקדושה זה המקור לפרנסה ולשפע',
    photo: `${cdn}/rabbis/05.jpg`,
    full: `${cdn}/rabbis/05f.png`,
  },
  {
    id: '06',
    name: 'הרב מאיר ביבי שליט״א',
    quote: 'שכל יהודי ישתמש בשיטה הזאת, זה יכול להציל מיליונים',
    photo: `${cdn}/rabbis/06.jpg`,
    full: `${cdn}/rabbis/06f.png`,
  },
  {
    id: '07',
    name: 'הרב נתנאל סנדרו שליט״א',
    quote: 'עכשיו אין יותר סיבה לא לשמור את העיניים',
    photo: `${cdn}/rabbis/07.jpg`,
    full: `${cdn}/rabbis/07f.png`,
  },
]
