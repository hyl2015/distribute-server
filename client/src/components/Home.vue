<template>
  <div>
    <h1>Hello Home</h1>
  </div>
</template>

<script>
  import Drawer from 'muse-ui/src/drawer'
  import Divider from 'muse-ui/src/divider'
  import MuAppBar from 'muse-ui/src/appBar'
  import MuIconButton from 'muse-ui/src/iconButton'
  import List from 'muse-ui/src/list/list.vue'
  import ListItem from 'muse-ui/src/list/listItem.vue'
  import MuIcon from 'muse-ui/src/icon'
  import {GET_USER_INFO} from '../store/getter-types'

  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        info: GET_USER_INFO
      })
    },
    components: {
      Drawer,
      MuAppBar,
      Divider,
      MuIconButton,
      'mu-list': List,
      'mu-list-item': ListItem,
      MuIcon
    },
    methods: {
      goMenu (menu) {
        console.log(menu)
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
