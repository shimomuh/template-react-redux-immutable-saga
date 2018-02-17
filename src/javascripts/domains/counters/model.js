//
// @flow
//
import { Record } from 'immutable'

export type Props = {
  count: number,
  warning: Boolean
}

const props: Props = {
  count: 0,
  warning: false
}

export class Counter extends Record(props) {
  countUp (): Counter {
    return this.set('count', this.get('count') + 1)
  }
  toWarn (): Counter {
    return this.set('warning', true)
  }
  reset (): Counter {
    return this.set('count', 0).set('warning', false)
  }
}
