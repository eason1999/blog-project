<template>
  <Scroll
    :on-reach-bottom="handleReachBottom">
    <blog-header />
    <div class="home-list-wrap box-shadow bg-color">
      <List item-layout="vertical">
        <ListItem v-for="(item, index) in list" :key="index" class="li-box">
            <ListItemMeta :avatar="item.user.avatar" :title="item.title" />
            <div class="content-wrap" v-html="item.content"></div>
            <!-- {{ item.content }} -->
            <template slot="action">
              <li>
                <Icon type="ios-star-outline" /> {{item.like}}
              </li>
              <li>
                <Icon type="ios-thumbs-up-outline" /> {{item.collect}}
              </li>
              <li>
                <Icon type="ios-chatbubbles-outline" /> {{item.comment}}
              </li>
            </template>
            <template slot="extra">
              <img :src="item.image" style="width: 200px">
            </template>
        </ListItem>
      </List>
    </div>
    <BackTop></BackTop>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </Scroll>
</template>

<script>
import {
  List,
  Icon,
  Scroll,
  BackTop,
  Spin
} from 'view-design'
import BlogHeader from '@/components/BlogHeader'

export default {
  data() {
    return {
      spinShow: false,
      params: {
        pageIndex: 1,
        pageSize: 20
      },
      dataList: [
        {
          title: 'This is title 1',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
          content: 'This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.'
        }, {
          title: 'This is title 2',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
          content: 'This is the content, this is the content, this is the content, this is the content.'
        }, {
          title: 'This is title 3',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
          content: 'This is the content, this is the content, this is the content, this is the content.'
        }, {
          title: 'This is title 3',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
          content: 'This is the content, this is the content, this is the content, this is the content.'
        }, {
          title: 'This is title 3',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
          content: 'This is the content, this is the content, this is the content, this is the content.'
        }
      ]
    }
  },
  components: {
    BlogHeader,
    List,
    ListItem: List.Item,
    ListItemMeta: List.Item.Meta,
    Icon,
    Scroll,
    BackTop,
    Spin
  },
  computed: {
    list() {
      return this.$store.state.home.list || []
    }
  },
  mounted() {
    this.getBlogs()
  },
  methods: {
    getBlogs() {
      this.spinShow = true
      this.$store.dispatch('home/getBlogs', this.params).then(() => {
        console.log(234)
        this.spinShow = false
      })
    },
    handleReachBottom() {
      return new Promise(resolve => {
        setTimeout(() => {
          for (let i = 1; i < 11; i++) {
            this.dataList.push({
              title: `This is title ${i+2}`,
              description: 'This is description, this is description, this is description.',
              avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
              content: 'This is the content, this is the content, this is the content, this is the content.'
            })
          }
          resolve()
        }, 2000)
      })
    }
  }
}
</script>

<style lang="less">
.ivu-scroll-container {
  height: 100% !important;
  .ivu-scroll-loader:first-child {
    display: none !important;
  }
}
.home-list-wrap {
  width: 1000px;
  margin: 20px auto;
  padding: 10px 20px;
  box-sizing: border-box;
  border-radius: 4px;
}
.li-box {
  cursor: pointer;
}
.content-wrap {
  width: 700px;
  height: 70px;
  overflow: hidden;
  display: inline-block;
}
</style>