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
          @click="jumpTo">写文章</Button>
        <div class="unlogin-contain" v-if="!userInfo.userName">
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
          <Dropdown @on-click="handleDropDown">
            <Avatar class="cur" :src="userInfo.avatar" />
            <DropdownMenu slot="list">
              <DropdownItem name="info">修改信息</DropdownItem>
              <DropdownItem name="out">退出</DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
        <FormItem prop="userName">
          <Input type="text"
            v-model="form.userName"
            placeholder="用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="telephone" v-if="loginType === 'register'">
          <Input type="text"
            v-model="form.telephone"
            placeholder="手机号">
            <Icon type="ios-call-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password"
            v-model="form.password"
            placeholder="密码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="newPassword" v-if="loginType === 'register'">
          <Input type="password"
            v-model="form.newPassword"
            placeholder="确认密码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <div class="footer">
            <Button type="default" @click="handleCancel">取消</Button>
            <Button type="primary" @click="handleSubmit('form')">{{loginType === 'register' ? '注册并登录' : '登录'}}</Button>
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
  FormItem,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'view-design'
import storage from '@/utils/storage'
import { phone } from '@/utils/validator'

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
    FormItem,
    Dropdown,
    DropdownMenu,
    DropdownItem
  },
  data() {
    return {
      loginType: 'login',
      isShowModal: false,
      offset: [25, 45],
      activeName: this.$route.params.type || 'new',
      form: {
        userName: '',
        password: '',
        newPassword: '',
        telephone: ''
      },
      rules: {
        userName: [
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
          }, {
            type: 'string',
            min: 6,
            message: '密码长度不少于6位',
            trigger: 'change'
          }
        ],
        newPassword: [
          {
            required: true,
            message: '请输入确认密码',
            trigger: 'change'
          }, {
            type: 'string',
            min: 6,
            message: '密码长度不少于6位',
            trigger: 'change'
          }, {
            validator: this.validateNewPsd,
            trigger: 'change'
          }
        ],
        telephone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'change'
          },
          {
            validator: phone,
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
    },
    userInfo() {
      console.log(this.$store.state.userInfo.userName, 88888)
      return this.$store.state.userInfo || {}
    },
    token() {
      return storage.getStorage('token') || null
    }
  },
  mounted() {
    console.log(this.$route, this.token)
    if (this.token) {
      this.getUserInfo()
    }
  },
  methods: {
    validateNewPsd(rule, val, callback) {
      if (!val) return callback()
      if (this.form.password !== val) {
        callback(new Error('两次手机号不一致'))
      }
      callback()
    },
    handleLogin() {
      this.isShowModal = true
      this.loginType = 'login'
    },
    jumpTo() {
      if (this.userInfo.userName) {
        this.$router.push({ path: '/create' })
        return
      }
      this.isShowModal = true
    },
    handleRegister() {
      this.isShowModal = true
      this.loginType = 'register'
    },
    handleCancel() {
      this.isShowModal = false
      this.$refs['form'].resetFields()
    },
    _loginIn() {
      const { userName, password } = this.form
      this.$store.dispatch('handleLogin', { userName, password }).then(() => {
        this.getUserInfo()
        this.isShowModal = false
        this.$Message.success('登录成功!')
      })
    },
    _register() {
      this.$store.dispatch('handleRegister', this.form).then(() => {
        this.getUserInfo()
        this.isShowModal = false
        this.loginType = 'login'
        this.$Message.success('注册成功!')
      })
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.loginType === 'login') {
            this._loginIn()
          } else {
            this._register()
          }
        }
      })
    },
    getUserInfo() {
      this.$store.dispatch('getUserInfo')
    },
    handleDropDown(name) {
      switch (name) {
        case 'out':
          this.outConfirm()
          break
        case 'info':
          this.changeInfo()
          break
        default:
          break
      }
    },
    outConfirm() {
      this.$Modal.confirm({
        title: '登出确认',
        content: '确定退出登录么？',
        onOk: () => {
          this.loginOut()
        },
        onCancel: () => {}
      })
    },
    loginOut() {
      this.$store.dispatch('loginOut').then(() => {
        this.$refs['form'].resetFields()
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
