import React,{Component} from 'react'
import {Button,ScrollView,View,Text,StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import Navigationbar from './components/navigationBar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import actions from '../action'
import {MORE_MENU} from '../utils/menu'
import Line from './components/line'
import ListItem from './components/listItem'
import NavigationUtil from './navigation/NavigationUtil'
const styles = StyleSheet.create({
    container:{
       flex:1,
       backgroundColor:"#f3f3f4"
    },
    text:{
      fontSize:30
    },
    row:{
       alignItems:"center",
       flexDirection:"row"
    },
    item:{
       height:90,
       justifyContent:"space-between",
       flexDirection:"row",
       alignItems:"center",
       padding:10,
       backgroundColor:"#fff"
    },
    groupTitle:{
       marginLeft:10,
       marginTop:10,
       marginBottom:5,
       fontSize:12,
       color:"gray"
    }
  })
 class MyPage extends Component {
   getRightButton(){
      return <View style={{flexDirection:"row"}}>
         <TouchableOpacity style={{padding:8,paddingLeft:12}}>
            <View style={{padding:5,marginRight:8}}>
                <Feather name="search" size={24} style={{color:"white"}}/>
            </View>
        </TouchableOpacity>
      </View>
   }
   getLeftButton(){
      return <TouchableOpacity style={{padding:8,paddingLeft:12}} >
          <Ionicons name={'ios-arrow-back'} size={26} style={{color:"white"}}/>
      </TouchableOpacity>
   }
   onClick(menu){
        let routeName,params = {}
        switch(menu){
           case MORE_MENU.Tutorial:
            routeName = 'WebViewPage'
            params.title = '教程'
            params.url = 'https://coding.m.imooc.com/classindex.html?cid=85'
            break
           case MORE_MENU.About:
              routeName = 'AboutPage'
              params.url = 'https://coding.m.imooc.com/classindex.html?cid=85'
              break
           case MORE_MENU.About_Author:
              routeName = 'AboutMePage'
              params.url = 'https://coding.m.imooc.com/classindex.html?cid=85'
              break
        }   
        if(routeName){
           NavigationUtil.goPage(routeName,params)
        }   
   }
     render(){
          let navgationBar = <Navigationbar title={'我的'}
          leftButton={this.getLeftButton()}
          rightButton={this.getRightButton()}
          style={{backgroundColor:"#678"}}
          statusBar={{backgroundColor:"#678",barStyle:'light-content'}}/>
          const {setParams} = this.props.navigation
          return (
              <View style={styles.container}>
                  {navgationBar}
                  <ScrollView>
                      <TouchableOpacity onPress={()=>this.onClick(MORE_MENU.About)} style={styles.item}>
                           <View style={styles.row}>
                               <Ionicons name={MORE_MENU.About.icon} size={40} style={{marginRight:10,color:'#678'}}/>
                               <Text>Github Popular</Text>
                           </View>
                           <Ionicons name={'ios-arrow-forward'} size={16} style={{marginRight:10,alignSelf:"center"}}/>
                      </TouchableOpacity>
                      <Line/>
                      <ListItem
                        Icons={MORE_MENU.Tutorial.Icons} 
                        icon={MORE_MENU.Tutorial.icon} 
                        color={'#678'}
                        text={'教程'} 
                        callback={()=>this.onClick(MORE_MENU.Tutorial)}/>
                        <Text style={styles.groupTitle}>趋势管理</Text>
                        <ListItem
                        Icons={MORE_MENU.Custom_Language.Icons} 
                        icon={MORE_MENU.Custom_Language.icon} 
                        color={'#678'}
                        text={'自定义语言'} 
                        callback={()=>this.onClick(menu)}/>
                          <Line/>
                         <ListItem
                        Icons={MORE_MENU.Sort_Language.Icons} 
                        icon={MORE_MENU.Sort_Language.icon} 
                        color={'#678'}
                        text={'语言排序'} 
                        callback={()=>this.onClick(menu)}/>
                          <Line/>
                          <Text style={styles.groupTitle}>最热管理</Text>
                        <ListItem
                        Icons={MORE_MENU.Custom_Language.Icons} 
                        icon={MORE_MENU.Custom_Language.icon} 
                        color={'#678'}
                        text={'自定义标签'} 
                        callback={()=>this.onClick(menu)}/>
                          <Line/>
                         <ListItem
                        Icons={MORE_MENU.Sort_Language.Icons} 
                        icon={MORE_MENU.Sort_Language.icon} 
                        color={'#678'}
                        text={'标签排序'} 
                        callback={()=>this.onClick(menu)}/>
                          <Line/>
                          <ListItem
                        Icons={MORE_MENU.Sort_Language.Icons} 
                        icon={MORE_MENU.Sort_Language.icon} 
                        color={'#678'}
                        text={'标签移除'} 
                        callback={()=>this.onClick(menu)}/>
                          <Line/>
                          <Text style={styles.groupTitle}>设置</Text>
                        <ListItem
                        Icons={MORE_MENU.Custom_Language.Icons} 
                        icon={MORE_MENU.Custom_Language.icon} 
                        color={'#678'}
                        text={'自定义主题'} 
                        callback={()=>this.onClick(menu)}/>
                          <Line/>
                         <ListItem
                        Icons={MORE_MENU.Sort_Language.Icons} 
                        icon={MORE_MENU.Sort_Language.icon} 
                        color={'#678'}
                        text={'关于作者'} 
                        callback={()=>this.onClick(MORE_MENU.About_Author)}/>
                          <Line/>
                         
                  </ScrollView>
              </View>
          )
     }
}
const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme))
})
export default connect(null,mapDispatchToProps)(MyPage)