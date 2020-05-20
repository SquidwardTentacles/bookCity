<template>
  <div class="">
    <p @click="subIndex">{{data}}</p>
  </div>
</template>
<script>
export default {
  name: 'subindex',
  props: {
    data: String
  },
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {
    subIndex () {
      this.$emit('subClick', 'subclick')
    }
  }
}
</script>
<style lang="less" scoped>
</style>
