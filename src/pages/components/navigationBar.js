import React, { Component } from 'react';
import { View,ViewPropTypes,Text,StatusBar,StyleSheet,Platform} from 'react-native'
import Proptypes from 'prop-types'
const NAV_BAR_HEIGHT_IOS = 44
const NAV_BAR_HEIGHT_ANDROID = 50
const STATUS_BAR_HEIGHT = 20
const StatusBarShape = {
     barStyle:Proptypes.oneOf(['light-content','default']),
     hidden:Proptypes.bool,
     backgroundColor:Proptypes.string
}
const styles = StyleSheet.create({
     navBarButton:{
         alignItems:"center"
     },
     navBar:{
         justifyContent:"space-between",
         flexDirection:"row",
         alignItems:"center",
         height:Platform.OS == 'ios'?NAV_BAR_HEIGHT_IOS:NAV_BAR_HEIGHT_ANDROID
     },
     navBarTitleContainer:{
         alignItems:"center",
         justifyContent:"center",
         position:"absolute",
         left:40,
         right:40,
         top:0,
         bottom:0
     },
     container:{
         backgroundColor:"#2196f3"
     },
     title:{
          fontSize:20,
          color:'white'
     },
     statusBar:{
        height:Platform.OS == 'ios'?STATUS_BAR_HEIGHT:0
     }
})
class Navigationbar extends Component {
    //属性类型检查
    static propTypes = {
         style:ViewPropTypes.style,
         title:Proptypes.string,
         titleView:Proptypes.element,
         titleLayoutStyle:ViewPropTypes.style,
         hide:Proptypes.bool,
         statusBar:Proptypes.shape(StatusBarShape),
         rightButton:Proptypes.element,
         leftButton:Proptypes.element,
    }
    //默认属性
    static defaultProps = {
         statusBar:{
              barStyle:"light-content",
              hidden:false
         }
    }
    getButtonElement(button){
         return <View style={styles.navBarButton}>
                {button}
         </View>
    }
    render() {
         let statusBar = !this.props.statusBar.hidden ? 
         <View style={StyleSheet.statusBar}>
              <StatusBar {...this.props.statusBar}/>
         </View>:null
         let titleView = this.props.titleView?this.props.titleView:
        //  ellipsizeMode='head' 文字开头位置显示省略号 numberOfLines显示行数
         <Text ellipsizeMode='head' numberOfLines={1} style={styles.title}>{this.props.title}</Text>
         let content = this.props.hide?null:
         <View style={styles.navBar}>
               {this.getButtonElement(this.props.leftButton)}
               <View style={[styles.navBarTitleContainer,this.props.titleLayoutStyle]}>
                   {titleView}
               </View>
               {
                   this.getButtonElement(this.props.rightButton)
               }
         </View>
        return (
            <View style={[styles.container,this.props.style]}>
                 {statusBar}
                 {content}
            </View>
        );
    }
}

export default Navigationbar;
