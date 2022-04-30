import favoriteDao from '../utils/favorite'
export function handleData(type,dispatch,storeName,res,pageSize,favoriteDao){
    let fixItem = []
    if(res&&res.data){
         if(Array.isArray(res.data)){
            fixItem = res.data
         } else if(Array.isArray(res.data.items)){
            fixItem = res.data.items
         }
    }
   //触发同步action
   let showItems = pageSize>fixItem.length?fixItem:fixItem.slice(0,pageSize)
   _projectModels(showItems,favoriteDao,projectModes=>{
      dispatch({
         type,
         projectModes,
         storeName,
         items:fixItem,
         pageIndex:1
     })
   })
  
}
function hasFavorite(item,keys){
   if(!keys) return false
   const id = item.id || item.fullName
   return keys.some(cur => cur == id)
   
}
export async function _projectModels(showItems,favoriteDao,callback){
    let keys = []
    try{
      keys =  await favoriteDao.getFavoriteKeys()
    }catch(e){
        console.log(e)
    }
    let projectModes = []
    showItems.forEach(item=>{
      projectModes.push({
         item,
         isFavorite:hasFavorite(item,keys)
      })
    })
    if(typeof callback === 'function'){
        callback(projectModes)
    }
    
}