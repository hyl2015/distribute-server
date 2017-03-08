<template>
  <div id="app">
    <router-view></router-view>
    <toast v-show="httpError" :message="httpError"></toast>
    <mu-popup position="top" popup-class="popup-top" :overlay="false" :open="!!toastMsg">
      {{toastMsg}}
    </mu-popup>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {
    GET_APP_REQUEST_COUNT,
    GET_APP_HTTP_ERROR,
    GET_APP_TOAST_MSG
  } from './store/getter-types'
  import Toast from 'muse-ui/src/toast'
  import MuPopup from 'muse-ui/src/popup'
  export default {
    name: 'app',
    computed: {
      ...mapGetters({
        requestCount: GET_APP_REQUEST_COUNT,
        httpError: GET_APP_HTTP_ERROR,
        toastMsg: GET_APP_TOAST_MSG,
      })
    },
    watch: {
      requestCount (val){
        if (val > 0) {
          this.$Progress.start()
        } else {
          if (!this.httpError) {
            this.$Progress.finish()
          } else {
            this.$Progress.fail()
          }
        }
      }
    },
    components: {
      Toast,
      MuPopup
    }
  }
</script>

<style lang="less" scoped>
  #app {
    height: 100%;
  }
</style>
