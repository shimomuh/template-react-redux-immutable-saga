//
// @flow
//
import { Counter as CounterModel } from '~/domains/counters/model'
import { reducer as CounterReducer } from '~/domains/counters/redux'

export const reducer = {
  counter: CounterReducer(new CounterModel())
}
