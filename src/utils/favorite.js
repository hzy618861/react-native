import {AsyncStorage} from 'react-native'
const   FAVORITE = 'favorite_'

export default class Favorite {
     constructor(flag){
          this.favoriteKey = FAVORITE + flag
     }
     static onFavorite(favorite,item,isFavorite,flag){
           const key = flag === 'favorite_trending' ?item.fullName:''+item.id
           console.log('isFavorite=',isFavorite)
           if(isFavorite){
               favorite.saveFavoriteItem(key,JSON.stringify(item),()=>{
                      console.log('保存成功')
               })
           }else{
               favorite.removeFavoriteItem(key)
           }
     }
     saveFavoriteItem(key,value,callback){
        AsyncStorage.setItem(key,value,(err,result)=>{
             if(!err){
                  this.updateFavoriteKeys(key,true)
                  callback()
             }
        })
     }
     removeFavoriteItem(key){
         AsyncStorage.removeItem(key,(err,res)=>{
              if(!err){
                  this.updateFavoriteKeys(key,false)
              }
         })
     }
     updateFavoriteKeys(key,isAdd){
        AsyncStorage.getItem(this.favoriteKey,(err,result)=>{
             if(!err){
                 let favoriteKeys = []
                 if(result){
                      favoriteKeys = JSON.parse(result)
                 }
                 let index = favoriteKeys.indexOf(key)
                 if(isAdd){
                     if(index===-1) favoriteKeys.push(key)
                 }else{
                      if(index!==-1) favoriteKeys.splice(index,1)
                 }
                 console.log(this.favoriteKey)
                 AsyncStorage.setItem(this.favoriteKey,JSON.stringify(favoriteKeys))
             }
        })
     }
     getFavoriteKeys(){
                   return new Promise((resolve,reject)=>{
                        console.log('this.favoriteKey:',this.favoriteKey)
                        AsyncStorage.getItem(this.favoriteKey,(err,res)=>{
                             if(!err){
                                 try{
                                    console.log('>>>>>>')
                                    console.log(JSON.parse(res))
                                     resolve(JSON.parse(res))
                                 }catch(e){
                                     reject(e)
                                 }
                             }else{
                                 reject(err)
                             }
                        })
                   })
     }
     saveFavoriteItem(key,value,callback){
          AsyncStorage.setItem(key,value,(err,res)=>{
               if(!err){
                    this.updateFavoriteKeys(key,true)
               }
          })
     }
     getAllItems(){
         return new Promise((resolve,reject)=>{
              this.getFavoriteKeys().then(keys=>{
                 console.log('keys',keys)
                 let items = []
                 if(keys){
                     AsyncStorage.multiGet(keys,(err,res)=>{
                          try{
                            res.map((item)=>{
                                  let key = item[0]
                                  let value = item[1]
                                  if(value) items.push(JSON.parse(value))
                              })
                              resolve(items)
                          }catch(e){
                              reject(e)
                          }
                     })
                 }else{
                     resolve(items)
                 }
              }).catch(e=>{
                   reject(e)
              })
         })
     }
}
