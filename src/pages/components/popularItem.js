import React, { Component } from 'react'
import {View,Text,TouchableOpacity,StyleSheet,Image} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import BaseItem from './baseItem'
export default class popularItem extends BaseItem {
  render() {
    const {projectModel} = this.props
    const {item} = projectModel

    return (
      <TouchableOpacity onPress={this.props.onSelect}>
          <View style={styles.cellContainer}>
            <Text style={styles.title}>{item.full_name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <View style={styles.row}>
                <View style={styles.row}>
                  <Text style={styles.title}>author:</Text>
                  <Image style={{height:22,width:22}} source={{uri:item.owner && item.owner.avatar_url}}/>
                </View>
                <View style={{flexDirection:"row"}}>
                  <Text style={styles.title}>start:</Text>
                  <Text style={styles.title}>{item.stargazers_count}</Text>
                </View>
                {this.favoriteIcon()}
            </View>
            
          </View>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
   row:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginVertical:5
   },
   cellContainer:{
      backgroundColor:"#fff",
      padding:10,
      marginLeft:5,
      marginRight:5,
      marginVertical:3,
      borderColor:"#ddd",
      borderWidth:0.5,
      borderRadius:2,
      shadowColor:"gray",//针对ios
      shadowOffset:{width:0.5,height:0.5},//针对ios
      shadowOpacity:0.4,//针对ios
      shadowRadius:1, //针对ios
      elevation:2 //针对安卓阴影
   },
   title:{
      fontSize:16,
      marginBottom:2,
      color:"#212121"
   },
   desc:{
      fontSize:14,
      marginBottom:2,
      color:"#757575"
   }
})