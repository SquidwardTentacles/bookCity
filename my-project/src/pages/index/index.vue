<template>
  <div>
    <div v-show="statusHeight"
         :style="{height:statusHeight+'px'}"></div>
    <img src="http://127.0.0.1:8000/?url=famale.jpg"
         alt=""
         srcset="">
  </div>
</template>

<script>
export default {
  data () {
    return {
      statusHeight: ''
    }
  },

  methods: {
  },

  mounted () {
    wx.getSystemInfo({
      success: (res) => {
        console.log(res.statusBarHeight)
        this.statusHeight = res.statusBarHeight
        console.log(this.statusHeight)

        // this.globalData.height = res.statusBarHeight
      }
    })
  }
}
</script>

<style scoped>
</style>
