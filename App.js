/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {stackNavigator} from './src/pages/navigation'
import {createAppContainer} from 'react-navigation'
import {Text} from 'react-native'
const AppContainer = createAppContainer(stackNavigator);
export default class App extends Component {
      render() {
      return  <AppContainer/>
    }
}

