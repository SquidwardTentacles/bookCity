<template>
  <view>
    <view class="title">
      <view>请选择您喜欢的类型</view>
      <text>书籍推荐更精准欧</text>
    </view>
    <view class="img-box" v-if="httpU">

      <view class="male">
        <image :src="httpU+'/?url=male.jpg'"
               alt=""
               srcset=""></image>
        <view>男频小说</view>
        <text>玄幻、都市</text>
      </view>
      <view class="famale">
        <image :src="httpU+'/?url=famale.jpg'"
               alt=""
               srcset=""></image>
        <view>女频小说</view>
        <text>言情、穿越</text>
      </view>
    </view>
  </view>
</template>

<script>
	import httpUrl from '../../server/config.json'
export default {
  data () {
    return {
      statusHeight: ''
    }
  },
  computed: {
	  httpU() {
		  return 'http://'+httpUrl.address+':'+httpUrl.port
	  }
  },
  created () {
console.log(httpUrl)
  },
  methods: {

  }
}
</script>

<style scoped>
.title {
  text-align: center;
}
.title view {
  color: #000;
  font-weight: bold;
  font-size: 46rpx;
}
.title text {
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
.img-box text {
  display: inline-block;
  margin: 10px;
  color: #999;
}
</style>
