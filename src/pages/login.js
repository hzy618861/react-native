import React, { Component } from 'react'
import {Button,View,Text,StyleSheet} from 'react-native'
export default class login extends Component {
  render() {
    const {navigation} = this.props
    return (
       <>
         <Button  onPress={()=>navigation.navigate('AppStack')} title="登录"/>
         <Button  onPress={()=>navigation.navigate('flatList')} title="flatList"/>
         <Button  onPress={()=>navigation.navigate('sectionList')} title="sectionList"/>
       </>
    )
  }
}
