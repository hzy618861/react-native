import React, { Component } from 'react'
import {Button,View,Text,StyleSheet,TextInput} from 'react-native'
import NavigationUtil from './navigation/NavigationUtil'
const styles = StyleSheet.create({
  container:{
     flex:1,
     justifyContent:'center',
     alignItems:"center"
  },
  text:{
    fontSize:30
  }
})
export default class welcomePage extends Component {
  componentDidMount(){
     this.timer = setTimeout(()=>{
         //跳转首页
         NavigationUtil.resetToHomePage(this.props)
     },2000)
  }
  componentWillUnmount(){
    this.timer && clearTimeout(this.timer)
  }
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.text}>welcomePage</Text>
      </View>
    )
  }
}

