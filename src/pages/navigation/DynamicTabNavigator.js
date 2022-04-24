import MaterialIcons  from 'react-native-vector-icons/MaterialIcons'
import EntypoIcons  from 'react-native-vector-icons/Entypo'
import Ionicons  from 'react-native-vector-icons/Ionicons'
import FavoritePage from '../FavoritePage'
import MyPage from '../MyPage'
import PopularPage from '../PopularPage'
import TrendingPage from '../TrendingPage'
import React, {Component} from 'react'
import {View,Text} from 'react-native'
import {createAppContainer} from 'react-navigation'
import {BottomTabBar, createBottomTabNavigator} from 'react-navigation-tabs'

import {connect} from 'react-redux'
const tabs = {
  PopularPage: {
    screen: PopularPage, 
    navigationOptions:{
      tabBarLabel:"最热",
      tabBarIcon:({tintColor,focused}) => {
         return <MaterialIcons name='whatshot' size={26} style={{color:tintColor}}/>
      } 
    }
  },
  TrendingPage: {
    screen: TrendingPage, 
    navigationOptions:{
      tabBarLabel:"趋势",
      tabBarIcon:({tintColor,focused}) => {
         return <Ionicons name='md-trending-up' size={26} style={{color:tintColor}}/>
      } 
    }
  },
  FavoritePage: {
    screen: FavoritePage, 
    navigationOptions:{
      tabBarLabel:"收藏",
      tabBarIcon:({tintColor,focused}) => {
         return <MaterialIcons name='favorite' size={26} style={{color:tintColor}}/>
      } 
    }
  },
  MyPage: {
    screen: MyPage, 
    navigationOptions:{
      tabBarLabel:"我的",
      tabBarIcon:({tintColor,focused}) => {
         return <EntypoIcons name='user' size={26} style={{color:tintColor}}/>
      } 
    }
  }
}
class DynamicTabNavigator extends  Component {
     constructor(props){
         super(props)
         this.tab = null
     }
     _tabNavigator(){
       if(this.tab) return this.tab
       const {PopularPage,TrendingPage,FavoritePage,MyPage} = tabs
       PopularPage.navigationOptions.tabBarLabel = '动态修改' //动态修改导航文字
       this.tab = createAppContainer(createBottomTabNavigator(tabs,{
        tabBarComponent:props => <TabBarComponents {...props} theme={this.props.theme}/>
       }))
       return this.tab
        
     }
      render(){
          const Tab =  this._tabNavigator()
          return  <Tab/>
     }
}
const mapStateToProps = state => ({
   theme:state.theme.theme
})
 
class TabBarComponents extends Component {
     render(){
          return <BottomTabBar {...this.props}
           activeTintColor={this.props.theme}/>
     }

}
export default connect(mapStateToProps)(DynamicTabNavigator)