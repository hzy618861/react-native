import React, { Component } from 'react'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
const styles = StyleSheet.create({
    item_contaienr:{
        backgroundColor:"#fff",
        padding:10,
        height:60,
        alignItems:"center",
        justifyContent:"space-between",
        flexDirection:"row"
    },
    text:{
        fontWeight:"bold",
        fontSize:16
    }
})
export default class listItem extends Component {
  render() {
    const {callback,Icons,icon,color,text,expandableIco} = this.props
    return (
       <TouchableOpacity onPress={callback} style={styles.item_contaienr}>
           <View style={{alignItems:"center",flexDirection:"row"}}>
                {
                   Icons&&icon?<Icons name={icon} size={16} style={{color,marginRight:10}}/>:<View style={{opacity:1,width:16,height:16,marginRight:10}}/>
                }  
                <Text style={styles.text}>{text}</Text>  
           </View>
           <Ionicons name={expandableIco?expandableIco:'ios-arrow-forward'} size={16} style={{marginRight:10,alignSelf:"center",color:color||'#000'}}/>
       </TouchableOpacity>
    )
  }
}
