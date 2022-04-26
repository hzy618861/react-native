import React, { Component } from 'react'
import {View,Text,TouchableOpacity,StyleSheet,Image} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import HTMLView from 'react-native-htmlview'
import HtmlView from 'react-native-htmlview/HTMLView'
export default class TrendingItem extends Component {
  render() {
    const {item} = this.props
    if(!item) return null
    let favoriteButton = <TouchableOpacity style={{padding:6}}
                          underlayColor={'transparent'}>
                               <FontAwesome name="star-o" color="red" size={24}/>
                        </TouchableOpacity>
    let description = `<p>${item.description}</p>`
    return (
      <TouchableOpacity onPress={this.props.onSelect}>
          <View style={styles.cellContainer}>
            <Text style={styles.title}>{item.fullName}</Text>
            <HtmlView value={description}
                   onLinkPress={url=>{}}
                   stylesheet={{p:styles.description,a:styles.description}}
            />
            <Text style={styles.desc}>{item.meta}</Text>
            <View style={styles.row}>
                <View style={styles.row}>
                  <Text style={styles.title}>author:</Text>
                  {
                    item.contributors.map(cur=>(
                      <Image style={{height:22,width:22,margin:2}} source={{uri:cur}}/>
                    ))
                  }
                </View>
                {favoriteButton}
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