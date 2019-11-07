<template>
  <Scroll
    height="100%"
    :distance-to-edge="distance"
    :on-reach-bottom="handleReachBottom">
  <!-- <div> -->
    <blog-header />
    <div class="list-wrap">
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
  <!-- </div> -->
  </Scroll>
</template>

<script>
import {
  List,
  Icon,
  Scroll
} from 'view-design'
import BlogHeader from '@/components/BlogHeader'

export default {
  data() {
    return {
      distance: [-10, -20],
      scrollHeight: '100%',
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
    Scroll
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

<style lang="less" scoped>
.list-wrap {
  width: 1000px;
  margin: 10px auto;
  background: #fff;
  padding: 10px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(150, 150, 150, .1);
}
</style>