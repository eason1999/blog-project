<template>
  <div id="app">
    <router-view class="page-container"></router-view>
  </div>
</template>

<script>

export default {
  components: {
  },
}
</script>

<style lang="less">
#app, .page-container {
  min-width: 1200px;
  height: 100%;
  background-color: #f4f5f5;
}
</style>
