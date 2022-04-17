import {createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import HomePage from '../home'
import Page1 from '../page1'
import Login from '../login'
import flatListCom from '../components/flatList'
import sectionListCom from '../components/sectionList'
const AppStack =  createStackNavigator({
     Home:{
         screen:HomePage
     },
     flatList:{
        screen:flatListCom
    },
    sectionList:{
        screen:sectionListCom
    }
})
const AuthStack =  createStackNavigator({
    Login:{
        screen:Login
    }
})
export default createSwitchNavigator({
    AuthStack,
    AppStack
})