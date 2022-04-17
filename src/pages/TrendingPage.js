import React,{Component} from 'react'
import {Button,View,Text,StyleSheet,TextInput} from 'react-native'
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
export default  class TrendingPage extends Component {
     render(){
          return (
              <View style={styles.container}>
                  <Text>TrendingPage</Text>
              </View>
          )
     }
}