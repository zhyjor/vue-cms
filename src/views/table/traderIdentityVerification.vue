<template>
  <div>
    <!--运营商账号筛选栏-->

    <!--运营商信息审核表格-->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column align="center" :label="$t('table.id')" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.idCardName')" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.cardName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="身份证名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="身份证号码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="身份证照片"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="经营许可证编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="经营许可证名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="经营许可证照片"
        width="180">
      </el-table-column>

    </el-table>



  </div>
</template>

<script>

</script>

<style>

</style>
