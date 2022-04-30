import Types from '../types'
import DataStore, { FLAG_STORE } from '../../utils'
import {handleData, _projectModels} from '../actionUtil'
//获取最热数据action
export  function onRefreshTrending(storeName,url,pageSize,favoriteDao){
     //触发异步action
     return  dispatch => {
          dispatch({type:Types.POPULAR_REFRESH,storeName})
          let dataStore = new DataStore()
          dataStore.fetchData(url,FLAG_STORE.flag_trending).then(res=>{
            handleData(Types.TRENDING_REFRESH_SUCCESS,dispatch,storeName,res,pageSize,favoriteDao)
          }).catch(err=>{
               console.log(err)
               dispatch({type:Types.TRENDING_REFRESH_FAIL,storeName,err})
          })
     }
}
export  function onLoadMoreTrending(storeName,pageIndex,pageSize,dataArray=[],callBack,favoriteDao){
     //触发异步action
     return  dispatch => {
          setTimeout(()=>{
                if((pageIndex-1)*pageSize>=dataArray.length){
                      if(typeof callBack == 'function'){
                           callBack('no more')
                      }
                      dispatch({
                            type:Types.TRENDING_LOAD_MORE_FAIL,
                            error:"no more",
                            storeName,
                            pageIndex:--pageIndex,
                            projectModes:dataArray
                      })
                }else{
                     console.log('88888811')
                     let max = pageSize*pageIndex > dataArray.length?dataArray.length:pageSize*pageIndex
                   _projectModels(dataArray.slice(0,max),favoriteDao,projectModes=>{
                    dispatch({
                         type:Types.TRENDING_LOAD_MORE_SUCCESS,
                         storeName,
                         pageIndex,
                         projectModes
                   })
                })
                }
          },500)
     }
}
