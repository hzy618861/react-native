import {AsyncStorage} from 'react-native'
import Trending from 'GitHubTrending'
export const FLAG_STORE = {flag_popular:"popular",flag_trending:"flag_trending"}
export default class DataStore {
      saveData(url,data,callback){
           if(!data || !url) return
           AsyncStorage.setItem(url,JSON.stringify(this._warpData(data)),callback)
      }
      _warpData(data){
           return {data,timestamp:new Date().getTime()}
      }
      //获取本地数据
      fetchLocalData(url){
           return  new Promise((resolve,reject)=>{
                 AsyncStorage.getItem(url,(err,result)=>{
                        if(!err){
                             try{
                                   resolve(JSON.parse(result))
                             }catch(e){
                                 reject(e)
                             }
                        }else{
                            reject(err)
                        }
                 })
           })
      }
      //获取网络数据
      fetchNetData(url,flag=FLAG_STORE.flag_popular){
          return  new Promise((resolve,reject)=>{
               if(flag==FLAG_STORE.flag_popular){
                    fetch(url).then(res=>{
                         if(res.ok){
                             return res.json()
                         }
                         throw new Error('network respnse was not ok')
                    }).then(res=>{
                        this.saveData(url,res)
                        resolve(res)
                    }).catch(err=>{
                         reject(err)
                    })
               }else{
                   new Trending('fd82d1e882462e23b8e88aa82198f166').fetchTrending(url).then(res=>{
                          if(!res){
                                throw new Error('res is null')
                          }
                          this.saveData(url,res)
                          resolve(res)
                   }).catch(e=>{
                         reject(e)
                   })
               }
            })
      }
      fetchData(url,flag){
           return new Promise((resolve,reject)=>{
                this.fetchLocalData(url).then(res=>{
                      if(res&&DataStore.checkTimestampValid(res.timestamp)){
                          resolve(res)
                      }else{
                         this.fetchNetData(url,flag).then(res=>{
                               resolve(this._warpData(res))
                         }).catch(e=>{
                               reject(e)
                         })
                      }
                }).catch(e=>{
                    this.fetchNetData(url,flag).then(res=>{
                        resolve(this._warpData(res))
                    }).catch(e=>{
                            reject(e)
                    })
                })
           })
      }
      static checkTimestampValid(timestamp){
            const currentDate = new Date()
            const targetDate = new Date()
            targetDate.setTime(timestamp)
            if(currentDate.getMonth()!=targetDate.getMonth()) return false
            if(currentDate.getDate()!=targetDate.getDate()) return false
            if(currentDate.getHours - targetDate.getHours() > 4) return false
            return true
      }
}