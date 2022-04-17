/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {initNavigator} from './src/pages/navigation'
import {createAppContainer} from 'react-navigation'
import {Text} from 'react-native'
const AppContainer = createAppContainer(initNavigator);
export default AppContainer

