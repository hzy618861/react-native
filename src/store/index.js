import {applyMiddleware,createStore} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducer'
//自定义中间件
const logger = store => next => action => {
     if(typeof action === 'function'){
         console.log('dispatching a function')
     }else{
          // console.log('dispatching',action)
     }
     const res = next(action)
     console.log('nextState',store.getState())
     return res
}
const middlewares = [thunk,logger]
export default createStore(reducers,applyMiddleware(...middlewares))