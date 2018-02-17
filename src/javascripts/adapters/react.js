//
// @flow
//
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import type { Store } from 'redux'

// render react by selector
export function renderReact (selector: string, component: Function, store: Store) {
  const elements = document.querySelectorAll(selector)
  return elements.forEach((element) => {
    const datasetKey = Object.keys(element.dataset)[0]
    const datasetString: string = element.dataset[datasetKey] || 'null'
    const dataset = datasetKey !== undefined ? JSON.parse(datasetString) : {}
    return render(component(store, dataset), element)
  })
}

export function connectedProvider (component: Function, store: Store, actionCreators: any = {}) {
  const ConnectedComponent = connectedComponent(component, actionCreators)
  return (
    <Provider store={store}>
      <ConnectedComponent />
    </Provider>
  )
}

function connectedComponent (component: Function, actionCreators: any = {}) {
  return connect(
    store => { return { store } },
    dispatch => bindActionCreators(actionCreators, dispatch)
  )(component)
}
