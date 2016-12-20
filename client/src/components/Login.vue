<template>
  <div>
    <div class="banner">
      <div class="banner-title">
        RN发布系统
      </div>
      <div class="banner-desc">
        基于chaijs,vue的rn热更新系统的后台管理平台
      </div>
    </div>

    <div class="app-login">
      <flexbox orient="vertical">
        <flexbox-item>
          <text-field label="用户名" label-float/>
        </flexbox-item>
        <flexbox-item>
          <text-field label="密码" label-float/>
        </flexbox-item>
        <flexbox-item>
          <mu-button @click="login">登录</mu-button>
        </flexbox-item>
      </flexbox>
    </div>x
  </div>
</template>

<script>
  import MuAppBar from 'muse-ui/src/appBar'
  import MuIconButton from 'muse-ui/src/iconButton'
  import FlexBox from 'muse-ui/src/flexbox/flexbox.vue'
  import FlexBoxItem from 'muse-ui/src/flexbox/flexboxItem.vue'
  import Button from 'muse-ui/src/raisedButton'
  import TextField from 'muse-ui/src/textField'
  import userApi from '../api/user'


  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        info: 'getUserInfo',
        demoInfo: 'getDemoInfo',
      })
    },
    methods: {
      showInfo () {
        this.$store.dispatch('updateInfo', 'hyl')
      },
      showDemoInfo () {
        this.$store.dispatch('updateDemoInfo', 'demo info')
      },
      login () {
//        this.$router.push('home')
        userApi.login('hyl', '123')
      }
    },
    components: {
      'mu-appbar': MuAppBar,
      'mu-icon-button': MuIconButton,
      'flexbox': FlexBox,
      'flexbox-item': FlexBoxItem,
      'text-field': TextField,
      'mu-button': Button
    }
  }
</script>

<style lang="less" scoped>
  .banner {
    padding-top: 3rem;
    background-color: #009688;
  }

  .banner .banner-title {
    text-align: center;
    font-size: 3rem;
    color: #fff;
    font-weight: bold;
  }

  .banner .banner-desc {
    text-align: center;
    font-size: 2rem;
    color: #fff;
    padding-bottom: 3rem;
  }
</style>
