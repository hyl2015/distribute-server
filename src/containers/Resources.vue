<template>
  <div>
    <div class="resources-header">
      <mu-btn primary @click="createNewVersion">创建新版本</mu-btn>
    </div>


    <resource-create-dialog :open="showCreateDlg"
                            @on-create="onCreate"
                            @on-close="showCreateDlg=false"></resource-create-dialog>

    <resource-list></resource-list>
  </div>
</template>

<script>


  import {
    flexbox as MuFlexbox,
    flexboxItem as MuFlexboxItem
  } from 'muse-ui/src/flexbox'
  import MuBtn from 'muse-ui/src/raisedButton'
  import ResourceCreateDialog from '../components/ResourceCreateDialog.vue'
  import ResourceList from '../components/ResourceList.vue'
  import publishApi from '../api/publish'
  import {mapGetters} from 'vuex'

  export default {
    data () {
      return {
        showCreateDlg: false
      }
    },
    created () {
        this.fetchData()
    },
    components: {
      MuFlexbox,
      MuFlexboxItem,
      MuBtn,
      ResourceCreateDialog,
      ResourceList
    },
    methods: {
      createNewVersion () {
        this.showCreateDlg = true
      },
      onCreate () {
        this.showCreateDlg = false
        this.fetchData()
      },
      fetchData () {
        publishApi.resVersionList(1, 10)
      }
    }
  }
</script>

<style scoped>
  .resources-header {
    text-align: right;
  }
</style>
