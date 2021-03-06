
import Types  from '../../action/types'
const defaultState = {
      
}
/**
 * popular:{
 *     java:{items:[],isLoading:false},
 *     ios:{items:[],isLoading:false},
  }
*/
export default function onAction(state = defaultState,action) {
     switch(action.type){
          case Types.TRENDING_REFRESH_SUCCESS:
               return {
                    ...state,
                    [action.storeName]: {
                        ...state[action.storeName],
                        items:action.items,
                        hideLoadingMore:false,
                        pageIndex:action.pageIndex,
                        projectModes:action.projectModes,
                        isLoading:false
                    }
               }
           case Types.TRENDING_REFRESH:
               return {
                    ...state,
                    [action.storeName]: {
                        ...state[action.storeName],
                        isLoading:true,
                        hideLoadingMore:true,
                    }
               }
          case Types.TRENDING_REFRESH_FAIL:
                return {
                     ...state,
                     [action.storeName]: {
                         ...state[action.storeName],
                         isLoading:false,
                         hideLoadingMore:false,
                     }
                }
          case Types.TRENDING_LOAD_MORE_SUCCESS:
                    return {
                         ...state,
                         [action.storeName]: {
                            ...state[action.storeName],
                             projectModes:action.projectModes,
                             hideLoadingMore:false,
                             pageIndex:action.pageIndex
                         }
                    }
           case Types.TRENDING_LOAD_MORE_FAIL:
                         return {
                              ...state,
                              [action.storeName]: {
                                  ...state[action.storeName],
                                  hideLoadingMore:true,
                                  pageIndex:action.pageIndex
                              }
                         }
           default:
                return state
     }
   
}