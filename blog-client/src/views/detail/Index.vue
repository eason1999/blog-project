<template>
  <div>
    <blog-header :hide="hide" />
    detail
  </div>
</template>

<script>
import BlogHeader from '@/components/BlogHeader'

export default {
  data() {
    return {}
  },
  components: {
    BlogHeader
  },
  computed: {
    hide() {
      return this.$route.query.hide
    }
  },
  methods: {},
  mounted() {},
}
</script>

<style lang="less">

</style>