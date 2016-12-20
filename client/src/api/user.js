/**
 * Created by hyl on 2016/12/20.
 */
import axios from 'axios'

export default {
  login (name, pwd) {
    return axios.post('http://localhost:8080/api/user/login', {
      name, pwd
    })
  }
}
