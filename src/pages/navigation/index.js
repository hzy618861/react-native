import React from 'react'
import welcomePage from '../welcomePage'
import HomePage from '../HomePage'
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {Button,Text,View} from 'react-native'
 const initNavigator = createStackNavigator({
  welcomePage: {
    screen: welcomePage, 
    navigationOptions:{
      header:null //隐藏头部
    }
  }
})

 const MainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage, 
    navigationOptions:{
      header:null 
    }
  }
})

export default  createAppContainer(createSwitchNavigator({
   Init:initNavigator,
   Main:MainNavigator
},{
  navigationOptions:{
    header:null 
  }
}))
