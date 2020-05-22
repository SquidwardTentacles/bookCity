<template>
  <div class="txt-add">
    <div class="input-box flexbox j-start a-start">
      <div class="input-box-left">
        <!-- 封面图片上传 -->
        <div class="flexbox file-outerbox j-start a-center">
          <label>请选择文本文件</label>
          <div class="txt-file-upload">
            <div class="img-width show-box"
                 v-html="fileupload">
            </div>
            <input class="img-width filePrew"
                   @change="txtInputC($event)"
                   type="file"
                   name="file"
                   accept="image/*"
                   ref="fileAdd">
          </div>
          <img class="preview-img"
               v-if="coverImgBase"
               :src="coverImgBase"
               @click="openBox(imgurl.txtUrl)"
               alt="">
          <el-button type="primary"
                     @click="txtBtn"
                     plain>确认选择</el-button>
        </div>
        <br>
        <div class="flexbox file-outerbox j-start">
          <label>请选择封面图片</label>
          <div class="txt-file-upload">
            <div class="img-width show-box"
                 v-html="fileupload">
            </div>
            <input type="file"
                   class="img-width filePrew"
                   name="file"
                   accept="image"
                   @change="textFile($event)"
                   id="fileAdd">
          </div>
          <el-button type="primary"
                     plain>确认选择</el-button>
        </div>
        <br>
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
      <el-dialog :visible.sync="dialogShow">
        <div class="img-dia-box">
          <img :src="dialogImgUrl"
               alt=""
               srcset="">
        </div>

      </el-dialog>
    </div>

  </div>
</template>
<script>
import { fileupload } from '../../assets/svgfile/svg.json'
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
        describe_txt: ''
      },
      // 图片上传之前的预览地址
      imgurl: {
        txtUrl: ''
      },
      options: [
        { id: 1, label: '男' },
        { id: 2, label: '女' }
      ],
      fileupload: fileupload,
      dialogImgUrl: ''
    }
  },
  computed: {
    coverImgBase () {
      return this.imgurl.txtUrl
    },
    // 放大图片的显示与否
    dialogShow () {
      return this.dialogImgUrl !== ''
    }
  },
  methods: {
    openBox (url) {
      this.dialogImgUrl = url
    },
    txtBtn () {
      this.uploadFile(this.$refs.fileAdd.files[0], '/back/book-add', this.formData)
    },
    previewPic (file, backFile) {
      if (file === undefined) {
        this.$message.error('请选择图片')
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(file) // 读出 base64
      reader.onloadend = function () {
        // 上传文件之前先预览
        backFile(reader.result)
      }
    },
    // 文本文件change
    txtInputC (e) {
      const file = this.$refs.fileAdd.files[0]
      this.previewPic(file, fileBack => {
        this.imgurl.txtUrl = fileBack
      })
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
.txt-add {
  .input-box-left {
    max-width: 70%;
    margin-right: 10px;
    .file-outerbox {
      min-height: 150px;
    }
    .txt-file-upload {
      margin: 0 20px;
      position: relative;
      height: 130px;
      .filePrew {
        opacity: 0;
      }
      .img-width {
        cursor: pointer;
        z-index: 9;
        border: 1px solid #8a8a8a;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .preview-img {
      width: 150px;
      height: 130px;
    }
    .el-input {
      margin-bottom: 10px;
    }
  }
}
</style>
<style lang="less">
.txt-add {
  .el-dialog {
    width: 95%;
    position: relative;
    height: 95%;
    margin: 0 !important ;
    height: 100%;
    .el-dialog__header,
    .el-dialog__footer {
      display: none;
    }
    background: none;
    .el-dialog__body {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 999;
      width: 100%;
      height: 100%;
      padding: 0;
      .img-dia-box {
        width: 100%;
        height: 100%;
        display: flex;
      }
      img {
        justify-content: center;
        align-items: center;
        max-width: 80%;
        max-height: 80%;
      }
    }
  }

  .txt-file-upload {
    .img-width,
    &.txt-file-upload,
    svg {
      width: 150px;
      height: 130px;
    }
  }
}
</style>
