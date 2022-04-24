import Types from '../types'
import DataStore from '../../utils'
//获取最热数据action
export  function onRefreshPopularData(storeName,url,pageSize){
     //触发异步action
     return  dispatch => {
          dispatch({type:Types.POPULAR_REFRESH,storeName})
          let dataStore = new DataStore()
          dataStore.fetchData(url).then(res=>{
            handleData(dispatch,storeName,res,pageSize)
          }).catch(err=>{
               console.log(err)
               dispatch({type:Types.POPULAR_REFRESH_FAIL,storeName,err})
          })
     }
}
export  function onLoadMorePopularData(storeName,pageIndex,pageSize,dataArray=[],callBack){
     //触发异步action
     return  dispatch => {
          setTimeout(()=>{
                if((pageIndex-1)*pageSize>=dataArray.length){
                      if(typeof callBack == 'function'){
                           callBack('no more')
                      }
                      dispatch({
                            type:Types.POPULAR_LOAD_MORE_FAIL,
                            error:"no more",
                            storeName,
                            pageIndex:--pageIndex,
                            projectModes:dataArray
                      })
                }else{
                     console.log('88888811')
                     let max = pageSize*pageIndex > dataArray.length?dataArray.length:pageSize*pageIndex
                     dispatch({
                         type:Types.POPULAR_LOAD_MORE_SUCCESS,
                         storeName,
                         pageIndex,
                         projectModes:dataArray.slice(0,max)
                   })
                }
          },500)
     }
}
function handleData(dispatch,storeName,res,pageSize){
     let fixItem = []
     if(res&&res.data&&res.data.items){
          fixItem = res.data.items
     }
    //触发同步action
    dispatch({
        type:Types.POPULAR_REFRESH_SUCCESS,
        projectModes: pageSize>fixItem.length?fixItem:fixItem.slice(0,pageSize),
        storeName,
        items:fixItem,
        pageIndex:1
    })
}