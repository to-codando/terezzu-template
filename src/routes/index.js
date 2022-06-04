import { routerFactory } from 'lemejs'

import { appNotFound } from '../components/appNotFound'
import { appHello } from '../components/appHello'

const router = routerFactory()

router.add({
  hash: '/',
  validator: /^#\/$/,
  component: appHello,
  isInitial: true
})

router.add({
  hash: 'not-found',
  validator: /^#\/not-found$/,
  component: appNotFound,
  isDefault: true
})

export { router }
