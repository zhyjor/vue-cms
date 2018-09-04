<template>
  <div  class="app-container">
    <!--运营商账号筛选栏-->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter"
                style="width: 200px"
                class="filter-item"
                :placeholder="$t('table.title')"
                v-model="listQuery.title">
      </el-input>
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type"
                 :placeholder="$t('table.type')">
        <el-option v-for="item in calendarTypeOptions" :key="item.key"
                   :label="item.display_name"
                   :value="item.key">
        </el-option>
      </el-select>
      <el-select @change="handleFilter" style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" icon="el-icon-download"
                 @click="handleDownload">{{$t('table.export')}}
      </el-button>
      <el-checkbox class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1" v-model="showReviewer">
        {{$t('table.reviewer')}}
      </el-checkbox>
    </div>

    <!--运营商信息审核表格-->
    <el-table
      :key="tableKey" :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;min-height:1000px;">
      <el-table-column align="center" :label="$t('table.id')" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('table.startTime')" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.startTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('table.idCard')" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.idCard}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.tel')" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.tel}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.idCardNo')" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.idCardNo}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('table.idCardPic')" width="200">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            title="大图模式"
            trigger="hover">
            <img :src="scope.row.idCardPic" width="360px" height="200px" :alt="scope.row.idCard">
            <img slot="reference" :src="scope.row.idCardPic" :alt="scope.row.idCard"  width="180px" height="100px">
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('table.busiLicNum')" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.busiLicNum}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.busiLicName')" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.busiLicName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('table.busiLicPic')" min-width="200" class="imgHover">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            title="大图模式"
            trigger="hover">
            <img :src="scope.row.busiLicPic" width="360px" height="200px" alt="营业执照照片" >
            <img slot="reference" :src="scope.row.busiLicPic" :alt="scope.row.busiLicName" width="180px" height="100px">
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" :label="$t('table.status')" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="120" v-if='showReviewer' align="center" :label="$t('table.reviewer')">
        <template slot-scope="scope">
          <span style='color:red;'>{{scope.row.reviewer}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('table.endTime')" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.endTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('table.actions')" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==='未处理'" size="mini" type="success"
                     @click="handleModifyStatus(scope.row,'accept')">{{$t('table.accept')}}
          </el-button>
          <el-button v-if="scope.row.status==='未处理'" size="mini" type="danger"
                     @click="handleModifyStatus(scope.row,'refuse')">{{$t('table.refuse')}}
          </el-button>
          <el-button v-if="scope.row.status==='已通过'" size="mini" type="danger"
                     @click="handleModifyStatus(scope.row,'terminate')">{{$t('table.terminate')}}
          </el-button>
          <el-button v-if="scope.row.status==='已拒绝'||scope.row.status==='已过期'" size="mini"
                     @click="handleModifyStatus(scope.row,'deleted')">{{$t('table.delete')}}
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <!--分页显示-->
    <div class="pagination-container">
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="listQuery.page"
                     :page-sizes="[10,20]"
                     :page-size="listQuery.limit"
                     layout="total,sizes,prev,pager,next,jumper"
                     :total="total">

      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { fetchTableList } from '@/api/tableList'
  const calendarTypeOptions = [
    { key: '1', display_name: '未处理' },
    { key: '2', display_name: '已通过' },
    { key: '3', display_name: '已拒绝' },
    { key: '4', display_name: '已过期' }
  ]

  export default {
    name: 'traderIdentityVerification',
    data() {
      return {
        list: null,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        calendarTypeOptions,
        sortOptions: [{ label: 'ID升序', key: '+id' }, { label: 'ID降序', key: '-id' }],
        downloadLoading: false,
        showReviewer: false,
        listLoading: false,
        tableKey: 0,
        total: null
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    created() {
      // 获取测试数据
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        fetchTableList(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data.total

          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      },
      handleFilter() {
        alert('handleFilter')
        this.listQuery.page = 1
        this.getList()
      },
      handleDownload() {
        alert('handleDownload')
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
          })
          this.downloadLoading = false
        })
      },
      handleSizeChange(val) {
        alert('handleSizeChange')
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        alert('handleCurrentChange')
        this.listQuery.page = val
        this.getList()
      },
      handleModifyStatus(row, status) {
        alert('handleModifyStatus')
      }
    }
  }

</script>

<style scoped lang="scss">
  /**试一下hover样式**/
  /*img:hover {*/
    /*transform: scale(5.0);*/
  /*}*/

  /*.imgHover:hover{*/
    /*width: 500px;*/
    /*height: 400px;*/
  /*}*/

</style>
