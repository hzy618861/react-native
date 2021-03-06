import React,{Component} from 'react'
import {Button,View,Text,StyleSheet,TextInput,FlatList,RefreshControl,ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'
import actions from '../action'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import NavigationUtil from './navigation/NavigationUtil'
import PopularItem  from './components/popularItem'
import Toast from 'react-native-easy-toast'
import Navigationbar from './components/navigationBar'
import FavoriteDao from '../utils/favorite'
import {FLAG_LANGUAGE} from '../utils/LanguageDao'
const favoriteDao = new FavoriteDao('popular')
const pageSize = 10
const styles = StyleSheet.create({
    container:{
       flex:1,
    },
    text:{
      fontSize:30
    },
    labelStyle: {
      fontSize: 13,
      marginTop: 6,
      marginBottom: 6,
    },
    indicatorStyle:{
      height: 2,
      backgroundColor: 'white',
    },
    more:{
        justifyContent:"center"
    },
    indicator:{
       color:"red",
       margin:10
    }
  })

  class PopularPage extends Component {
     constructor(props){
       super(props)
       const {onLoadLanguage} = this.props
      //  this.tabList = ['Java','Android',"IOS","React",'Vue','PHP','Net']
      onLoadLanguage(FLAG_LANGUAGE.flag_key)
     }
     _genTabs(){
        const tabs = {}
        const {keys} = this.props
        keys.forEach((item,index)=>{
            if(item.checked){
              tabs[`tab${index}`] = {
                screen: props => <PopularTabPage {...props} tabLabel={item.name}/>,
                navigationOptions:{
                   title:item.name
                }
             }
            }
         
        })
        return tabs
     }
     render(){
      // const TopTab = createAppContainer(createMaterialTopTabNavigator({
      //     PopularTab1:{
      //       screen: PopularTab,
      //       navigationOptions:{
      //         title:"Tab1"
      //       }
      //     },
      //     PopularTab2:{
      //       screen: PopularTab,
      //       navigationOptions:{
      //         title:"Tab2"
      //       }
      //   }
      // }))
      const {keys} = this.props
      let navgationBar = <Navigationbar title={'??????'}
       style={{backgroundColor:"#678"}}
        statusBar={{backgroundColor:"#678",barStyle:'light-content'}}/>
      const TopTab = keys.length>0?createAppContainer(createMaterialTopTabNavigator(this._genTabs(),{
        tabBarOptions: {
          tabStyle: {
              minWidth: 50
          },
          upperCaseLabel: false,//?????????????????????????????????true
          scrollEnabled: true,//???????????? ????????????????????????false
          //activeTintColor: 'white',//label???icon???????????? ???????????????????????????
          // inactiveTintColor: 'gray',//label???icon???????????? ??????????????????????????????
          style: {
              backgroundColor: '#678',//TabBar ???????????????
          },
          indicatorStyle:styles.indicatorStyle,//????????????????????????
          labelStyle:styles.labelStyle
         },
         lazy:true
      })):null
          return (
              <View style={styles.container}>
                  {navgationBar}
                 { TopTab && <TopTab/>}
              </View>
          )
     }
}
const mapPopularStateToProps =  (state) =>{
  return {
     keys:state.language.keys
  }
}
const  mapPopularDispatchToProps = (dispatch) => {
 return {
   onLoadLanguage: (flagKey) => dispatch(actions.onLoadLanguage(flagKey)),
 }
}
export default   connect(mapPopularStateToProps,mapPopularDispatchToProps)(PopularPage)
const mapStateToProps =  (state) =>{
   return {
      popular: state.popular,
      language:state.language
   }
}
const  mapDispatchToProps = (dispatch) => {
  return {
    onRefreshPopularData: (storeName,url,pageSize,favoriteDao) => dispatch(actions.onRefreshPopularData(storeName,url,pageSize,favoriteDao)),
    onLoadMorePopularData: (storeName,pageIndex,pageSize,items,callback,favoriteDao) => dispatch(actions.onLoadMorePopularData(storeName,pageIndex,pageSize,items,callback,favoriteDao)),
    onLoadLanguage: (flagKey) => dispatch(actions.onLoadLanguage(flagKey)),
  }
}
class PopularTab extends Component {
  constructor(props){
    super(props)
    const {tabLabel} = this.props
    this.storeName = tabLabel
  }
 componentDidMount(){
    this.loadData()
 }
 loadData(loadMore){
    const {onRefreshPopularData,onLoadMorePopularData} = this.props
    const url = `https://api.github.com/search/repositories?q=${this.storeName}`
    let store = this._store()
    if(loadMore){
      onLoadMorePopularData(this.storeName,++store.pageIndex,pageSize,store.items,()=>{
          this.refs.toast.show('???????????????')
      },favoriteDao)
    }else{
      onRefreshPopularData(this.storeName,url,pageSize,favoriteDao)
    }
  
 }
 onSelect(item){
  NavigationUtil.goPage('DetailPage',{
     projectModel:item
  })
 }
 renderItem(data){
   const { item } = data
   return <View style={{marginBottom:10}}>
        <PopularItem projectModel={item} onSelect={()=>this.onSelect(item)} onFavorite={(item,isFavorite)=>FavoriteDao.onFavorite(favoriteDao,item,isFavorite,'favorite_popular')}/>
       {/* <Text style={{backgroundColor:'#faa'}}>{JSON.stringify(item)}</Text> */}
   </View>
 }
 _store(){
  const {popular} = this.props
  let store = popular[this.storeName]
  if(!store){
    store = {
       items:[],
       isLoading:false,
       projectModes:[],
       hideLoadingMore:false,
       pageIndex:1,
       pageSize
    }
  }
  return store
 }
 genFooter(){
    return  this._store().hideLoadingMore?null:
    <View style={styles.more}>
        <ActivityIndicator style={styles.indicator}/>
    </View>
 }
 render() {
   let store = this._store()
   return (
     <View>
         <FlatList data={store.projectModes}
          renderItem={data=>this.renderItem(data)}
          refreshControl={
             <RefreshControl
               title={'loading'}
               titleColor={'red'}
               colors={['red']}
               refreshing={store.isLoading}
               onRefresh={()=>this.loadData()}
               tintColor={'red'}
             />
          }
         
          ListFooterComponent={()=>this.genFooter()}
          onEndReached={()=>{
            setTimeout(()=>{
              if(this.canLoadMore){
                this.loadData(true)
                this.canLoadMore = false
              }
            },100)
          }}
          onMomentumScrollBegin={()=>{  //?????????????????????
              this.canLoadMore =true
          }}
          onEndReachedThreshold={0.5}
          />
          <Toast ref={'toast'} position="center"/>
     </View>
   )
 }
}
const PopularTabPage = connect(mapStateToProps,mapDispatchToProps)(PopularTab)

