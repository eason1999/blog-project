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
        <Button
          class="btn"
          type="default"
          ghost>写文章</Button>
        <div class="unlogin-contain" v-if="true">
          <a
            class="login"
            href="javascript:;"
            @click="handleLogin">登录</a>
          <span class="spin"> · </span>
          <a
            class="login"
            href="javascript:;"
            @click="handleRegister">注册</a>
        </div>
        <div class="login-contain" v-else>
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
    <Modal
      title="登录"
      :closable="false"
      :footer-hide="true"
      v-model="isShowModal"
      :mask-closable="false"
      :on-cancel="handleCancel"
      width="400">
      <Form ref="form" :model="form" :rules="rules">
        <FormItem prop="user">
          <Input type="text"
            v-model="form.user"
            placeholder="用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password"
            v-model="form.password"
            placeholder="密码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <div class="footer">
            <Button type="default" @click="handleCancel">取消</Button>
            <Button type="primary" @click="handleSubmit('form')">登录</Button>
          </div>
        </FormItem>
      </Form>
    </Modal>
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
  Button,
  Modal,
  Form,
  FormItem
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
    Button,
    Modal,
    Form,
    FormItem
  },
  data() {
    return {
      isShowModal: false,
      offset: [25, 45],
      activeName: this.$route.params.type || 'new',
      form: {
        user: '',
        passward: ''
      },
      rules: {
        user: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'change'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'change'
          },
          {
            type: 'string',
            min: 6,
            message: '密码长度不少于6位',
            trigger: 'change'
          }
        ]
      }
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
  },
  methods: {
    handleLogin() {
      this.isShowModal = true
    },
    handleRegister() {},
    handleCancel() {
      this.isShowModal = false
      this.$refs['form'].resetFields()
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.isShowModal = false
          this.$Message.success('登录成功!')
        } else {
          this.$Message.error('登陆失败!')
        }
      })
    }
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
  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    position: relative;
    top: 25px;
    left: 40px;
  }
  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-left: 40px;
  }
  .login-wrap {
    display: flex;
    align-items: center;
    margin-right: 40px;
    .btn {
      margin-right: 60px;
    }
    .unlogin-contain {
      .login {
        font-size: 14px;
        color: #fff;
      }
      .spin {
        font-size: 24px;
        color: #fff;
      }
    }
    .login-contain {
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
.footer {
  text-align: right;
  button:first-child {
    margin-right: 20px;
  }
}
</style>
