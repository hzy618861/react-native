import React, { Component } from 'react'
import {Button,View,Text,StyleSheet} from 'react-native'
const styles = StyleSheet.create({
  flex:{
    display:"flex",
    backgroundColor:"#000"
  },
  btn:{
    marginBottom:10
   }
})
export default class page1 extends Component {
  static navigationOptions = {
    title:"page1"
  }
  render() {
    const {navigation} = this.props
    return (
      <View >
          <Text>page1</Text>
           <View style={styles.btn}>
              <Button  onPress={()=>navigation.navigate('Page2')} title="测试路由跳转"/>
           </View>
      </View>
    )
  }
}

