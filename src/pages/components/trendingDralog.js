import React, { Component } from 'react'
import {Modal,View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const styles = StyleSheet.create({
     container:{
         backgroundColor:"rgba(0,0,0,0.6)",
         flex:1,
         alignItems:"center"
     },
     arrow:{
         marginTop:40,
         color:"white",
         padding:0,
         margin:-15
     },
     content:{
          backgroundColor:"white",
          borderRadius:3,
          paddingTop:3,
          paddingBottom:3,
          marginRight:3
     },
     textContainer:{
            alignItems:"center",
            flexDirection:"row"
     },
     text:{
         fontSize:16,
         color:"black",
         fontWeight:"400",
         padding:8,
         paddingLeft:26,
         paddingRight:26
     },
     line:{
         height:1,
         backgroundColor:"#ddd"
     }
})
export default class trendingDralog extends Component {
  state = {
        visible:false
  }
  toggle(visible){
       this.setState({
            visible
       })
  }
  render() {
    const {onClose,onSelect} = this.props 
    const timeSpan = [{label:"今天",value:"today"},{label:"昨天",value:"yes"},{label:"后天",value:"las"}]
    return (
      <Modal
       transparent={true}
       visible={this.state.visible}
       onRequestClose={()=>onClose}
      >
           <TouchableOpacity style={styles.container} onPress={()=>this.toggle(false)}>
                <MaterialIcons name="arrow-drop-up" size={36} style={styles.arrow}/>
                <View style={styles.content}>
                         {timeSpan.map((item,index)=>(
                             <TouchableOpacity onPress={()=>onSelect(item)}>
                                   <View style={styles.textContainer}>
                                       <Text style={styles.text}>{item.label}</Text>
                                   </View>  
                                   {
                                            (index+1)!=timeSpan.length&&<View style={styles.line}></View>
                                   }                                   
                             </TouchableOpacity>
                         ))}
                </View>
           </TouchableOpacity>
      </Modal>
    )
  }
}
