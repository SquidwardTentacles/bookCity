<template>
  <div class="login flexbox j-center a-center">
    <el-form :model="ruleForm"
             status-icon
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="账号"
                    prop="account">
        <el-input type="text"
                  v-model="ruleForm.account"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input type="password"
                  v-model="ruleForm.password"
                  autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="register('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
    <input type="text"
           v-focus>
  </div>
</template>
<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.password !== '') {
          this.$refs.ruleForm.validateField('password')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        account: '',
        password: ''
      },
      allowRequest: true,
      rules: {
        account: [{ validator: validatePass, trigger: 'blur' }],
        password: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
        console.log(el, 'el')
      },
      bind: function (el) {
        console.log(el, 'bindel')
      }
    }
  },
  methods: {
    submitForm (formName) {
      console.log(this.allowRequest)

      if (!this.allowRequest) {
        this.$message.error('限制连续请求')
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.allowRequest = false
          this.axios
            .post('/api/back/login', {
              account: this.ruleForm.account,
              password: this.ruleForm.password
            })
            .then(res => {
              this.allowRequest = true
              if (res.code === '001') {
                this.$message.success(res.msg)

                this.$store.commit('changeUserSesson', this.ruleForm)
                this.$router.push({
                  path: '/home/index'
                })
              } else {
                this.$message.error(res.msg)
              }
            })
            .catch(err => {
              this.allowRequest = true
              this.$message.error('请求失败！')
              console.log(err, 'err')
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    subclick (data) {
      console.log(data)
    },
    register (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post('/back/register', {
              account: this.ruleForm.account,
              password: this.ruleForm.password
            })
            .then(res => {
              console.log(res)
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less">
.login {
  input {
    border: none;
    border: 1px solid #000;
  }
  width: 100%;
  height: 100%;
  .demo-ruleForm {
    width: 500px;
    min-height: 200px;
    padding-bottom: 150px;
  }
}
</style>
