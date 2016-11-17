/**
 * Created by hyl on 16/10/25.
 */
import {DEMO_INFO} from '../mutations'

export const updateDemoInfo = ({commit}, info)=> {
  commit(DEMO_INFO, info)
}
