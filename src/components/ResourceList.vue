<template>
  <div>
    <mu-sub-header>资源版本列表</mu-sub-header>
    <mu-table :fixedFooter="true" :showCheckbox="false">
      <mu-thead slot="header">
        <mu-tr>
          <mu-th tooltip="ID">ID</mu-th>
          <mu-th tooltip="版本号">版本号</mu-th>
          <mu-th tooltip="git版本">git版本</mu-th>
          <mu-th tooltip="更新时间">更新时间</mu-th>
          <mu-th tooltip="操作">状态</mu-th>
          <mu-th tooltip="操作">详情</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="(item,index) in list" :key="item.id">
          <mu-td>{{item.id}}</mu-td>
          <mu-td>{{item.ver}}</mu-td>
          <mu-td>
            <div class="git-version">{{item.gitVer}}</div>
          </mu-td>
          <mu-td>{{item.updatedAt | dateTime}}</mu-td>
          <mu-td v-html="getStatusName(item.status)"></mu-td>
          <mu-td>操作按钮[回滚][详细]....</mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
    <mu-pagination :total="pagination.total" :page-size="pagination.pageSize" @pageChange="handleClick"></mu-pagination>
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
    GET_RES_VERSION_LIST,
    GET_RES_VERSION_PAGINATION
  } from '../store/getter-types'

  export default {
    computed: {
      ...mapGetters({
        list: GET_RES_VERSION_LIST,
        pagination: GET_RES_VERSION_PAGINATION
      })
    },
    created () {
      PublishApi.resVersionList()
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
      },
      getStatusName(status) {
        switch (status) {
          case 0:
            return '新创建'
          case 1:
            return '已打包'
          case 2:
            return '已上线'
          case 3:
            return '已下线'
        }
      }
    }
  }
</script>

<style scoped>
  .git-version {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
</style>
