/**
 * Created by hyl on 2016/12/21.
 */
export default {
  install (Vue, options) {
    Vue.prototype.$dispatch = function (actionType, ...args) {
      if (this.$store) {
        this.$store.dispatch(actionType, ...args)
      }
    }
  }
}
