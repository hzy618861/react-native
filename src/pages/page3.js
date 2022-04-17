import React, { Component } from 'react'
import {Button,View,Text,StyleSheet,TextInput} from 'react-native'
const styles = StyleSheet.create({
  flex:{
    display:"flex",
    backgroundColor:"#000"
  },
  btn:{
      marginBottom:10
  },
  input:{
    height:50,
    borderWidth:1,
    margginTop:10,
    borderColor:"#ddd"
  }
})
export default class page3 extends Component {
  render() {
    const {navigation} = this.props
    const {state,setParams} = navigation
    const {params} = state
    const showText = params && params.mode =='edit'?'正在编辑':'编辑完成'
    return (
      <View >
          <Text>page1</Text>
          <Text>{showText}</Text>
          <TextInput style={styles.input} onChangeText={text=>{setParams({name:text})}}/>
           <View style={styles.btn}>
              <Button  onPress={()=>navigation.navigate('Page2')} title="测试路由跳转"/>
           </View>
           <View style={styles.btn}>
              <Button  onPress={()=>navigation.goBack()} title="测试路由返回"/>
           </View>
      </View>
    )
  }
}

