<template>
  <div class="txt-add">
    <div class="input-b-box">
      <!-- 文件上传组件封装 书籍封面图片上传-->
      <uploadComp title="请选择书籍封面"
                  uploadUrl="/back/book-add"
                  accept="image/*"
                  v-on:insertIdC="insertIdC"
                  fileAdd="fileAddImg"
                  :updateId="updateId"
                  ref="uploadComp"></uploadComp>
      <uploadComp title="请选择书籍TXT文件"
                  v-on:insertIdC="insertIdC"
                  fileAdd="fileAddTxt"
                  :updateId="updateId"
                  @fileName="fileName"
                  uploadUrl="/back/book-add"
                  accept="text/plain"
                  ref="uploadComp"></uploadComp>

      <div class="input-box flexbox between">
        <p>请输入书籍名称：</p>
        <div>
          <el-input placeholder="请输入书籍名称"
                    v-model="formData.title"
                    clearable>
          </el-input>
        </div>
      </div>
      <div class="input-box flexbox between">
        <p>请输入书籍价格：</p>
        <div>
          <el-input placeholder="请输入书籍价格price"
                    v-model="formData.price"
                    clearable>
          </el-input>
        </div>
      </div>

      <div class="input-box  flexbox between">
        <p>请选择书籍分类：</p>
        <el-select v-model="formData.gender_type"
                   @change="genderSelect"
                   placeholder="请选择图书适合阅读的人群">
          <el-option v-for="item in options"
                     :key="item.id"
                     :label="item.label"
                     :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="input-box  flexbox between">
        <p>请选择书籍详细分类：</p>
        <el-select v-model="formData.classification"
                   placeholder="请选择书籍详细分类">
          <el-option v-for="item in classificationArr"
                     :key="item.id"
                     :label="item.classification"
                     :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="input-box textarea">
        <p>请输入书籍的描述信息：</p>
        <div>
          <el-input placeholder="请输入书籍描述信息"
                    type="textarea"
                    v-model="formData.describe_txt"
                    clearable>
          </el-input>
        </div>
        <el-button @click="uploadForm"
                   type="primary">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import uploadComp from '../../components/index-comp'
export default {
  components: {
    uploadComp
  },
  data () {
    return {
      formData: {
        title: '',
        gender_type: '',
        classification: '',
        price: '',
        describe_txt: ''
      },
      options: [
        { id: 1, label: '男' },
        { id: 2, label: '女' },
        { id: 3, label: '不限' }
      ],
      dialogImgUrl: '',
      updateId: null,
      classificationArr: []
    }
  },
  mounted () {
    console.log('load')
  },
  methods: {
    // 子组件书本文件上传之后赋值文件名
    fileName (e) {
      const strArr = e.split('.')
      let str = ''
      for (let i = 0; i < strArr.length - 1; i++) {
        str += strArr[i]
      }
      this.formData.title = str
    },
    uploadForm () {
      const obj = this.formData
      for (const k in obj) {
        if (obj[k] === '') {
          this.$message.error('信息填写不完整')
          return
        }
      }
      // 如果有updateId就将值传给后台 表示更新插入数据 否则是写入数据
      if (this.updateId) this.formData.insertId = this.updateId
      this.axios
        .post('/api/book-addparams', this.formData)
        .then(res => {
          if (res.code === '001') {
            this.$message.success('书籍信息添加完成！')
            this.updateId = res.data.insertId
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    insertIdC (data) {
      console.log(data)
      this.updateId = data
    },
    // 书籍分类change后获取详细分类信息
    genderSelect () {
      console.log(this.formData.gender_type, 'type')
      this.axios.get(`/api/book-classification-get?gender_type=${this.formData.gender_type}`).then(res => {
        if (res.code === '001') {
          this.classificationArr = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.txt-add {
  .input-b-box {
    max-width: 70%;
    margin-right: 10px;
    .input-box {
      margin-top: 10px;
      p {
        min-width: 175px;
        display: inline-block;
      }
      & > div {
        flex: 1;
      }
    }
  }
  .textarea {
    margin-top: 20px;
    & > div {
      margin: 5px 0 10px 0;
    }
  }
  .select-box {
    margin-bottom: 10px;
    span {
      display: inline-block;
      width: 150px;
      font-size: 15px;
    }
  }
}
</style>
