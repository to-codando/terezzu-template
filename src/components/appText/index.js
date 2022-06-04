import { observerFactory } from 'lemejs'

import template from './template'
import styles from './styles'

const appText = () => {
  const state = observerFactory({
    text: 'A simple, no-overload library for creating reactive (SPA) applications.'
  })

  return {
    state,
    template,
    styles
  }
}

export { appText }
