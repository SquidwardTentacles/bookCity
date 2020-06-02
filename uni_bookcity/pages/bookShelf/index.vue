<template>
	<view class="content">
		<nativeLink nativeTitle="书架"></nativeLink>
		<firstCome></firstCome>
	</view>
</template>

<script>
	import firstCome from "../../component/firstCome.vue"
	import nativeLink from "../../component/native-link.vue"
	export default {
		components:{
			firstCome,
			nativeLink
		},
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>

</style>
