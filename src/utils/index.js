import {AsyncStorage} from 'react-native'
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
      fetchNetData(url){
        return  new Promise((resolve,reject)=>{
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
      })
      }
      fetchData(url){
           return new Promise((resolve,reject)=>{
                this.fetchLocalData(url).then(res=>{
                      if(res&&DataStore.checkTimestampValid(res.timestamp)){
                          resolve(res)
                      }else{
                         this.fetchNetData(url).then(res=>{
                               resolve(this._warpData(res))
                         }).catch(e=>{
                               reject(e)
                         })
                      }
                }).catch(e=>{
                    this.fetchNetData(url).then(res=>{
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