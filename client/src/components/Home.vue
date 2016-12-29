<template>
  <div>
    <drawer :open="true" docked>
      <div class="mu-appbar app-nav-bar">
        <div class="left"></div>
        <div class="mu-appbar-title"><a href="/home" class="app-nav-title" style="display: inline-block;">Muse-UI</a>
          <div class="mu-badge-container app-version"><em class="mu-badge mu-badge-secondary">
            beta
          </em></div>
        </div>
        <div class="right"></div>
      </div>
      <divider></divider>
      <mu-list>
        <mu-list-item :title="menu.menuName" v-for="menu of info.menus" @click="goMenu(menu)">
          <mu-icon slot="left" :value="menu.menuIcon"/>
        </mu-list-item>
      </mu-list>
    </drawer>
    <div class="app-bar">
      <mu-app-bar title="Title">
        <mu-icon-button icon='menu' slot="left"/>
        <mu-icon-button icon='expand_more' slot="right"/>
      </mu-app-bar>
    </div>
    <div class="app-content">
      fdsf
    </div>
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
  .app-content {
    width: auto;
    right: 0;
    top: 64px;
    left: 256px;
    position: fixed;
  }

  .app-nav-bar {
    background-color: #fff;
    color: rgba(0, 0, 0, .54);
  }

  .app-nav-bar .app-nav-title {
    color: rgba(0, 0, 0, .54);
  }

  .app-nav-bar .app-version {
    margin-left: 10px;
    vertical-align: text-top;
  }

  .app-bar {
    width: auto;
    right: 0;
    top: 0;
    left: 256px;
    position: fixed;
  }
</style>
