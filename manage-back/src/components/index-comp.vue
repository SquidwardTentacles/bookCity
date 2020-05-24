<template>
  <div class="upload-comp">
    <div class="flexbox file-outerbox j-start a-center">
      <label>{{title}}</label>
      <div class="txt-file-upload">
        <div class="img-width show-box"
             v-html="fileupload">
        </div>
        <input class="img-width filePrew"
               @change="uploadFileChange($event)"
               type="file"
               :accept="accept"
               ref="fileAdd">
      </div>
      <img class="preview-img"
           v-if="coverImgBase"
           :src="coverImgBase"
           @click="openBox(imgurl.txtUrl)"
           alt="">
      <el-button type="primary"
                 @click="txtBtn"
                 class="submit-btn"
                 plain>确认选择</el-button>
    </div>
    <el-dialog :visible.sync="dialogShow">
      <div class="img-dia-box"
           @click="dialogImgClick">
        <img :src="dialogImgUrl"
             alt=""
             srcset="">
      </div>

    </el-dialog>
  </div>
</template>
<script>
import { fileupload } from '../assets/svgfile/svg.json'
export default {
  name: 'subindex',
  props: {
    // 插件标题
    title: String,
    // 设置文件类型
    accept: String,
    // 文件上传的地址
    uploadUrl: String
  },
  data () {
    return {
      // 上传文件样式图片
      fileupload: fileupload,
      // 图片上传之前的预览地址
      imgurl: {
        txtUrl: ''
      },
      dialogImgUrl: '',
      uploadData: false
    }
  },
  mounted () {

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
    // 放大图片的点击事件
    dialogImgClick () {
      this.dialogImgUrl = ''
    },
    subIndex () {
      this.$emit('subClick', 'subclick')
    },
    openBox (url) {
      this.dialogImgUrl = url
    },
    txtBtn () {
      this.uploadData = true
    },
    uploadForm (obj) {
      this.uploadFile(this.$refs.fileAdd.files[0], this.uploadUrl, obj)
    },
    previewPic (file, backFile) {
      if (file === undefined) {
        this.$message.error('请选择图片')
        this.uploadData = false
        return
      }
      this.uploadData = true
      const reader = new FileReader()
      reader.readAsDataURL(file) // 读出 base64
      reader.onloadend = function () {
        // 上传文件之前先预览
        backFile(reader.result)
      }
    },
    // 文本文件change
    uploadFileChange (e) {
      const file = this.$refs.fileAdd.files[0]
      this.previewPic(file, fileBack => {
        this.imgurl.txtUrl = fileBack
      })
    },
    // file 文件对象 url文件上传的路径 params 附加信息
    uploadFile (file, url, params) {
      if (!this.uploadFile) {
        this.$message.error('请选择图片')
        return
      }
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
.upload-comp {
  .file-outerbox {
    min-height: 150px;

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
    .submit-btn {
      margin-left: 15px;
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
        justify-content: center;
        align-items: center;
        img {
          max-width: 80%;
          max-height: 80%;
        }
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
