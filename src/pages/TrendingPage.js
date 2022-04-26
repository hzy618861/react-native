import React,{Component} from 'react'
import {Button,View,Text,StyleSheet,TextInput,FlatList,RefreshControl,ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'
import actions from '../action'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import NavigationUtil from './navigation/NavigationUtil'
import TrendingItem  from './components/trendingItem'
import Toast from 'react-native-easy-toast'
import Navigationbar from './components/navigationBar'

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
export default  class PopularPage extends Component {
     constructor(props){
       super(props)
       this.tabList = ['All','C',"C#","Php",'Javascript']
     }
     _genTabs(){
        const tabs = {}
        this.tabList.forEach((item,index)=>{
            tabs[`tab${index}`] = {
               screen: props => <PopularTabPage {...props} tabLabel={item}/>,
               navigationOptions:{
                  title:item
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
      let navgationBar = <Navigationbar title={'趋势'}
       style={{backgroundColor:"#678"}}
        statusBar={{backgroundColor:"#678",barStyle:'light-content'}}/>
      const TopTab = createAppContainer(createMaterialTopTabNavigator(this._genTabs(),{
        tabBarOptions: {
          tabStyle: {
              minWidth: 50
          },
          upperCaseLabel: false,//是否使标签大写，默认为true
          scrollEnabled: true,//是否支持 选项卡滚动，默认false
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
    trending: state.trending
   }
}
const  mapDispatchToProps = (dispatch) => {
  return {
    onRefreshTrending: (storeName,url,pageSize) => dispatch(actions.onRefreshTrending(storeName,url,pageSize)),
    onLoadMoreTrendingrData: (storeName,pageIndex,pageSize,items,callback) => dispatch(actions.onLoadMoreTrending(storeName,pageIndex,pageSize,items,callback))
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
    const {onLoadMoreTrendingrData,onRefreshTrending} = this.props
    const url = `https://github.com/trending/${this.storeName}?since=daily`
    let store = this._store()
    if(loadMore){
      onLoadMoreTrendingrData(this.storeName,++store.pageIndex,pageSize,store.items,()=>{
          this.refs.toast.show('沒有更多了')
      })
    }else{
      onRefreshTrending(this.storeName,url,pageSize)
    }
  
 }
 onSelect(){
     
 }
 renderItem(data){
   const { item } = data
   return <View style={{marginBottom:10}}>
        <TrendingItem item={item} onSelect={()=>this.onSelect}/>
       {/* <Text style={{backgroundColor:'#faa'}}>{JSON.stringify(item)}</Text> */}
   </View>
 }
 _store(){
  const {trending} = this.props
  let store = trending[this.storeName]
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
          keyExtractor={item=>item.id || item.fullName}
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
          onMomentumScrollBegin={()=>{  //列表初始化滚动
              this.canLoadMore =true
          }}
          // onEndReachedThreshold={0.5}
          />
          <Toast ref={'toast'} position="center"/>
     </View>
   )
 }
}
const PopularTabPage = connect(mapStateToProps,mapDispatchToProps)(PopularTab)

