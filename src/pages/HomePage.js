import React,{Component} from 'react'
import {Button,View,Text,StyleSheet,TextInput} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import FavoritePage from './FavoritePage'
import MyPage from './MyPage'
import PopularPage from './PopularPage'
import TrendingPage from './TrendingPage'
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons'
import EntypoIcons  from 'react-native-vector-icons/Entypo'
import Ionicons  from 'react-native-vector-icons/Ionicons'
const styles = StyleSheet.create({
    container:{
       flex:1,
       justifyContent:'center',
       alignItems:"center",
       backgroundColor:"#f5f5f5"
    },
    text:{
      fontSize:30
    }
  })
export default  class HomePage extends Component {
    _tabNavigator(){
       return createAppContainer(createBottomTabNavigator({
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
       }))
    }
     render(){
          const Tab = this._tabNavigator()
          return  <Tab/>
     }
}