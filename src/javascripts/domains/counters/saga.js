//
// @flow
//
import { fork, take, put, call } from 'redux-saga/effects'
import * as CounterRedux from '~/domains/counters/redux'
import { delay } from '~/adapters/saga'
//import { XHRpost } from '~/adapters/superagent'

function * animation (): * {
  while (true) {
    const action = yield take(CounterRedux.types.resetWithWarning)
    const delayTime = action && action.payload ? action.payload : 0
    yield put(CounterRedux.creators.toWarn())
    yield call(delay, delayTime)
    yield put(CounterRedux.creators.reset())
  }
}

//function * xhr (): * {
//  while (true) {
//    const { payload } = yield take(CounterRedux.types.reset())
//    const { data } = yield call(XHRpost, '/test', payload)
//    yield put(CounterRedux.creators.reset(data))
//  }
//}

export function saga (): * {
  return function * (): * {
    yield fork(animation)
    // yield fork(xhr)
  }
}

export const sagas = () => {
  return [ saga() ]
}
