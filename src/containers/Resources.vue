<template>
  <div>
    <div class="resources-header">
      <mu-btn primary @click="createNewVersion">创建新版本</mu-btn>
    </div>


    <mu-dialog :open="showCreateDlg" title="创建新版本">
      <resource-create></resource-create>
      <mu-flat-button label="关闭" slot="actions" @click="showCreateDlg=false"/>
    </mu-dialog>
  </div>
</template>

<script>


  import {
    flexbox as MuFlexbox,
    flexboxItem as MuFlexboxItem
  } from 'muse-ui/src/flexbox'
  import MuDialog from 'muse-ui/src/dialog'
  import MuFlatButton from 'muse-ui/src/flatButton'
  import MuBtn from 'muse-ui/src/raisedButton'
  import ResourceCreate from '../components/ResourceCreate.vue'
  import publishApi from '../api/publish'

  import {mapGetters} from 'vuex'

  export default {
    data () {
      return {
        showCreateDlg: false
      }
    },
    created () {

    },
    components: {
      MuFlexbox,
      MuFlexboxItem,
      MuDialog,
      MuFlatButton,
      MuBtn,
      ResourceCreate
    },
    methods: {
      createNewVersion () {
        const self = this
        self.showCreateDlg = true
        publishApi.getCreateInfo()
      }
    }
  }
</script>

<style scoped>
  .resources-header {
    float: right;
  }
</style>
