<template>
	<view class="content">
		<nativeLink nativeTitle="书城"></nativeLink>
		<view class="nav-tag">
			<view class="flex-nav flexbox between">
				<view @tap="navTap(index)" :class="{'active':activeNav===index}" class="native-item" v-for="(item,index) in navTitle" :key="index">
					<text> {{item}}</text> 
				</view>
			</view>
		</view>
		<view class="content">
			<recommend></recommend>
		</view>
	</view>
</template>

<script>
	import nativeLink from '../../component/native-link.vue'
	import recommend from '../../component/book_city_view/recommend.vue'
	export default {
	components:{
		nativeLink,
		recommend
	},
		data() {
			return {
				navTitle:[
					'推荐','排行','免费','分类'
				],
				activeNav:0
			}
		},
		onLoad() {

		},
		methods: {
			navTap(i) {
				this.activeNav=i
			}
		}
	}
</script>

<style scoped lang="less">
	.content {
		padding:0px 3px ;
		box-sizing: border-box;
		.nav-tag {
			width: 98%;
			color:#666666;
			.flex-nav {
				border-bottom: 1px solid #EEEEEE;
				padding-bottom: 2px;
				.native-item {
					width:25% ;
					text-align: center;
					&.active {
						text {
							color:#B6423A;
							border-bottom: 1px solid #B6423A;
						}
					}
				}
			}
		}
	}


</style>
