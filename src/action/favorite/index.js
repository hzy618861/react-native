import Types from '../types'
import DataStore from '../../utils'
import {handleData, _projectModels} from '../actionUtil'
import FavoriteDao from '../../utils/favorite'
//加载收藏的项目
export  function onLoadFavoriteData(flag,isShowLoading){
     //触发异步action
     return  dispatch => {
          if (isShowLoading) {
               dispatch({type: Types.FAVORITE_LOAD_DATA, storeName: flag});
          }
          new FavoriteDao(flag).getAllItems().then(items=>{
               console.log('获取。。。',items)
              let res = []
              items.forEach(item=>{
                res.push({
                    isFavorite:true,
                    item
                })
              })
              dispatch({
                type:Types.FAVORITE_LOAD_SUCCESS,
                storeName:flag,
                projectModes:res,
          })
          }).catch(e=>{
               console.log(e)
               dispatch({
                type:Types.FAVORITE_LOAD_FAIL,
                storeName:flag,
                err:e,
              })
          })
     }
}

