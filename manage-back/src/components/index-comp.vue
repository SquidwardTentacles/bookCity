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
               :ref="fileAdd">
      </div>
      <img class="preview-img"
           v-if="coverImgBase"
           :src="imgurl.txtUrl"
           @click="openBox(imgurl.txtUrl)"
           alt="">
      <div v-if="fileSesson.name"
           class="file-sesson-box">
        <p><span>文件名称：</span>{{fileSesson.name}}</p>
        <p><span>文件大小：</span>{{fileSesson.size+'kb'}}</p>
        <p><span>文件类型：</span>{{fileSesson.type}}</p>
      </div>
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
import { address, port } from '../../../server/config.json'
export default {
  name: 'subindex',
  props: {
    // 插件标题
    title: String,
    // 设置文件类型
    accept: String,
    // 文件上传的地址
    uploadUrl: String,
    fileAdd: String,
    updateId: Number
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
      uploadData: false,
      fileSesson: {},
      // 通过id值来判断是重新上传书籍文件还是更新本书书籍文件 如果id值为false或者0 则重新上传 否则更新 第一次上传文件之后id值赋值为后台返回的id
      insertId: ''
    }
  },
  mounted () {

  },
  computed: {
    coverImgBase () {
      return this.imgurl.txtUrl && this.accept.indexOf('image') !== -1
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
    // 上传文件按钮的确认事件
    txtBtn () {
      this.uploadFile(this.$refs[this.fileAdd].files[0], this.uploadUrl)
      this.uploadData = true
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
      const file = this.$refs[this.fileAdd].files[0]
      console.log(file)

      if (file && this.accept.indexOf('image') === -1) {
        this.fileSesson = file
      }
      this.previewPic(file, fileBack => {
        this.imgurl.txtUrl = fileBack
      })
    },
    // file 文件对象 url文件上传的路径 params 附加信息
    uploadFile (file, url, params) {
      // 保存this指向
      const that = this
      if (!file) {
        that.$message.error('请选择文件后上传')
        return
      }
      var formData = new FormData()
      formData.append('file', file)
      // if (that.insertId) {
      console.log(that.insertId)
      const setid = this.updateId ? this.updateId : this.insertId
      formData.append('insertId', setid)
      // }
      const xhr = new XMLHttpRequest()
      xhr.open('post', `http://${address}:${port}` + url)
      xhr.send(formData)
      xhr.onload = function () {
        if (xhr.responseText) {
          const backData = JSON.parse(xhr.responseText)
          that.insertId = backData.insertId
          // 将insertid传给父页面
          that.$emit('insertIdC', backData.insertId)
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.upload-comp {
  .file-outerbox {
    min-height: 150px;
    label {
      width: 155px;
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
      cursor: pointer;
    }
    .file-sesson-box {
      span {
        text-align: right;
        width: 80px;
        display: inline-block;
      }
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
      cursor: pointer;
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
