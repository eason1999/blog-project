<template>
  <div class="header-wrap">
    <Menu mode="horizontal" theme="dark" :active-name="activeName">
      <div class="layout-logo fl"></div>
      <div class="layout-nav fl" v-if="isHomePage">
        <MenuItem name="new" :to="{ path: '/home/new' }">
          <Icon type="ios-navigate"></Icon>
          最新发布
        </MenuItem>
        <MenuItem name="lately" :to="{ path: '/home/lately' }">
          <Icon type="ios-keypad"></Icon>
          最近热门
        </MenuItem>
        <MenuItem name="hot" :to="{ path: '/home/hot' }">
          <Icon type="ios-analytics"></Icon>
          热门榜单
        </MenuItem>
      </div>
      <div class="login-wrap fr">
        <div class="unlogin-contain" v-if="false">
          <a class="login" href="javascript:;">登录</a>
          <span class="spin"> · </span>
          <a class="login" href="javascript:;">注册</a>
        </div>
        <div class="login-contain">
          <Button
            class="btn"
            type="default"
            ghost>写文章</Button>
          <Badge
            class="notice-badge cur"
            :count="12"
            :offset="offset">
            <Icon
              class="icon"
              type="md-notifications"
              size="24"/>
          </Badge>
          <Avatar class="cur" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
        </div>
      </div>
    </Menu>
    <div class="home-search" v-if="isHomePage">
      <p class="hint">每天更新一点点</p>
      <div class="search-wrap">
        <Input
          search
          placeholder="输入关键字"
          size="large"/>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Menu,
  MenuItem,
  Icon,
  Avatar,
  Badge,
  Input,
  Button
} from 'view-design'

export default {
  name: 'Header',
  components: {
    Menu,
    MenuItem,
    Icon,
    Avatar,
    Badge,
    Input,
    Button
  },
  data() {
    return {
      offset: [25, 45],
      activeName: this.$route.params.type || 'new'
    }
  },
  computed: {
    isHomePage() {
      const fullPath = this.$route.fullPath
      return fullPath.indexOf('/home') > -1
    }
  },
  mounted() {
    console.log(this.$route)
  }
}
</script>

<style lang="less" scoped>
.header-wrap {
  background: #515a6e;
  .ivu-menu-horizontal {
    height: 80px;
    line-height: 80px;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    position: relative;
    top: 25px;
    left: 40px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-left: 40px;
  }
  .login-wrap {
    margin-right: 40px;
    .unlogin-contain {
      .login {
        font-size: 14px;
        color: #fff;
      }
      .spin {
        font-size: 24px;
      }
    }
    .login-contain {
      .btn {
        position: relative;
        right: 60px;
      }
      .notice-badge {
        .icon {
          position: relative;
          top: 2px;
          right: 15px;
          color: rgba(255,255,255,.7);
        }
        &:hover {
          .icon {
            color: #fff;
          }
        }
      }
    }
  }
  .home-search {
    width: 600px;
    text-align: center;
    margin: 30px auto 0;
    padding-bottom: 80px;
    .hint {
      color: #fff;
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
}
</style>
