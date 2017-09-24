import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

import '@/styles/app.scss'

class AppContainer extends React.Component {
  render () {
    const { history, routes, routerKey, store } = this.props

    return (
      <Provider store={store}>
        <Router history={history} children={routes} key={routerKey} />
      </Provider>
    )
  }
}

AppContainer.propTypes = {
  history: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
  routerKey: PropTypes.number,
  store: PropTypes.object.isRequired
}

export default AppContainer
