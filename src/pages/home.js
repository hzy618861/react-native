import React, { Component } from 'react'
import {Button,View} from 'react-native'
export default class home extends Component {

  render() {
    const {navigation} = this.props
    return (
      <View >
          <Button  onPress={()=>navigation.navigate('MaterialTopTabNavigator')} title="顶部导航"/>
          <Button  onPress={()=>navigation.navigate('MaterialBottomTabNavigator')} title="底部导航"/>
        
      </View>
    )
  }
}

