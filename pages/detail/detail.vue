<template>
	<view class="content">
		<swiper :indicator-dots="true" :autoplay="false" :interval="3000" :duration="800">
			<swiper-item v-for="(item,index) in detailContent[0].contentImg" :key='index'>
				<image :src='item' mode="scaleToFill"></image>
			</swiper-item>
		</swiper>
		<view class="bottom">
			<view class="bottomTop">
				<view class="bottomTopLeft">
					<image   src="../../static/img/like.png" mode=""></image>
					<!-- <image v-else @click="likeSelect(item.id)" src="../../static/img/like_select.png" mode=""></image> -->
					<!-- 						<image @click="pageRotation(item.id,item.contentText,item.publisherProfile,item.publisherName)"
						src="../../static/img/comment.png" mode=""></image> -->
					<image @click="pageRotation(detailContent[0])" src="../../static/img/comment.png" mode=""></image>
				</view>
				<view class="bottomTopRight">
					<image  src="../../static/img/collection.png" mode=""></image>
					<!-- <image v-else @click="collectionSelect(item.id)" src="../../static/img/collection_select.png" mode=""></image> -->
				</view>
		
			</view>
			<view class="bottomFooter">
				<text>9999次点赞</text>
				<view class="remarks">
					<view>
						<text>{{detailContent[0].publisherName}} : </text>
						<text>{{detailContent[0].contentText}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {processUrl} from '../hooks/processURL.js'
	export default {
		data() {
			return {
				detailContent:[]
			}
		},
		methods: {
			pageRotation(item) {
				// console.log('调转到评论页面', commentId, commentText, publisherProfile,publisherName)
				// console.log('调转到评论页面', item)
				uni.navigateTo({
					// url: '../CommentsPage/CommentsPage?commentId=' + commentId + '&commentText=' + commentText +
					// 	'&publisherProfile=' + publisherProfile + '&publisherName=' + publisherName
					url: '../CommentsPage/CommentsPage?dataItem=' + JSON.stringify(item)
				})
			},
		},
		onLoad(payload){
			// console.log(payload)
			uni.request({
				url:'http://192.168.1.2:8000/getdetail/',
				data:{
					contentId : payload.id
				},
				success: (res) => {
					// console.log(res)
					this.detailContent = res.data.retlist
					processUrl(this.detailContent)
					// console.log(this.detailContent)
				}
			})
			
		}
	}
</script>

<style scoped>
.topBg {

		text-align: center;
		padding-bottom: 20rpx;
		box-sizing: border-box;
		color: #007AFF;
		font-weight: bold;
	}

	.topBg image {
		width: 100%;
		height: 20vh;
		margin-bottom: 20rpx;
	}



	.content swiper {
		width: 100%;
		text-align: center;
		height: 75vh;
	}

	.content swiper swiper-item image {
		width: 100%;
		height: 100%;
	}

	.top {
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 8vh
	}

	.topLeft {
		display: flex;
		align-items: center;
	}

	.topLeft image {
		margin-right: 20rpx;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.topLeft text {
		font-size: 28rpx;
	}

	.top .topRight {
		width: 10rpx;
		height: 65rpx;
		border-right: #333333 15rpx dotted;
	}

	.bottom {
		margin: 20rpx 0;
	}

	.bottomTop {
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
	}


	.bottomTop .bottomTopLeft {
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}


	.bottomTop .bottomTopRight {
		box-sizing: border-box;
	}

	.bottomTop .bottomTopLeft image {
		margin-right: 20rpx;
	}

	.bottomTop .bottomTopLeft image,
	.bottomTop .bottomTopRight image {
		width: 50rpx;
		height: 50rpx;

	}

	.bottom .bottomFooter {

		margin-left: 20rpx;

	}

	.bottom .bottomFooter text {
		display: inline-block;
		font-weight: 700;
		font-size: 26rpx;
	}

	.bottom .bottomFooter .remarks text:nth-child(1) {
		color: #007AFF;
	}
</style>
