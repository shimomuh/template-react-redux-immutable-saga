//
// @flow
//
import type { Props as CounterModel } from '~/domains/counters/model'

type Props = {
  counter: CounterModel,
  countUp: Function
}

// Stateless Functional Component
export function Counter (props: Props) {
  const { store, countUp, resetWithWarning } = props
  const { counter } = store
  return (
    <div>
      <p>Happy React Life :D</p>
      <p>
        <button onClick={ countUp }>good!</button>
        <button onClick={ () => { return resetWithWarning(3000) } }>reset</button>
      </p>
      <p className={ counter.warning ? '_warning_' : '' }>{ counter.count }</p>
    </div>
  )
}
