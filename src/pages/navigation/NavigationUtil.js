export default class NavigationUtil {
     static resetToHomePage(params){
          const {navigation} = params
          navigation.navigate('Main')
     }
     static goPage(page,parmas){
          const navigation = NavigationUtil.navigation
          if(!navigation){
               console.log('NavigationUtil.navigation can not be null')
          }
          navigation.navigate(page,{...parmas})
     }
}