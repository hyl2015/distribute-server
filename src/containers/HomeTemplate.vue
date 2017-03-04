<template>
  <div>
    <drawer docked :open="menuOpen">
      <div class="mu-appbar app-nav-bar">
        <div class="left"></div>
        <div class="mu-appbar-title">
          <div class="app-nav-title">
            <span @click="goHome">发布系统</span>
          </div>
          <div class="mu-badge-container app-version"><em class="mu-badge mu-badge-secondary">
            alpha 0.1
          </em></div>
        </div>
        <div class="right"></div>
      </div>
      <divider></divider>
      <mu-list :value="value">
        <mu-list-item :title="menu.menuName" v-for="menu of info.permission.menus" @click="goMenu(menu)"
                      :value="menu.menuUrl">
          <mu-icon slot="left" :value="menu.menuIcon"/>
        </mu-list-item>
      </mu-list>
    </drawer>
    <div class="app-bar" :class="{'app-bar-hide':!menuOpen}">
      <mu-app-bar :title="appTitle">
        <mu-icon-button icon='menu' slot="left" @click="toggleMenuPanel"/>
        <!--<mu-icon-button icon='expand_more' slot="right"/>-->
        <mu-icon-menu icon="more_vert" slot="right">
          <mu-menu-item title="设置" @click="openSettingDialog"/>
        </mu-icon-menu>
      </mu-app-bar>
    </div>
    <div class="app-content" :class="{'app-content-hide':!menuOpen}">
      <mu-content-block>
        <router-view></router-view>
      </mu-content-block>
    </div>
    <setting-dialog :open="showSetting" @on-confirm="closeDialog" @on-cancel="showSetting=false"></setting-dialog>
  </div>
</template>

<script>
  import Drawer from 'muse-ui/src/drawer'
  import Divider from 'muse-ui/src/divider'
  import MuAppBar from 'muse-ui/src/appBar'
  import MuIconButton from 'muse-ui/src/iconButton'
  import MuContentBlock from 'muse-ui/src/contentBlock'
  import MuIconMenu from 'muse-ui/src/iconMenu'
  import {menuItem as MuMenuItem} from 'muse-ui/src/menu'
  import List from 'muse-ui/src/list/list.vue'
  import ListItem from 'muse-ui/src/list/listItem.vue'
  import MuIcon from 'muse-ui/src/icon'
  import SettingDialog from '../components/SettingDialog.vue'


  import {
    GET_USER_INFO,
    GET_APP_TITLE
  } from '../store/getter-types'
  import {ACTION_APP_TITLE} from '../store/action-types'

  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        menuOpen: true,
        value: null,
        showSetting: false
      }
    },
    computed: {
      ...mapGetters({
        info: GET_USER_INFO,
        appTitle: GET_APP_TITLE
      })
    },
    components: {
      Drawer,
      MuAppBar,
      Divider,
      MuIconButton,
      'mu-list': List,
      'mu-list-item': ListItem,
      MuMenuItem,
      MuIconMenu,
      MuIcon,
      MuContentBlock,
      SettingDialog
    },
    methods: {
      goMenu (menu) {
        this.value = menu.menuUrl
        this.$dispatch(ACTION_APP_TITLE, menu.menuName)
        this.$router.push(menu.menuUrl)
      },
      toggleMenuPanel () {
        this.menuOpen = !this.menuOpen
      },
      goHome () {
        this.value = null
        this.$dispatch(ACTION_APP_TITLE, '首页')
        this.$router.push('home')
      },
      openSettingDialog () {
        this.showSetting = true
      },
      closeDialog () {
        this.showSetting = false
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
    display: inline-block;
  }

  .app-nav-bar .app-nav-title span {
    color: rgba(0, 0, 0, .54);
    cursor: pointer;
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

  .app-bar-hide {
    left: 0;
  }

  .app-content-hide {
    left: 0;
  }
</style>
