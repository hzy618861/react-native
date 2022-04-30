import React, { Component } from 'react'
import {View,StyleSheet} from 'react-native'
const styles = StyleSheet.create({
     line:{
          height:0.5,
          opacity:0.5,
          backgroundColor:"darkgray"
     }
})
export default class Line extends Component {
  render() {
    return (
      <View style={styles.line}/>
    )
  }
}
