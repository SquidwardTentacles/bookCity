<template>
  <div class="">
    <el-input placeholder="请输入书籍名称"
              v-model="formData.title"
              clearable>
    </el-input>
    <input type="file"
           name="file"
           @change="textFile($event)"
           multiple
           accept="image/*"
           ref="fileAdd"
           id="fileAdd">

    gender_ype<el-input placeholder="请输入书籍适合阅读的 gender_ype"
              v-model="formData.gender_type"
              clearable>
    </el-input>
    cover<el-input placeholder="请输入内容cover"
              v-model="formData.cover"
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
    describe<el-input placeholder="请输入优惠描述describe"
              v-model="formData.describe"
              clearable>
    </el-input>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formData: {
        title: '',
        gender_type: '',
        cover: '',
        txt_file: '',
        charge: '',
        price: '',
        describe: ''
      }
    }
  },
  methods: {
    textFile (e) {
      this.uploadFile(e.target.files[0], '/back/book-add', this.formData)
    },
    // file 文件对象 url文件上传的路径 params 附加信息
    uploadFile (file, url, params) {
      var formData = new FormData()
      formData.append('file', file)
      for (const i in params) {
        formData.append(i, params[i])
        console.log(i)
      }
      const xhr = new XMLHttpRequest()
      xhr.open('post', 'http://127.0.0.1:3000' + url)
      xhr.send(formData)
      xhr.onload = function () {
        console.log(xhr.responseText)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.app {
  transform: tr;
}
</style>
