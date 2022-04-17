import React from 'react'
import Page1 from '../page1'
import Page2 from '../page2'
import Page3 from '../page3'
import Home from '../home'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator,createMaterialTopTabNavigator} from 'react-navigation-tabs'
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
//顶部导航
export const TopTabNavigator = createMaterialTopTabNavigator({
  Page1:{
    screen:Page1,
    navigationOptions:{
        tabBarLabel:"1"
    }
  },
  Page2:{
    screen:Page2,
    navigationOptions:{
        tabBarLabel:"2"
    }
  }
}
,{
  tabBarPosition: 'top',       //标签栏在屏幕顶部还是底部
  lazy: false,                    //是否只渲染显示的标签
  animationEnabled: true,         //标签切换是否有动画效果
  tabBarOptions: {
      activeTintColor: '#fff',  //标签栏激活字体颜色
      inactiveTintColor: '#000000',//标签栏未激活字体颜色
      showLabel: true,             //是否显示标签栏
      labelStyle: {fontSize: 20},  //标签样式(可设置字体大小等)
      style: {backgroundColor: 'pink'}, //设置整个tabbar样式(背景颜色等)
      indicatorStyle:{  //标签样式
        height:2,
        backgroundColor:'green'
      }
  }
}
)
//堆栈导航
export const stackNavigator =  createStackNavigator(
        {
              Home: {
                screen: Home, 
                navigationOptions:{
                  title:"首页",
                }
              
              },
              MaterialTopTabNavigator:{
                screen: TopTabNavigator,
                navigationOptions:{
                  title:"顶部导航"
                }
              },
              MaterialBottomTabNavigator:{
                screen: BottomTabNavigator,
                navigationOptions:{
                  title:"底部导航"
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
          //headerMode:null, //隐藏所有的顶部导航
          initialRouteName: 'Home', // 设置默认的导航页面，应用一打开首先进入Page2页面
        }
   
);
