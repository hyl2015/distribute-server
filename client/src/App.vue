<template>
  <div id="app">
    {{info.name}}
  </div>
</template>

<script>
  import Hello from './components/Hello'
  import {mapGetters} from 'vuex'
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
      Hello
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
