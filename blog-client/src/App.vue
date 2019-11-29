<template>
  <div id="app">
    <router-view class="page-container"></router-view>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
import { Spin } from 'view-design'

export default {
  components: {
    Spin
  },
  computed: {
    spinShow() {
      return this.$store.state.spinShow || false
    }
  }
}
</script>

<style lang="less">
#app {
  position: relative;
  .ivu-spin-fix {
    z-index: 99999;
  }
}
#app, .page-container {
  min-width: 1200px;
  height: 100%;
  background-color: #f4f5f5;
}
</style>
