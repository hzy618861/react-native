import {TouchableOpacity} from 'react-native'
import React from 'react'
import  Ionicons from 'react-native-vector-icons/Ionicons'
export default class ViewUtil{
     static getLeftButton(callback){
          return <TouchableOpacity style={{padding:8,paddingLeft:12}} onPress={callback}>
                   <Ionicons name={'ios-arrow-back'} size={26} style={{color:"white"}}/>
          </TouchableOpacity>
     }
     static getShareButton(callback){
          return <TouchableOpacity  underlayColor="transparent" onPress={callback}>
                   <Ionicons name={'md-share'} size={26} style={{color:"white",opacity:0.9,marginRight:10}}/>
          </TouchableOpacity>
     }
}