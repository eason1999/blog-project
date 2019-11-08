<template>
  <div class="create-wrap">
    <div class="top-wrap">
      <input type="text" autofocus placeholder="输入文章标题..." spellcheck="false" maxlength="80" class="title-input" />
      <div class="user-info">
        <Button class="btn" type="primary">发布</Button>
        <Avatar class="cur" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
      </div>
    </div>
    <div class="edit-wrap">
      <mavon-editor
        class="edit-box"
        :boxShadow="false"
        :autofocus="false"
        ref='md'
        @imgAdd="handleImgAdd"
        @change="handleChange"
        previewBackground="#fff"/>
    </div>
  </div>
</template>

<script>
import {
  Button,
  Avatar
} from 'view-design'
import { mavonEditor } from 'mavon-editor'

export default {
  data() {
    return {
      mavonVal: null
    }
  },
  components: {
    Button,
    Avatar,
    mavonEditor
  },
  computed: {},
  mounted() {
  },
  methods: {
    handleChange(val, render) {
      console.log(render, 888)
    },
    handleImgAdd(pos, $file) {}
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