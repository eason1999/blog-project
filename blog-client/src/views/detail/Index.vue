<template>
  <div>
    <blog-header />
    <div class="detail-wrap">
      <div class="content-wrap box-shadow bg-color">
        <div>
          <h1 class="title">{{detail.title}}</h1>
          <div class="content" v-html="detail.content"></div>
        </div>
        <div class="comment-wrap">
          <div class="title">评论</div>
          <div class="ipt-box-wrap">
            <div class="avatar">
              <img class="img" src="https://mirror-gold-cdn.xitu.io/168e091d8e00681a260?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"/>
            </div>
            <div class="comment-box">
              <div
                class="comment bg-color"
                contenteditable="true"
                spellcheck="false"
                placeholder="输入评论..."
                @focus="handleFocus"
                @blur="handleBlur"
                ref="commentIpt"></div>
              <div class="btn-wrap" v-if="isShowPublic">
                <div class="icon-wrap cur">
                  <Icon class="icon" type="ios-happy-outline" /> 表情
                </div>
                <Button type="primary">发布</Button>
              </div>
            </div>
          </div>
          <div class="comment-list"></div>
          <div class="load-more cur">查看更多>></div>
        </div>
      </div>
      <div class="author-info box-shadow bg-color">
        <div class="title">关于作者</div>
        <ul class="list">
          <li class="info">
            <img class="img" :src="detail.user.avatar"/>
            <div class="info-wrap">
              <div class="name">{{detail.user.userName}}</div>
              <div class="role">{{userTag[detail.user.tag]}}</div>
            </div>
          </li>
          <!-- <li class="num-wrap">
            <Icon class="icon" type="ios-thumbs-up-outline" />
            获得点赞：<span class="num">123</span>
          </li> -->
          <li class="num-wrap">
            <Icon class="icon" type="ios-eye-outline" />
            文章被查看：<span class="num">{{detail.check}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Icon,
  Button
} from 'view-design'
import hljs from 'highlight.js'
import BlogHeader from '@/components/BlogHeader'
import { USER_TAG } from '@/utils/constant'

export default {
  data() {
    return {
      isShowPublic: false,
      isTrue: true,
      detail: {
        user: {
          userName: '',
          avatar: '',
          tag: ''
        }
      }
    }
  },
  components: {
    BlogHeader,
    Icon,
    Button
  },
  computed: {
    id() {
      return this.$route.params.id || undefined
    },
    userId() {
      return this.$route.query.userId || undefined
    },
    userTag() {
      return USER_TAG
    }
  },
  mounted() {
    this.getDetail()
    hljs.initHighlightingOnLoad()
  },
  methods: {
    handleFocus() {
      // if (this.isTrue) {
      //   this.$refs.commentIpt.blur()
      //   return false
      // }
      this.isShowPublic = true
      // this.$refs.commentIpt.blur()
    },
    handleBlur() {
      this.isShowPublic = false
    },
    getDetail() {
      this.$store.commit('updateSpinShow', true)
      const params = {
        id: this.id,
        userId: this.userId
      }
      this.$store.dispatch('detail/getDetail', params).then(res => {
        console.log(res, 999)
        Object.assign(this.detail, res)
        this.$store.commit('updateSpinShow', false)
      })
    }
  }
}
</script>

<style lang="less">
.detail-wrap {
  width: 1000px;
  margin: 20px auto;
  display: flex;
  height: auto;
  .author-info {
    width: 230px;
    height: 190px;
    border-radius: 4px;
    font-size: 14px;
    .title {
      color: #464c5b;
      line-height: 50px;
      padding: 0 20px;
      border-bottom: 1px solid #eee;
    }
    .list {
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      .info {
        display: flex;
        align-items: center;
        .img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .info-wrap {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .name {
            font-size: 16px;
            color: #464c5b;
          }
          .role {
            font-size: 14px;
            color: #9ea7b4;
          }
        }
      }
      .num-wrap {
        margin-top: 20px;
        .icon {
          font-size: 18px;
        }
        .num{
          color: #464c5b;
          vertical-align: baseline;
        }
      }
    }
  }
  .content-wrap {
    flex: 1;
    border-radius: 4px;
    margin-right: 20px;
    padding: 20px 30px;
    box-sizing: border-box;
    height: 100%;
    width: 750px;
    .title {
      font-size: 28px;
      text-align: center;
      margin: 10px auto 30px;
    }
    .content {
      height: 100%;
      table {
        margin: 20px auto;
        width: 100%;
        text-align: center;
        td, th {
          border: 1px solid #ddd;
          padding: 5px 15px;
        }
      }
      pre {
        margin: 20px auto;
      }
    }
    .comment-wrap {
      .title {
        font-size: 16px;
        text-align: center;
        line-height: 60px;
      }
      .ipt-box-wrap {
        width: 100%;
        display: flex;
        align-items: flex-start;
        padding: 10px 15px;
        background: #FAFBFC;
        border-radius: 4px;
        box-sizing: border-box;
        .avatar {
          width: 35px;
          height: 35px;
          margin-right: 10px;
          .img {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .comment-box {
          flex: 1;
          .comment {
            border-radius: 4px;
            width: 100%;
            height: 40px;
            line-height: 40px;
            color: #17181a;
            font-size: 14px;
            padding: 0 10px;
            box-sizing: border-box;
            outline: none;
            border: 1px solid #eee;
            &:focus {
              border-color: #3399ff;
            }
          }
          .btn-wrap {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 10px;
            .icon-wrap {
              font-size: 14px;
              color: #3399ff;
              .icon {
                font-size: 16px;
              }
            }
          }
        }
      }
      .comment-list {}
      .load-more {
        font-size: 12px;
        color: #3399ff;
        text-align: center;
        margin-top: 20px;
      }
    }
  }
}
</style>