/**
 * Created by hyl on 2016/12/20.
 */
import axios from 'axios'

export default {
  login (name, pwd) {
    return axios.post('api/user/login', {
      name, pwd
    }, {
      loading: true
    })
  }
}
