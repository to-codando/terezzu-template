import { observerFactory } from 'lemejs'

import template from './template'
import styles from './styles'

const appHello = () => {
  const state = observerFactory({
    title: 'Hello World!',
    text: 'Now it`s with lemeJs!!!'
  })

  return {
    state,
    template,
    styles
  }
}

export { appHello }
