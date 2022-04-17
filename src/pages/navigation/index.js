import React from 'react'
import Page1 from '../page1'
import Page2 from '../page2'
import Page3 from '../page3'
import Home from '../home'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Ionicons  from 'react-native-vector-icons/Ionicons'
import {Button,Text,View} from 'react-native'
//底部导航
export const BottomTabNavigator = createBottomTabNavigator({
  Page1:{
    screen:Page1,
    navigationOptions:{
        // tabBarLabel:"Page1",
        // tabBarLabel:({tintColor,focused}) => {
        //     return <Text  style={{color:focused?'orange':tintColor,textAlign:'center'}}>Page1</Text>
        // },
        tabBarIcon:({tintColor,focused}) => {
              return <Ionicons name={'ios-home'} size={26} style={{color:tintColor}}/>
        }
    }
  },
  Page2:{
    screen:Page2,
    navigationOptions:{
        tabBarLabel:"Page2",
        tabBarIcon:({tintColor,focused}) => {
              return <Ionicons name={'ios-people'} size={26} style={{color:tintColor}}/>
        }
    }
  }
},{
  tabBarOptions:{
    activeTintColor:"green"
  }
})
//堆栈导航
export const stackNavigator =  createStackNavigator(
        {
              Home: {
                screen: BottomTabNavigator, 
                navigationOptions:{
                  title:"底部导航",
                }
              
              },
              // 导航名称
              Page1: {
                screen: Page1, // 导航指向的页面
               
              },
              // 导航名称
              Page2: {
                screen: Page2, // 导航指向的页面
                navigationOptions: {
                  title: "Page2", // 设置页面title
               
                }
              },
              Page3: {
                screen: Page3, // 导航指向的页面
                //设置动态标题 顶部按钮
                navigationOptions: ({navigation})=> {
                  const params = navigation.state.params
                  const setParams = navigation.setParams
                  return {
                    title:params?params.name:'',
                    headerRight:(
                      <Button title={params.mode=='edit'?'保存':'编辑'} onPress={()=>{setParams({mode:params.mode=='edit'?'':'edit'})}}/>
                    )
                  }
                }
              
              }
        }
        ,{
          headerMode:null, //隐藏所有的顶部导航
          initialRouteName: 'Home', // 设置默认的导航页面，应用一打开首先进入Page2页面
        }
   
);
