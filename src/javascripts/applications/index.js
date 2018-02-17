import { connectedProvider } from '~/adapters/react'
import { Counter } from '~/views/counters/main'
import { renderReact } from '~/adapters/react'
import { createReduxStore, extendReducers, runRootSaga } from '~/adapters/redux'
import { reducer as counterReducer } from '~/domains/counters/reducers'
import { creators as counterCreators } from '~/domains/counters/redux'
import { sagas as counterSaga } from '~/domains/counters/saga'

const reducer = extendReducers(counterReducer)
const store = createReduxStore(reducer)

runRootSaga(counterSaga())

function CounterComponent () {
  return connectedProvider(Counter, store, counterCreators)
}

renderReact('#app', CounterComponent, store)
