
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
                     :value="item.classification">
            </div>
          </div>
          <div class="edit">
            <el-button size="mini"
                       v-if="editShow!==index"
                       @click.native="editShow=index">编辑</el-button>
            <el-button size="mini"
                       v-else
                       @click.native="editShow=''">保存</el-button>
            <el-button size="mini"
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
      editShow: ''
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    ...mapMutations([
      'changeActionType'
    ]),
    getData () {
      this.axios.get(`/back/book-classification-get?gender_type=${this.classificationType}`).then(res => {
        if (res.code === '001') {
          this.backData = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    setIfication () {
      if (!this.bookClassification) {
        this.$message.error('书籍分类信息不能为空')
        return
      }
      const params = {
        gender_type: this.value,
        classification: this.bookClassification
      }
      this.axios.post('/back/book-classification-set', params).then(res => {
        this.bookClassification = ''
        this.changeActionType(this.value)
        this.$message.success('分类添加成功')
        console.log(this.classificationType)
      }).catch(err => {
        console.log(err)
      })
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
        }
        .edit {
          flex: 1;
        }
      }
    }
  }
}
</style>
