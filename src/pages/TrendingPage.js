import React,{Component} from 'react'
import {DeviceEventEmitter,Button,View,Text,StyleSheet,TextInput,FlatList,RefreshControl,ActivityIndicator,TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import actions from '../action'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import NavigationUtil from './navigation/NavigationUtil'
import TrendingItem  from './components/trendingItem'
import Toast from 'react-native-easy-toast'
import Navigationbar from './components/navigationBar'
import TrendingDralog from './components/trendingDralog'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FavoriteDao from '../utils/favorite'
const favoriteDao = new FavoriteDao('trending')
const pageSize = 10
const timeSpan = [{label:"今天",value:"daily"},{label:"本周",value:"daily"},{label:"本月",value:"daily"}]
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
    },
    arrow:{
      color:"#fff"
    }
  })
export default  class PopularPage extends Component {
     constructor(props){
       super(props)
       this.tabList = ['All','C',"C#","Php",'Javascript']
       this.state ={
         curSpan:{
          label:timeSpan[0].label,
          value:timeSpan[0].value
        }
       }
     }
     _genTabs(){
        const tabs = {}
        const curSpan = this.state.curSpan
        this.tabList.forEach((item,index)=>{
            tabs[`tab${index}`] = {
               screen: props => <PopularTabPage  {...props} tabLabel={item} curSpan={curSpan}/>,
               navigationOptions:{
                  title:item
               }
            }
        })
        return tabs
     }
     renderTitleView(){
        return <View>
            <TouchableOpacity ref="button" underlayColor="transparent" onPress={()=>this.dialog.toggle(true)}>
                 <View style={{flexDirection:"row",alignItems:"center"}}>
                       <Text style={{fontSize:18,color:"#fff",fontWeight:"400"}}>
                              趋势{this.state.curSpan.label}
                       </Text>
                       <MaterialIcons name="arrow-drop-up" size={32} style={styles.arrow}/>
                 </View>
                 {this.renderDialog()}
            </TouchableOpacity>
        </View>
     }
     renderDialog(){
        return <TrendingDralog ref={dialog=>this.dialog=dialog} onSelect={tab=>this.onSelectCur(tab)}/>
     }
     onSelectCur(tab){
         DeviceEventEmitter.emit('tabChange',tab)
         this.dialog.toggle(false)
         this.setState({
            curSpan:{
                label:tab.label,
                value:tab.value
            }
         })
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
      let navgationBar = <Navigationbar titleView={this.renderTitleView()}
        style={{backgroundColor:"#678"}}
        statusBar={{backgroundColor:"#678",barStyle:'light-content'}}/>
        if(!this.TopTab){
          this.TopTab = createAppContainer(createMaterialTopTabNavigator(this._genTabs(),{
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
        }
    
          return (
              <View style={styles.container}>
                  {navgationBar}
                  <this.TopTab/>
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
    const {tabLabel,curSpan} = this.props
    this.storeName = tabLabel
    this.curSpan = curSpan
  }
 componentDidMount(){
    this.loadData()
    this.fn = DeviceEventEmitter.addListener('tabChange',tab=>{
       this.curSpan = tab
       this.loadData()
    })
 }
 componentWillUnmount(){
     if(this.fn){
        this.fn.remove()
     }
 }
 loadData(loadMore){
    const {onLoadMoreTrendingrData,onRefreshTrending} = this.props
    const curSpan = this.curSpan
    const url = `https://github.com/trending/${this.storeName}?since=${curSpan.value}`
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
        <TrendingItem projectModel={item} onSelect={()=>this.onSelect } onFavorite={(item,isFavorite)=>FavoriteDao.onFavorite(favoriteDao,item,isFavorite,'favorite_trending')}/>
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

