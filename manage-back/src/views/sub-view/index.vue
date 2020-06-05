<template>
  <div class="txt-add">
    <div class="input-box flexbox j-start a-start">
      <div class="input-box-left">
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
                    uploadUrl="/back/book-add"
                    accept="text/plain"
                    ref="uploadComp"></uploadComp>
        <el-input placeholder="请输入书籍名称"
                  v-model="formData.title"
                  clearable>
        </el-input>

        <!-- txt_file<el-input placeholder="请输入内容txt_file"
                  v-model="formData.txt_file"
                  clearable>
        </el-input> -->

        classification<el-input placeholder="请输入内容charge"
                  v-model="formData.classification"
                  clearable>
        </el-input>

        price<el-input placeholder="请输入书籍价格price"
                  v-model="formData.price"
                  clearable>
        </el-input>

        describe_txt<el-input placeholder="请输入优惠描述describe"
                  v-model="formData.describe_txt"
                  clearable>
        </el-input>
      </div>
      <div class="select-box-right">
        <div class="select-box">
          <span>请选择书籍分类：</span>
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
        <div class="select-box">
          <span>请选择书籍详细分类：</span>
          <el-select v-model="formData.classification"
                     placeholder="请选择书籍详细分类">
            <el-option v-for="item in classificationArr"
                       :key="item.id"
                       :label="item.classification"
                       :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <button @click="uploadForm">提交</button>
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
    uploadForm () {
      // 调用子组件的方法
      // this.$refs.uploadComp.uploadForm(this.formData)
      // 如果有updateId就将值传给后台 表示更新插入数据 否则是写入数据
      if (this.updateId) this.formData.insertId = this.updateId
      console.log(this.formData)
      this.axios
        .post('/api/book-addparams', this.formData)
        .then(res => {
          console.log(res)
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
  .input-box-left {
    max-width: 70%;
    margin-right: 10px;
  }
  .select-box-right {
    .select-box {
      margin-bottom: 10px;
      span {
        display: inline-block;
        width: 150px;
        font-size: 15px;
      }
    }
  }
}
</style>
