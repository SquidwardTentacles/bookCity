<template>
  <div class="headers"
       :style="{'height':height+'px'}">
    <div class="left-icon">
      <img class="magnifer"
           src="../../static/images/magnifer.jpg"
           alt=""
           srcset="">
    </div>
    <div class="center">{{title}}</div>
    <div class="right"></div>
  </div>
</template>

<script>
// import store from '../store'
export default {
  props: ['title'],
  data () {
    return {
      height: 0
    }
  },
  created () {
    this.getHeight()
  },
  methods: {
    getHeight () {
      let that = this
      wx.getSystemInfo({
        success: function (res) {
          that.height = parseInt(res.statusBarHeight) * 2
          // 获取设备状态栏高度
          // store.commit('setStatusHeight', (parseInt(res.statusBarHeight) * 2))
        }
      })
    }
  }
}
</script>

<style>
.headers {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  align-self: center;
  margin-bottom: 5px;
}
.headers div {
  width: 33.3%;
  align-self: center;
}
.headers div:nth-child(2) {
  text-align: center;
  font-weight: bolder;
}
.headers div .magnifer {
  width: 20px;
  height: 20px;
  margin-left: 10px;
  display: block;
}
</style>
