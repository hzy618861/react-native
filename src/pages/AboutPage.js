import React,{Component} from 'react'
import {Button,ScrollView,View,Text,StyleSheet,TextInput,TouchableOpacity,Linking} from 'react-native'
import {connect} from 'react-redux'
import Navigationbar from './components/navigationBar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import actions from '../action'
import {MORE_MENU} from '../utils/menu'
import Line from './components/line'
import ListItem from './components/listItem'
import NavigationUtil from './navigation/NavigationUtil'
import AboutCommon,{FLAG_ABOUT} from './components/AboutCommon'

 export default class AboutPage extends Component {
   constructor(props){
          super(props)
          this.params = this.props.navigation.state.params
          this.aboutCommon = new AboutCommon({
             ...this.params,
             navigation: this.props.navigation,
             flagAbout: FLAG_ABOUT.flag_about,
          },data=>{
             this.setState({...data})
          })
         
   }
   clickFeed(){
    const  url = 'mailto://crazycodeboy@gmail.com'
    Linking.canOpenURL(url).then(support=>{
        if(!support){
           console.log('不支持url')
        }
    })

   }
     render(){
          const content = <View>
                       <ListItem
                        Icons={MORE_MENU.Tutorial.Icons} 
                        icon={MORE_MENU.Tutorial.icon} 
                        color={'#678'}
                        text={'教程'} 
                        callback={()=>this.onClick(menu)}/>
                        <Line/>
                        <ListItem
                        Icons={MORE_MENU.About_Author.Icons} 
                        icon={MORE_MENU.About_Author.icon} 
                        color={'#678'}
                        text={'作者'} 
                        callback={()=>this.onClick(menu)}/>
                        <Line/>
                        <ListItem
                        Icons={MORE_MENU.Feedback.Icons} 
                        icon={MORE_MENU.Feedback.icon} 
                        color={'#678'}
                        text={'反馈'} 
                        callback={()=>{
                          this.clickFeed()
                        }}
                          />
                        <Line/>
          </View>
          return this.aboutCommon.render(content,{
            "name": "GitHub Popular",
            "description": "这是一个用来查看GitHub最受欢迎与最热项目的App,它基于React Native支持Android和iOS双平台。",
            "avatar": "http://www.devio.org/io/GitHubPopular/img/ic_app.png",
            "backgroundImg": "http://www.devio.org/io/GitHubPopular/img/for_githubpopular_about_me.jpg"
          })
     }
}
