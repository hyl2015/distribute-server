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
      <mu-content-block>
        <h2>
          访问的页面不存在！
        </h2>
        <router-link to="home">返回首页</router-link>
      </mu-content-block>
    </div>
  </div>
</template>

<script>
  import MuContentBlock from 'muse-ui/src/contentBlock'

  export default {
    methods: {
      login () {

      }
    },
    components: {
      MuContentBlock
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
