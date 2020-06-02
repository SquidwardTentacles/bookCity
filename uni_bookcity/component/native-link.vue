<template>
	<view class="nav-header status_bar" :style="{height:statusBar+'px'}">
			<image class="icon" src="../static/images/magnifer.jpg" mode=""></image>
		<view class="title">{{nativeTitle}}</view>
		<view class="null-content"></view>
	</view>
</template>

<script>
	export default {
		props:{
			nativeTitle:String
		},
		data(){
			return {
				statusBar:''
			}
		},
		created () {
			console.log( this.statusBar)
			let that = this
			uni.getSystemInfo({
			       success:function(e){  
									console.log(e,'native')
			           that.statusBar = e.statusBarHeight  
			           // #ifndef MP  
			           if(e.platform == 'android') {  
			               that.statusBar = e.statusBarHeight + 50  
			           }else {  
			               that.statusBar = e.statusBarHeight + 45  
			           }  
			           // #endif  
						
			           // #ifdef MP-WEIXIN  
			           let custom = wx.getMenuButtonBoundingClientRect()  
			           that.statusBar = custom.bottom + custom.top - e.statusBarHeight  
			           // #endif  
						
			           // #ifdef MP-ALIPAY  
			           Vue.prototype.statusBar = e.statusBarHeight + e.titleBarHeight  
			           // #endif  
			       }  
			   })  
			   console.log(that.statusBar,'statusBar')
		},		
	}
</script>

<style lang="less">
.nav-header {
	width:100% ;	
	padding-top: 25px;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 30rpx;
	.icon {
		margin-left: 10px;
		width: 30rpx;
		height: 30rpx;
	}
	.null-content {
		width:100rpx ;
	}
}
</style>
