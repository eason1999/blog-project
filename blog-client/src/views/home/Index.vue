<template>
  <Scroll
    :on-reach-bottom="handleReachBottom">
    <blog-header />
    <div class="home-list-wrap box-shadow bg-color">
      <List item-layout="vertical">
        <ListItem v-for="(item, index) in dataList" :key="index">
            <ListItemMeta :avatar="item.avatar" :title="item.title" :description="item.description" />
            {{ item.content }}
            <template slot="action">
              <li>
                <Icon type="ios-star-outline" /> 222
              </li>
              <li>
                <Icon type="ios-thumbs-up-outline" /> 11
              </li>
              <li>
                <Icon type="ios-chatbubbles-outline" /> 33
              </li>
            </template>
            <template slot="extra">
              <img src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large" style="width: 280px">
            </template>
        </ListItem>
      </List>
    </div>
    <BackTop></BackTop>
  </Scroll>
</template>

<script>
import {
  List,
  Icon,
  Scroll,
  BackTop
} from 'view-design'
import BlogHeader from '@/components/BlogHeader'

export default {
  data() {
    return {
      dataList: [
        {
          title: 'This is title 1',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
          content: 'This is the content, this is the content, this is the content, this is the content.'
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
    BackTop
  },
  computed: {},
  methods: {
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
  },
  mounted() {},
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
</style>