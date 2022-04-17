import React, { Component } from 'react'
import {Button,View,Text,StyleSheet,FlatList,RefreshControl,ActivityIndicator} from 'react-native'
const city = ['北京','上海','武汉','北京','上海','武汉','北京','上海','武汉','北京','上海','武汉','北京','上海','武汉','北京','上海','武汉','北京','上海','武汉','北京','上海','武汉','北京','上海','武汉','北京','上海','武汉','北京','上海','武汉','北京','上海','武汉']
const styles = StyleSheet.create({
    item:{
        backgroundColor:"#169",
        height:200,
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        alignItems:"center",
        justifyContent:"center"
    },
    text:{
        fontSize:20,
        color:"#fff"
    },
    activityIndicator:{
          alignItems:"center"
    },
    activityText:{
        
        margin:10
    }
})
export default class flatList extends Component {
    state = {
        loading:false,
        data:city
    }
  _renderItem = (data) => {
      return (
          <View style={styles.item}>
              <Text style={styles.text}>{data.item}</Text>
          </View>
      )
  }
  loadData = (refreshing) => {
        this.setState({
            loading:true
        })
       setTimeout(()=>{
           if(refreshing){
            this.setState({
                loading:false,
                data:this.state.data.reverse()
            })
           }else{
            this.setState({
                loading:false,
                data:this.state.data.concat(['哈哈哈哈'])
            })
           }
       },2000)
  }
  genIndicator = () => {
       return (
           <View style={styles.activityIndicator}>
               <ActivityIndicator 
               animating={true}
               color={'red'}
               size="large"/>
               <Text style={styles.activityText}>正在加载更多</Text>
           </View>
       )
  }
  render() {
    const {loading,data} = this.state
    return (
      <View>
          <FlatList data={data}
          renderItem={data=>this._renderItem(data)}
        //   refreshing={loading}
        //   onRefresh={this.loadData}  //自定义loading就不能使用上述两个属性
        refreshControl={
            <RefreshControl onRefresh={() => this.loadData(true)} refreshing={loading}   title={'loading'} titleColor={'#fff'} colors={['green']} tintColor={'green'}/>
        }
        ListFooterComponent={this.genIndicator}
        onEndReached={()=>this.loadData()}
          />
      </View>
    )
  }
}
