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
        <el-button @click="resetForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
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
      rules: {
        account: [{ validator: validatePass, trigger: 'blur' }],
        password: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post('/back/login', {
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
    },
    resetForm (formName) {
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
  width: 100%;
  height: 100%;
  .demo-ruleForm {
    width: 500px;
    min-height: 200px;
    padding-bottom: 150px;
  }
}
</style>
