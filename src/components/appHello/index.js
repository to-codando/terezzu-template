import { observerFactory } from 'lemejs'

import { appText } from '../appText'

import template from './template'
import styles from './styles'

const appHello = () => {
  const state = observerFactory({
    title: 'Hello World!',
    text: 'Now it`s with lemeJs!!!'
  })

  const children = () => ({ appText })

  return {
    state,
    template,
    styles,
    children
  }
}

export { appHello }
