<template>
  <div>
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      msg: '11'
    }
  },
  mounted() {
    this.getParams()
  },
  methods: {
    getParams() {
      const routerParams = this.$route.params.dataObj
      // 将数据放在当前组件的数据内
      this.msg = routerParams
    }
  }
}
</script>

<style scoped lang="scss">

</style>
