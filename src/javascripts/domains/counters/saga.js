//
// @flow
//
import { fork, take, put, call } from 'redux-saga/effects'
import * as CounterRedux from '~/domains/counters/redux'
import { delay } from '~/adapters/saga'

function * animation (): * {
  while (true) {
    const action = yield take(CounterRedux.types.resetWithWarning)
    const delayTime = action && action.payload ? action.payload : 0
    yield put(CounterRedux.creators.toWarn())
    yield call(delay, delayTime)
    yield put(CounterRedux.creators.reset())
  }
}

export function saga (): * {
  return function * (): * {
    yield fork(animation)
  }
}

export const sagas = () => {
  return [ saga() ]
}
