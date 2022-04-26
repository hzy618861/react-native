export function handleData(type,dispatch,storeName,res,pageSize){
    let fixItem = []
    if(res&&res.data){
         if(Array.isArray(res.data)){
            fixItem = res.data
         } else if(Array.isArray(res.data.items)){
            fixItem = res.data.items
         }
    }
   //触发同步action
   dispatch({
       type,
       projectModes: pageSize>fixItem.length?fixItem:fixItem.slice(0,pageSize),
       storeName,
       items:fixItem,
       pageIndex:1
   })
}