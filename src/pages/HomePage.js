import React,{Component} from 'react'
import {Button,View,Text,StyleSheet,TextInput} from 'react-native'
import DynamicTabNavigator from './navigation/DynamicTabNavigator'
import NavigationUtil from './navigation/NavigationUtil'

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
     constructor(props){
           super(props)
          
     }
 
     render(){
          //解决动态导航组件页面无法跳转问题
          NavigationUtil.navigation = this.props.navigation
          return  <DynamicTabNavigator/>
     }
}