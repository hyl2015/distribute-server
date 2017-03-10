/**
 * Created by hyl on 2017/3/9.
 */
import dateformat from 'dateformat'

export default  (Vue) => {
  Vue.filter('dateTime', function (val) {
    return dateformat(val, 'yyyy/mm/dd HH:MM')
  })
  Vue.filter('resVerStatus', function (status) {
    switch (status) {
      case 0:
        return '新创建'
      case 1:
        return '已打包'
      case 2:
        return '已上线'
      case 3:
        return '已下线'
    }
    return status
  })
}
