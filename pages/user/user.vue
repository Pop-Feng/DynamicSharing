<template>
	<view>
		<view class="contentTop">
			<view class="headPortrait">
				<image :src="userMessage.avatarUrl" mode=""></image>
			</view>
			<view class="UserName">
				<text>{{userMessage.nickName}}</text>
			</view>
			<view class="headMessage">
				<view>
					<view>{{personShowContent.length}}</view>
					<view>动态</view>
				</view>
				<view >
					<view>0</view>
					<view>粉丝</view>
				</view>
				<view >
					<view>0</view>
					<view>关注</view>
				</view>
			</view>
		</view>
		<view class="photoContent">
			<view class="photoList">
				<image src="../../static/img/photoList.png" mode="scaleToFill"></image>
			</view>
			
			<view class="personalNews">
				<image @click="jumpDetailPage(item.id)" v-for="(item,index) in personShowContent" :key='index' :src="item.contentImg[0]" ></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {processUrl} from '../hooks/processURL.js'
	export default {
		data() {
			return {
				userMessage:{},
				personShowContent:[]
			}
		},
		methods: {
			jumpDetailPage(id){
				uni.navigateTo({
					url:'../detail/detail?id=' + id
				})
			}
		},
		onLoad() {
			this.userMessage = this.$store.state.userData
			uni.request({
				url:'http://192.168.1.2:8000/returnpersonal/',
				data:{
					openid:this.userMessage.openid
				},
				success: (res) => {
					// console.log('个人信息请求结果',res)
					this.personShowContent = res.data.retlist
					processUrl(this.personShowContent)
					// console.log('personShowContent:',this.personShowContent)
				},
				fail: (err) => {
					console.log(err)
				}
			})
		}
	}
</script>

<style scoped>
.contentTop{
		padding: 40rpx 16rpx;
		text-align: center;
		border-bottom: 2rpx solid #C8C7CC;
	}
.headPortrait image{
	width: 180rpx;
	height: 180rpx;
	border-radius: 50%;
}

.headMessage{
	margin-top: 10rpx;
	display: flex;
	justify-content:space-around;
}
.photoList {
	text-align: center;
	border-bottom: 2rpx solid #C8C7CC;
}
.photoList image{
	width: 100rpx;
	height: 100rpx;
}

.personalNews{
	padding-top: 4rpx;
	display: flex;
	/* justify-content: space-around; */
	flex-wrap: wrap;
}

.personalNews image{
	display: inline-block;
	width: 33%;
	height: 280rpx;
}
</style>
