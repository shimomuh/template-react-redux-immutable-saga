//
// @flow
//
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import createSagaMiddleware, { effects } from 'redux-saga'
import type Store from 'redux'

export const composeEnhancers = (
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

export const sagaMiddleware = createSagaMiddleware()
export const deafaultMiddleware = applyMiddleware(sagaMiddleware)

export function createReduxStore (reducer: Function, middlewares: * = deafaultMiddleware): Store {
  return createStore(reducer, composeEnhancers(middlewares))
}

export function extendReducers (...reducers: *): Reducer<*, *> {
  return combineReducers(Object.assign({}, ...reducers))
}

// generate actionType and actionCreator
function createActions (namespace: string, actionNames: Array<string>) {
  const types: ActionTypes = {}
  const creators: ActionCreators = {}
  actionNames.map((actionName: string) => {
    const type: ActionType = `${namespace}${actionName}`
    types[actionName] = type
    creators[actionName] = payload => { return { type, payload } }
  })
  return { types, creators }
}

// generate actionType, actionCreator, and reducer
export function createActionReducer (namespace: string, actionNames: Array<string>) {
  const { types, creators } = createActions(namespace, actionNames)
  const reducer = createReducer(namespace, actionNames)
  return { types, creators, reducer }
}

// generate reducer with model method as same name
function createReducer (namespace: string, actionNames: Array<string>) {
  return function (initialModel: *) {
    return (model: * = initialModel, action: ActionCreator<*, *>) => {
      const fn = action.type.replace(namespace, '')
      if (model[fn] !== undefined) return model[fn](action.payload)
      return model
    }
  }
}

export function runRootSaga (saga: Array<*>, extension: Array<*> = []) {
  const rootSaga = createRootSaga(saga, extension)
  sagaMiddleware.run(rootSaga)
}

function createRootSaga (sagas: any = [], extensions: any = []) {
  const { fork } = effects
  return function * (): * {
    yield [...sagas, ...extensions].map(task => fork(task))
  }
}
