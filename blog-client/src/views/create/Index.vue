<template>
  <div class="create-wrap">
    <div class="top-wrap">
      <input
        type="text"
        autofocus
        placeholder="输入文章标题..."
        spellcheck="false"
        maxlength="80"
        class="title-input"
        v-model="params.title"/>
      <div class="user-info">
        <Button class="btn" type="primary" @click="doPublish">发布</Button>
        <Avatar class="cur" :src="userInfo.avatar" />
      </div>
    </div>
    <div class="edit-wrap">
      <mavon-editor
        class="edit-box"
        :boxShadow="false"
        :autofocus="false"
        ref='md'
        :imageFilter="imageFilter"
        @imgAdd="handleImgAdd"
        @imgDel="handleImgDel"
        @change="handleChange"
        previewBackground="#fff"/>
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
import {
  Button,
  Avatar,
  Spin
} from 'view-design'
import { mavonEditor } from 'mavon-editor'
import storage from '@/utils/storage'
import { IMAGE_EMUN } from '@/utils/constant'

export default {
  data() {
    return {
      spinShow: false,
      mavonVal: null,
      params: {
        title: '',
        content: '',
        image: ''
      }
    }
  },
  components: {
    Button,
    Avatar,
    mavonEditor,
    Spin
  },
  computed: {
    userInfo() {
      console.log(storage.getStorage('userInfo'), 9999)
      return storage.getStorage('userInfo') || this.$store.state.userInfo || {}
    }
  },
  mounted() {
  },
  methods: {
    imageFilter($file) {
      return IMAGE_EMUN.indexOf($file.type) > -1
    },
    handleChange(val, render) {
      this.params.content = render
    },
    handleImgAdd(pos, $file) {
      const formData = new FormData()
      formData.append('file', $file)
      this.$store.dispatch('uploadImg', formData).then(res => {
        console.log('返回结果：', res)
        this.$refs.md.$img2Url(pos, res.absoluteFilePath)
        this.$refs.md.$imgUpdateByUrl(pos, res.absoluteFilePath)
      })
    },
    handleImgDel(pos) {
      this.$refs.md.$refs.toolbar_left.$imgDelByFilename(pos)
    },
    doPublish() {
      this.spinShow = true
      this.$store.dispatch('create/handlePublish', this.params).then(res => {
        this.spinShow = false
        this.$router.go(-1)
      })
    }
  },
}
</script>

<style lang="less">
.create-wrap {
  height: 100%;
  .top-wrap {
    width: 100%;
    height: 80px;
    display: flex;
    padding: 0 20px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    .title-input {
      width: 70%;
      line-height: 80px;
      border: none;
      outline: none;
      font-size: 28px;
      font-weight: 700;
      color: #000;
      background: none;
    }
    .user-info {
      .btn {
        margin-right: 20px;
      }
      .cur {
        width: 50px;
        height: 50px;
      }
    }
  }
  .edit-wrap {
    width: 100%;
    height: 100%;
    .edit-box {
      height: 100%;
    }
  }
}
</style>