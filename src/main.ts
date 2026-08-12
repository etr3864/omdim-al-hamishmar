import '@/styles/base.css'
import { renderHomePage } from '@/pages/home'
import { bootPage } from '@/scripts/boot'

document.querySelector('#app')!.innerHTML = renderHomePage()
bootPage('home')
