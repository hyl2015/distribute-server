<template>
  <div id="app">
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="text">文字按钮</el-button>
  </div>
</template>

<script>
  import Hello from './components/Hello'
  import {mapGetters} from 'vuex'
  import {Button, Select} from 'element-ui'
  export default {
    name: 'app',
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
      }
    },
    components: {
      Hello,
      ElButton: Button,
      Select
    }
  }
</script>

<style>
  /*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  /*}*/
</style>
