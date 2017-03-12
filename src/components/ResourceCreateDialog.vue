<template>
  <div>

    <mu-dialog :open="open" title="创建新版本">
      <mu-select-field full-width v-model="gitBranch" :labelFocusClass="['label-foucs']"
                       :error-text="$v.gitBranch.$invalid?'请选择分支':null" label="选择git分支">
        <mu-menu-item v-for="(branch,index) in createInfo.branches" :value="branch.id" :title="branch.name"
                      :key="index"/>
      </mu-select-field>

      <mu-select-field full-width v-model="preVer" :labelFocusClass="['label-foucs']"
                       :error-text="$v.preVer.$invalid?'请选择依赖版本':null" label="选择依赖版本">
        <mu-menu-item :value="0" title="初始版本"/>
        <mu-menu-item v-for="(ver,index) in createInfo.resVers" :value="ver.id" :title="ver.ver" :key="ver.id"/>
      </mu-select-field>
      <mu-select-field full-width v-model="platform" :labelFocusClass="['label-foucs']"
                       :error-text="$v.platform.$invalid?'请选择系统版本':null" label="选择系统版本">
        <mu-menu-item :value="0" title="全部"/>
        <mu-menu-item :value="1" title="IOS"/>
        <mu-menu-item :value="2" title="ANDROID"/>

      </mu-select-field>
      <mu-text-field label="输入版本号" full-width hintText="版本号" v-model="verName"
                     :error-text="$v.verName.$invalid?'请输输入版本号':null"/>

      <mu-text-field label="输入版本说明" full-width hintText="版本说明" multi-line v-model="notes"
                     :error-text="$v.notes.$invalid?'请输入版本说明':null" :max-length="512"/>

      <mu-flat-button label="创建" primary slot="actions" :disabled="$v.$invalid" @click="onCreate"/>
      <mu-flat-button label="关闭" slot="actions" @click="onClose"/>
    </mu-dialog>
  </div>
</template>

<script>
  import  MuTextField from 'muse-ui/src/textField'
  import  MuSelectField from 'muse-ui/src/selectField'
  import  {menuItem as MuMenuItem} from 'muse-ui/src/menu'
  import MuDialog from 'muse-ui/src/dialog'
  import MuFlatButton from 'muse-ui/src/flatButton'
  import publishApi from '../api/publish'
  import {ACTION_APP_SHOW_TOAST_MSGA} from '../store/action-types'
  import {
    required,
    minLength,
    between
  } from 'vuelidate/lib/validators'
  export default {
    props: {
      open: Boolean,
    },
    data () {
      return {
        createInfo: {},
        gitBranch: null,
        preVer: null,
        platform: null,
        verName: null,
        notes: null
      }
    },
    validations: {
      gitBranch: {
        required
      },
      preVer: {
        required
      },
      notes: {
        required
      },
      verName: {
        required
      },
      platform: {
        required
      }
    },
    watch: {
      open(val) {
        const self = this
        if (val) {
          publishApi.getCreateInfo().then(function (data) {
            self.createInfo = data.res.createInfo
          })
        }
      }
    },
    components: {
      MuFlatButton,
      MuTextField,
      MuMenuItem,
      MuDialog,
      MuSelectField
    },
    methods: {
      onCreate () {
        const self = this
        publishApi.resCreateNewVer({
          gitBranch: self.gitBranch,
          preVer: self.preVer,
          verName: self.verName,
          platform: self.platform,
          notes: self.notes
        }).then(function () {
          self.$dispatch(ACTION_APP_SHOW_TOAST_MSGA, '创建成功～')
          self.$emit('on-create')
        })

      },
      onClose () {
        this.$emit('on-close')
      }
    }
  }
</script>

<style scoped>

</style>
