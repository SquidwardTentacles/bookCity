<template>
  <div>
    <card2 title="书架"></card2>
    <div class="title">
      <p>请选择您喜欢的类型</p>
      <span>书籍推荐更精准欧</span>
    </div>
    <div class="img-box">

      <div class="male">
        <image src="http://127.0.0.1:3000/?url=male.jpg"
               alt=""
               srcset=""></image>
        <p>男频小说</p>
        <span>玄幻、都市</span>
      </div>
      <div class="famale">
        <image src="http://127.0.0.1:3000/?url=famale.jpg"
               alt=""
               srcset=""></image>
        <p>女频小说</p>
        <span>言情、穿越</span>
      </div>
    </div>
  </div>
</template>

<script>
import card2 from '../../components/card2'
export default {
  components: {
    card2
  },
  data () {
    return {
      statusHeight: ''
    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style scoped>
.title {
  text-align: center;
}
.title p {
  color: #000;
  font-weight: bold;
  font-size: 46rpx;
}
.title span {
  color: #999;
  margin: 10px 0 15px 0;
  display: inline-block;
}
.img-box {
  text-align: center;
}
.img-box image {
  width: 350rpx;
  height: 350rpx;
}
.img-box {
  font-size: 30rpx;
}
.img-box span {
  display: inline-block;
  margin: 10px;
  color: #999;
}
</style>
