<template>
  <div id="app">
    <router-view class="page-container"></router-view>
    <BackTop></BackTop>
  </div>
</template>

<script>
import { BackTop  } from 'view-design'
export default {
  components: {
    BackTop
  },
}
</script>

<style lang="less">
#app, .page-container {
  width: 100%;
  height: 100%;
  background-color: #f4f5f5;
}
</style>
