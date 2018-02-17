import { createActionReducer } from '~/adapters/redux'

export const { types, creators, reducer } = createActionReducer(
  '/counter/',
  [
    'countUp',
    'resetWithWarning', // for saga
    'toWarn', // from saga
    'reset' // from saga
  ]
)
