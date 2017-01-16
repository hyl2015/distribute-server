<template>
  <div>
    <mu-sub-header>发布历史列表</mu-sub-header>
    <mu-table :fixedFooter="true" :showCheckbox="false">
      <mu-thead slot="header">
        <mu-tr>
          <mu-th tooltip="ID">ID</mu-th>
          <mu-th tooltip="时间">发布时间</mu-th>
          <mu-th tooltip="版本">发布版本</mu-th>
          <mu-th tooltip="操作">操作</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="item,index in list">
          <mu-td>{{index + 1}}</mu-td>
          <mu-td>{{item.time}}</mu-td>
          <mu-td>{{item.version}}</mu-td>
          <mu-td>操作按钮[回滚][详细]....</mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
    <mu-pagination :total="total" :current="current" @pageChange="handleClick"> </mu-pagination>
  </div>
</template>

<script>
  import MuContentBlock from 'muse-ui/src/contentBlock'
  import SubHeader from 'muse-ui/src/subHeader'
  import Table from 'muse-ui/src/table/table.vue'
  import Thead from 'muse-ui/src/table/thead.vue'
  import Td from 'muse-ui/src/table/td.vue'
  import Th from 'muse-ui/src/table/th.vue'
  import Tr from 'muse-ui/src/table/tr.vue'
  import TBody from 'muse-ui/src/table/tbody.vue'
  import Pagination from 'muse-ui/src/pagination'
  import PublishApi from '../api/publish'
  import {mapGetters} from 'vuex'
  import {
    GET_PUBLISH_LIST,
    GET_PUBLISH_LIST_TOTAL,
    GET_PUBLISH_LIST_CURRENT
  } from '../store/getter-types'

  export default {
    computed: {
      ...mapGetters({
        list: GET_PUBLISH_LIST,
        total: GET_PUBLISH_LIST_TOTAL,
        current: GET_PUBLISH_LIST_CURRENT
      })
    },
    created () {
      PublishApi.getList()
    },
    components: {
      MuContentBlock,
      'mu-table': Table,
      'mu-td': Td,
      'mu-th': Th,
      'mu-tr': Tr,
      'mu-tbody': TBody,
      'mu-thead': Thead,
      'mu-sub-header': SubHeader,
      'mu-pagination': Pagination
    },
    methods: {
      handleClick (newIndex) {
        console.info(newIndex)
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
