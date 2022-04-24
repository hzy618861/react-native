import React, { Component } from 'react'
import {Provider} from 'react-redux'
import Navigation from './pages/navigation';
import store from './store'
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
           <Navigation/>
      </Provider>
    )
  }
}
