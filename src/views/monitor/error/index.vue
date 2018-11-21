<template>
  <div>
    这里是前端错误信息监控
    <el-button @click="sendParams(11)">跳转11</el-button>
    <el-button @click="sendParams(12)">跳转12</el-button>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      msg: '12'
    }
  },
  methods: {
    sendParams(val) {
      this.$router.push({
        path: '/monitor/fe-device',
        name: 'Device',
        params: {
          name: 'name',
          dataObj: val
        }
        // query: {
        //   name: 'name',
        //   dataObj: val
        // }
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
