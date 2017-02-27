<template>
  <div>
    <div class="banner">
      <div class="banner-title">
        RN发布系统
      </div>
      <div class="banner-desc">
        基于hapijs,vue的rn热更新系统的后台管理平台
      </div>
    </div>

    <div class="app-login">
      <flexbox orient="vertical">
        <flexbox-item>
          <text-field :error-text="httpError" label="用户名" v-model="userName" label-float/>
        </flexbox-item>
        <flexbox-item>
          <text-field label="密码" type="password" v-model="userPwd" label-float/>
        </flexbox-item>
        <flexbox-item>
          <!--<mu-button @click="login">登录</mu-button>-->
          <mu-button @click="testQuery">登录</mu-button>
        </flexbox-item>
      </flexbox>
    </div>
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
  import {
    GET_USER_INFO,
    GET_APP_HTTP_ERROR
  } from '../store/getter-types'
  import {ACTION_USER_INFO} from '../store/action-types'
  const Lokka = require('lokka').Lokka
  const Transport = require('lokka-transport-http').Transport

  const client = new Lokka({
    transport: new Transport('http://localhost:8080/api/graphql')
  })


  import {mapGetters} from 'vuex'
  export default {
    data (){
      return {
        userName: null,
        userPwd: null,
      }
    },
    computed: {
      ...mapGetters({
        info: GET_USER_INFO,
        httpError: GET_APP_HTTP_ERROR
      })
    },
    methods: {
      login () {
        userApi.login(this.userName, this.userPwd).then(() => {
          this.$router.push('home')
        })
      },
      testQuery () {
        client.query(`
            {
              echo
             }
      `).then(function (result) {
          console.log(result)
        })
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
