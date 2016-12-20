<template>
  <div>
    <h1>Hello Home</h1>
  </div>
</template>

<script>
  import MuAppBar from 'muse-ui/src/appBar'
  import MuIconButton from 'muse-ui/src/iconButton'
  import FlexBox from 'muse-ui/src/flexbox/flexbox.vue'
  import FlexBoxItem from 'muse-ui/src/flexbox/flexboxItem.vue'
  import Button from 'muse-ui/src/raisedButton'
  import TextField from 'muse-ui/src/textField'


  import {mapGetters} from 'vuex'
  export default {
    components: {
      'mu-appbar': MuAppBar,
      'mu-icon-button': MuIconButton,
      'flexbox': FlexBox,
      'flexbox-item': FlexBoxItem,
      'text-field': TextField,
      'mu-button': Button
    }
  }
</script>

<style lang="less" scoped>

</style>
