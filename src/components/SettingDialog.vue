<template>
  <div>
    <mu-dialog :open="open">
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="tab1" title="基础配置"/>
        <!--<mu-tab value="tab2" title="TAB TWO"/>-->
        <!--<mu-tab value="tab3" title="TAB ACTIVE"/>-->
      </mu-tabs>
      <div v-if="activeTab === 'tab1'">
        <mu-text-field label="设置资源发布目录" full-width hintText="资源发布目录" :value="configObj['config.resource.dir']"/>
        <mu-text-field label="设置APP发布目录" full-width hintText="APP发布目录" :value="configObj['config.app.dir']"/>
        <br/>
      </div>
      <div v-if="activeTab === 'tab2'">
        <h2>Tab Two</h2>
        <p>
          这是第二个 tab
        </p>
      </div>
      <div v-if="activeTab === 'tab3'">
        <h2>Tab Three</h2>
        <p>
          这是第三个 tab
        </p>
      </div>

      <mu-flat-button label="保存" slot="actions" primary @click="onConfirm"/>
      <mu-flat-button label="取消" slot="actions" @click="cancel"/>
    </mu-dialog>
  </div>
</template>

<script>
  import MuDialog from 'muse-ui/src/dialog'
  import MuFlatButton from 'muse-ui/src/flatButton'
  import {
    tab as MuTab,
    tabs as MuTabs
  } from 'muse-ui/src/tabs'
  import  MuTextField from 'muse-ui/src/textField'
  import sysApi from '../api/sys'

  export default{
    props: {
      open: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        activeTab: 'tab1',
        configObj: {}
      }
    },
    watch: {
      open (val) {
        if (val) {
          const self = this
          sysApi.getConfigs().then(function (data) {
            self.configObj = data
          })
        }
      }
    },
    methods: {
      handleTabChange (val) {
        this.activeTab = val
      },
      onConfirm(){
        sysApi.updateConfigs()
        this.$emit('on-confirm')
      },
      cancel () {
        this.$emit('on-cancel')
      }
    },
    components: {
      MuDialog,
      MuFlatButton,
      MuTab,
      MuTabs,
      MuTextField
    }
  }
</script>
