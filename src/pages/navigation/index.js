import React from 'react'
import welcomePage from '../welcomePage'
import HomePage from '../HomePage'
import DetailPage from '../Detail'
import FetchDemo from '../FetchDemo'
import AboutPage from '../AboutPage'
import AboutMePage from '../AboutMePage'
import AsyncStorageDemo from '../AsyncStorageDemo'
import WebViewPage from '../WebViewPage'
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
  },
  DetailPage: {
    screen: DetailPage, 
    navigationOptions:{
      header:null 
    }
  },
  AboutPage: {
    screen: AboutPage, 
    navigationOptions:{
      header:null 
    }
  },
  AboutMePage: {
    screen: AboutMePage, 
    navigationOptions:{
      header:null 
    }
  },
  FetchDemo:{
    screen: FetchDemo,
  },
  AsyncStorageDemo:{
    screen: AsyncStorageDemo,
  },
  WebViewPage:{
     screen:WebViewPage,
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
