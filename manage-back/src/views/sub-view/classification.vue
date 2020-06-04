
<template>
  <div class="classification">
    <div class="input-box flexbox j-start">
      <el-input v-model="bookClassification"
                placeholder="请输入书籍分类"></el-input>
      <el-select v-model="value"
                 class="select-box"
                 placeholder="请选择">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <el-button @click.native="setIfication">确定</el-button>
    </div>

    <div class="classification-box flexbox j-start">
      <div class="list"
           v-for="(item, index) in backData"
           :key="index">
        <div class="inner flexbox j-between ">
          <div class="title">
            <div class="content">
              <span v-if="editShow!==index">{{item.classification}}</span>
              <input type="text"
                     v-else
                     v-model="classificationEdit">
            </div>
          </div>
          <div class="edit">
            <el-button size="mini"
                       v-if="editShow!==index"
                       @click.native="updateClass(item.classification,index)">编辑</el-button>
            <el-button size="mini"
                       v-else
                       @click.native="updateEdit(item.id)">保存</el-button>
            <el-button size="mini"
                       @click="delClassification(item)"
                       type="danger">删除</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['classificationType'])
  },
  watch: {
    classificationType () {
      this.getData()
    }
  },
  data () {
    return {
      options: [{
        value: 1,
        label: '男频'
      }, {
        value: 2,
        label: '女频'
      }, {
        value: 3,
        label: '不限'
      }],
      value: '',
      bookClassification: '',
      backData: [],
      editShow: '',
      classificationEdit: ''
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    ...mapMutations([
      'changeActionType'
    ]),
    getData (type) {
      this.axios.get(`/api/book-classification-get?gender_type=${this.classificationType}`).then(res => {
        if (res.code === '001') {
          this.backData = res.data
          // 根据参数判断是否显示编辑按钮 解决数据更新后旧数据复现问题
          if (type) this.editShow = ''
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 添加书籍分类
    setIfication () {
      if (!this.bookClassification) {
        this.$message.error('书籍分类信息不能为空')
        return
      }
      const params = {
        gender_type: this.value,
        classification: this.bookClassification
      }
      this.axios.post('/api/book-classification-set', params).then(res => {
        this.bookClassification = ''
        this.changeActionType(this.value)
        this.$message.success('分类添加成功')
      }).catch(err => {
        console.log(err)
      })
    },
    // 提交书籍分类的编辑
    updateEdit (id) {
      if (!id) {
        return
      }
      if (this.classificationEdit) {
        const params = {
          classification: this.classificationEdit,
          id: id
        }
        this.axios.put('/api/book-classificationupdate', params).then(res => {
          if (res.code === '001') {
            this.$message.success(res.msg)
            // 传参更改按钮显示
            this.getData('edits')
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$message.error('请输入分类更新内容')
      }
    },
    // 书籍分类删除按钮
    delClassification (obj) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.delete(`/api/book-delclassification?id=${obj.id}`).then(res => {
          if (res.code === '001') {
            this.$message.success(res.msg)
            this.getData()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑按钮的点击事件
    updateClass (classification, index) {
      this.classificationEdit = classification
      this.editShow = index
    }
  }
}
</script>
<style lang="less" scope>
.classification {
  .select-box {
    margin: 0 5px;
  }
  .classification-box {
    flex-wrap: wrap;
    margin-top: 5px;
    .list {
      padding: 5px 6px 3px 5px;
      box-sizing: border-box;
      width: 250px;
      border: 1px solid #c0c4cc;
      margin: 2px;
      border-radius: 2px;
      .inner {
        .title {
          width: 115px;
          font-size: 14px;
          input {
            width: 98%;
            box-sizing: border-box;
          }
        }
        .edit {
          flex: 1;
        }
      }
    }
  }
}
</style>
