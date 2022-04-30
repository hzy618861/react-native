import React,{Component} from 'react'
import {Button,View,Text,StyleSheet,TextInput,FlatList,RefreshControl,ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'
import actions from '../action'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import NavigationUtil from './navigation/NavigationUtil'
import PopularItem  from './components/popularItem'
import TrendingItem  from './components/trendingItem'
import Toast from 'react-native-easy-toast'
import Navigationbar from './components/navigationBar'
import FavoriteDao from '../utils/favorite'
import EventBus from 'react-native-event-bus'
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

export default  class FavoritePage extends Component {
     constructor(props){
       super(props)
       this.tabList = ['最热','趋势']
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
      let navgationBar = <Navigationbar title={'收藏'}
       style={{backgroundColor:"#678"}}
        statusBar={{backgroundColor:"#678",barStyle:'light-content'}}/>
      const TopTab = createAppContainer(createMaterialTopTabNavigator({
         "Popular":{
           screen:props=><FavoriteTabPage  {...props} flag={'popular'}/>,
           navigationOptions:{
              title:"最热"
           }
         },
         "Trending":{
          screen:props=><FavoriteTabPage {...props} flag={'trending'}/>,
          navigationOptions:{
             title:"趋势"
          }
         }
      },{
        tabBarOptions: {
          tabStyle: {
              minWidth: 50
          },
          upperCaseLabel: false,//是否使标签大写，默认为true
  
          //activeTintColor: 'white',//label和icon的前景色 活跃状态下（选中）
          // inactiveTintColor: 'gray',//label和icon的前景色 活跃状态下（未选中）
          style: {
              backgroundColor: '#678',//TabBar 的背景颜色
          },
          indicatorStyle:styles.indicatorStyle,//标签指示器的样式
          labelStyle:styles.labelStyle
         },

      }))
          return (
              <View style={styles.container}>
                  {navgationBar}
                  <TopTab/>
              </View>
          )
     }
}
const mapStateToProps =  (state) =>{
   return {
    favorite: state.favorite
   }
}
const  mapDispatchToProps = (dispatch) => {
  return {
    onLoadFavoriteData: (storeName,isShowLoading) => dispatch(actions.onLoadFavoriteData(storeName,isShowLoading)),
  }
}
class FavoriteTab extends Component {
  constructor(props){
    super(props)
    const {flag} = this.props
    this.storeName = flag
    this.favoriteDao = new FavoriteDao(flag)
  }
 componentDidMount(){
    this.loadData(true)
    EventBus.getInstance().addListener('bottom_tab_select',this.listener = data=>{
       if(data.to===2){
          this.loadData(false)
       }
    })
 }
 componentWillUnmount(){
    EventBus.getInstance().removeListener(this.listener)
 }
 loadData(isShowLoading){
    const {onLoadFavoriteData} = this.props
    onLoadFavoriteData(this.storeName,isShowLoading)
 }
 onSelect(item){
  NavigationUtil.goPage('DetailPage',{
     projectModel:item,
     flag:this.storeName
  })
 }
 renderItem(data){
   console.log('#####',data)
   const {item} = data
   const Item = this.storeName == 'popular' ? PopularItem:TrendingItem
   return <View style={{marginBottom:10}}>
        <Item projectModel={item} onSelect={()=>this.onSelect(item)}
         onFavorite={(item,isFavorite)=>FavoriteDao.onFavorite(this.favoriteDao,item,isFavorite,this.storeName)}/>
       {/* <Text style={{backgroundColor:'#faa'}}>{JSON.stringify(item)}</Text> */}
   </View>
 }
 _store(){
  const {favorite} = this.props
  let store = favorite[this.storeName]
  if(!store){
    store = {
       items:[],
       isLoading:false,
       projectModes:[]
    }
  }
  return store
 }

 render() {
   let store = this._store()
   console.log('》》》》',store)
   return (
     <View>
         <FlatList data={store.projectModes}
          renderItem={data=>this.renderItem(data)}
          keyExtractor={item => '' + (item.item.id || item.item.fullName)}
          refreshControl={
             <RefreshControl
               title={'loading'}
               titleColor={'red'}
               colors={['red']}
               refreshing={store.isLoading}
               onRefresh={()=>this.loadData(true)}
               tintColor={'red'}
             />
          }

          />
          <Toast ref={'toast'} position="center"/>
     </View>
   )
 }
}
const FavoriteTabPage = connect(mapStateToProps,mapDispatchToProps)(FavoriteTab)

