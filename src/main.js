import { render } from 'terezzu'

import { appMain } from './components/appMain'
import { appHello } from './components/appHello'

// prettier-ignore
render(appMain, 'main', appMainElement => {
  render(appHello, 'hello', null, appMainElement)
}, document.body)
