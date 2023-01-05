import { render } from 'terezzu'

import { appMain } from './components/appMain'
import { appHello } from './components/appHello'

render(
  appMain,
  'main',
  (appMainElement) => {
    render(appHello, 'hello', null, appMainElement)
  },
  document.body
)
