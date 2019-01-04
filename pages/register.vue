<template>
  <div class="page-register">
    <!--头部-->
    <article class="header">
      <header>
        <a
          href="/"
          class="site-logo"/>
        <span class="login">
          <em class="bold">已有美团账号?</em>
          <a href="/login">
            <el-button
              type="primary"
              size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>

    <!--注册页面内容
     <el-form
        ref="ruleForm"           表单引用
        :model="ruleForm"        表单数据
        :rules="rules"           验证规则
        class="demo-ruleForm"
        label-width="100px"
      >
    -->
    <section>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        label-width="100px"
      >
        <el-form-item
          label="昵称"
          prop="name">
          <el-input v-model="ruleForm.name"/>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email">
          <el-input v-model="ruleForm.email"/>
          <el-button
            size="mini"
            round
            @click="sendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="code">
          <el-input
            v-model="ruleForm.code"
            maxlength="4"/>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pwd">
          <el-input
            v-model="ruleForm.pwd"
            type="password"/>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="cpwd">
          <el-input
            v-model="ruleForm.cpwd"
            type="password"/>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="register">同意以下协议并注册</el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a
            class="f1"
            href="http://www.meituan.com/about/terms"
            target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
  import CryptoJS from 'crypto-js'

  export default {
    layout: 'blank',
    data() {
      return {
        statusMsg: '',
        error: '',
        ruleForm: {
          name: '',
          code: '',
          pwd: '',
          cpwd: '',
          email: ''
        },
        rules: {
          name: [
            {
              required: true,
              type: 'string',
              message: '请输入昵称',
              trigger: 'blur'
            }
          ],
          email: [
            {
              required: true,
              type: 'email',
              message: '请输入邮箱',
              trigger: 'blur'
            }
          ],
          pwd: [
            {
              required: true,
              message: '创建密码',
              trigger: 'blur'
            }
          ],
          cpwd: [
            {
              required: true,
              message: '确认密码',
              trigger: 'blur'
            },
            {
              // 自定义规则
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入密码'))
                } else if (value !== this.ruleForm.pwd) {
                  callback(new Error('两次输入密码不一致'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      sendMsg() {
        let namePass, emailPass
        //不允许连续发送验证码
        if (this.timerid) {
          return false
        }
        // 验证用户名是否通过校验 (element-ui 方法), 如果有值表示没有通过
        this.$refs['ruleForm'].validateField('name', valid => {
          namePass = valid
        })
        // 检测邮箱是否通过校验 (element-ui 方法), 如果有值表示没有通过
        this.$refs['ruleForm'].validateField('email', valid => {
          emailPass = valid
        })


        //每次发送验证码之前重置状态信息
        this.statusMsg = ''
        // 如果用户名、邮箱都通过验证，则可以发送验证码
        if (!namePass && !emailPass) {
          this.$axios.post('/users/verify', {
            // encodeURIComponent: 对中文进行编码
            username: encodeURIComponent(this.ruleForm.name),
            email: this.ruleForm.email
          })
          .then(({ status, data }) => {
            // 发送成功后, 验证码有效倒计时
            if (status === 200 && data && data.code === 0) {
              let count = 60
              this.statusMsg = `验证码已发送，剩余${count--}秒`
              this.timerid = setInterval(() => {
                this.statusMsg = `验证码已发送，剩余${count--}秒`
                if (count === 0) {
                  clearInterval(this.timerid)
                  this.timerid = null
                  this.statusMsg = ''
                }
               }, 1000)
            }else {
              this.statusMsg = data.msg
            }
          })
        }
      },
      register() {
        this.$refs['ruleForm'].validate(valid => {
          // 验证通过 会返回true
          if (valid) {
            this.$axios.post('/users/signup', {
                // encodeURIComponent: 对中文进行编码
                username: window.encodeURIComponent(this.ruleForm.name),
                // CryptoJS.MD5 加密
                password: CryptoJS.MD5(this.ruleForm.pwd).toString(),
                email: this.ruleForm.email,
                code: this.ruleForm.code
              })
              .then(({ status, data }) => {
                if (status === 200) {
                  if (data && data.code === 0) {
                    location.href = '/login'
                  } else {
                    this.error = data.msg
                  }
                } else {
                  this.error = `服务器出错，错误码:${status}`
                }
                setTimeout(() => {
                  this.error = ''
                }, 1500)
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/register/index.scss";
</style>
