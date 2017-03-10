<template>
  <div>
    <div style="text-align: right;">
      <flat-button  @click="$router.back()">
        返回
      </flat-button>
    </div>
    <div class="ver-info-content">
      <flexbox class="line">
        <flexbox-item>
          <div class="title">
            版本号:
          </div>
        </flexbox-item>
        <flexbox-item :grow="3">
          <div class="value">
            {{versionInfo.ver}}
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox class="line">
        <flexbox-item>
          <div class="title">
            git分支和版本:
          </div>
        </flexbox-item>
        <flexbox-item :grow="3">
          <div class="value">
            {{versionInfo.gitVer}}
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox class="line">
        <flexbox-item>
          <div class="title">
            状态:
          </div>
        </flexbox-item>
        <flexbox-item :grow="3">
          <div class="value">
            {{versionInfo.status | resVerStatus}}
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox class="line">
        <flexbox-item>
          <div class="title">
            更新日期:
          </div>
        </flexbox-item>
        <flexbox-item :grow="3">
          <div class="value">
            {{versionInfo.updatedAt | dateTime}}
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox class="line">
        <flexbox-item>
          <div class="left-btn">
            <raised-button primary v-if="versionInfo.status===0" @click="packaging">
              打包
            </raised-button>
            <raised-button primary v-if="versionInfo.status===1" @click="online">
              上线
            </raised-button>
            <raised-button primary v-if="versionInfo.status===2" @click="offline">
              下线
            </raised-button>
          </div>
        </flexbox-item>
        <flexbox-item :grow="3">
          <div class="value">
            <raised-button secondary @click="remove">
              删除
            </raised-button>
          </div>
        </flexbox-item>
      </flexbox>
    </div>

    <mu-dialog :open="showPackaging" title="打包中">
      打包中，请不要关闭页面～
      <div style="text-align: center;">
        <mu-circular-progress :strokeWidth="5" :size="90"/>
      </div>
    </mu-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import publishApi from '../api/publish'
  import {
    ACTION_APP_TITLE,
    ACTION_APP_SHOW_TOAST_MSGA
  } from '../store/action-types'
  import raisedButton from 'muse-ui/src/raisedButton'
  import flatButton from 'muse-ui/src/flatButton'

  import {
    flexboxItem,
    flexbox
  } from 'muse-ui/src/flexbox'
  import ContentBlock from 'muse-ui/src/contentBlock'
  import MuDialog from 'muse-ui/src/dialog'
  import MuCircularProgress from 'muse-ui/src/circularProgress'

  export default {
    computed: {
      ...mapGetters({})
    },
    components: {
      ContentBlock,
      flexboxItem,
      flexbox,
      MuCircularProgress,
      MuDialog,
      flatButton,
      raisedButton
    },
    data () {
      return {
        versionInfo: {},
        showPackaging: false
      }
    },
    created () {
      this.$dispatch(ACTION_APP_TITLE, '版本详情')
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        const self = this
        publishApi.getVersionInfo(this.$route.params.id).then(function (data) {
          self.versionInfo = data
        })
      },
      packaging () {
        const self = this
        self.showPackaging = true
        publishApi.resVerPackaging(self.versionInfo.id).then(function (data) {
          self.showPackaging = false
          self.$dispatch(ACTION_APP_SHOW_TOAST_MSGA, '打包成功～')
          self.versionInfo = data
        }).catch(function () {
          self.showPackaging = false
        })
      },
      online () {
        const self = this
        publishApi.resVerOnLine(self.versionInfo.id).then(function (data) {
          self.$dispatch(ACTION_APP_SHOW_TOAST_MSGA, '该版本上线成功～')
          self.versionInfo.status = data
        })
      },
      offline () {
        const self = this
        publishApi.resVerOffLine(self.versionInfo.id).then(function (data) {
          self.$dispatch(ACTION_APP_SHOW_TOAST_MSGA, '该版本已经下线~')
          self.versionInfo.status = data
        })
      },
      remove () {
        const self = this
        publishApi.resVerRemove(self.versionInfo.id).then(function (data) {
          self.$dispatch(ACTION_APP_SHOW_TOAST_MSGA, '删除成功～')
          self.$router.push('/resources')
        })
      }
    }
  }
</script>

<style scoped>
  .ver-info-content {
    margin: 10% auto 0 auto;
  }

  .ver-info-content .line {
    margin-bottom: 1rem;
  }

  .ver-info-content .title {
    text-align: right;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .ver-info-content .left-btn {
    text-align: right;
  }

  .ver-info-content .value {
    text-align: left;
  }

</style>
