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

        txt_file<el-input placeholder="请输入内容txt_file"
                  v-model="formData.txt_file"
                  clearable>
        </el-input>

        charge<el-input placeholder="请输入内容charge"
                  v-model="formData.charge"
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
      <div class="select-box">
        <el-select v-model="formData.gender_type"
                   placeholder="请选择图书适合阅读的人群">
          <el-option v-for="item in options"
                     :key="item.id"
                     :label="item.label"
                     :value="item.id">
          </el-option>
        </el-select>

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
        txt_file: '',
        charge: '',
        price: '',
        describe_txt: ''
      },
      options: [
        { id: 1, label: '男' },
        { id: 2, label: '女' }
      ],
      dialogImgUrl: '',
      updateId: 0
    }
  },
  mounted () {
    console.log('load')
  },
  methods: {
    uploadForm () {
      // 调用子组件的方法
      this.$refs.uploadComp.uploadForm(this.formData)
    },
    insertIdC (data) {
      console.log(data)
      this.updateId = data
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
}
</style>
