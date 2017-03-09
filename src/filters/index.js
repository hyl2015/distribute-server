/**
 * Created by hyl on 2017/3/9.
 */
import dateformat from 'dateformat'

export default  (Vue) => {
  Vue.filter('dateTime', function (val) {
    return dateformat(val, 'yyyy/mm/dd HH:MM')
  })
}
