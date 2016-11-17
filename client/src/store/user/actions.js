/**
 * Created by hyl on 16/10/25.
 */
import {USER_INFO} from '../mutations'

export const updateInfo = ({commit}, info)=> {
  commit(USER_INFO, info)
}
