<template>
	<view class="content">
		<nativeLink nativeTitle="我的"></nativeLink>
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	import nativeLink from '../../component/native-link.vue'
	export default {
		components:{
			nativeLink
		},
		data() {
			return {
				title: 'Hello'
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
