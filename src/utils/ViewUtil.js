import {TouchableOpacity,Text} from 'react-native'
import React from 'react'
import  Ionicons from 'react-native-vector-icons/Ionicons'
export default class ViewUtil{
     static getLeftButton(callback){
          return <TouchableOpacity style={{paddingLeft: 12}}  onPress={callback}>
                 <Ionicons
                 style={{color:"white"}}
                name={'ios-arrow-back'}
                size={26}
                />
          </TouchableOpacity>
     }
     static getRightButton(title, callBack) {
          return <TouchableOpacity
              style={{alignItems: 'center',}}
              onPress={callBack}>
              <Text style={{fontSize: 20, color: '#FFFFFF', marginRight: 10}}>{title}</Text>
          </TouchableOpacity>
      }
     static getShareButton(callback){
          return <TouchableOpacity  underlayColor="transparent" onPress={callback}>
                   <Ionicons name={'md-share'} size={26} style={{color:"white",opacity:0.9,marginRight:10}}/>
          </TouchableOpacity>
     }
}