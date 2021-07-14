<template>
	<view class="content">
		<view class="topBg">
			<image src="../../static/img/topBackground.jpg" mode=""></image>
			<text>动 态</text>
		</view>
		<view v-for="(item,index) in showContent" :key='item.id'>
			<view class="top">
				<view class="topLeft">
					<image :src="item.publisherProfile" mode=""></image>
					<text class="topText">{{item.publisherName}}</text>
				</view>
				<view class="topRight">
				</view>
				<!-- <text>{{item.contentImg}}</text> -->
			</view>
			<swiper :indicator-dots="true" :autoplay="false" :interval="3000" :duration="800">
				<swiper-item v-for="(item,index) in item.contentImg" :key='index'>
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
						<image @click="pageRotation(item)" src="../../static/img/comment.png" mode=""></image>
					</view>
					<view class="bottomTopRight">
						<image v-if="!btnCollectoinSelect" @click="collectionSelect(item.id)" src="../../static/img/collection.png" mode=""></image>
						<image v-else @click="collectionSelect(item.id)" src="../../static/img/collection_select.png" mode=""></image>
					</view>

				</view>
				<view class="bottomFooter">
					<text>9999次点赞</text>
					<view class="remarks">
						<view>
							<text>{{item.publisherName}} : </text>
							<text>{{item.contentText}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js'
	import {
		processUrl
	} from '../hooks/processURL.js'
	export default {
		data() {
			return {
				title: 'Hello',
				imageUrl: '',
				showContent: [],
				showContentSwiperItem: [],
				
			}
		},

		onLoad() {
			uni.showModal({
				title: '请登录',
				content: '请先登录再进入此程序,以获取个人信息',
				showCancel: false,
				confirmText: '点击登陆',
				success: () => {
					uni.getUserProfile({
						desc: '登录功能',
						success: (res) => {
							// 拿到用户的基本信息
							// console.log(res.userInfo)
							store.commit('addUserData', res.userInfo)
							// console.log('vuex', this.$store.state.userData)
							this.imageUrl = this.$store.state.userData.avatarUrl
							uni.login({
								provider: 'weixin',
								success: (res) => {
									// console.log(res.code);
									uni.request({
										url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authoriza											tion_code',
										data: {
											appid: 'wx6191e4c6981f09cd',
											js_code: res.code,
											grant_type: 'authorization_code',
											secret: '421464fbfd1425142f9b5a452019ce06'
										},
										success: (res) => {
											// console.log(res)
											store.commit('addPushOpenid',
												res.data.openid)
											// console.log('vuex2', this
											// 	.$store.state.userData)
											uni.showLoading({
													title: '加载中',
													mask: true
												}),
												uni.request({
													url: 'http://192.168.1.2:8000/login/',
													method: 'GET',
													data: {
														userdata: this
															.$store
															.state
															.userData
													},
													success: (res) => {
														// console
														// 	.log(
														// 		'传过来的数据',
														// 		res
														// 		)
														this.showContent =
															res
															.data
															.retList
														// console
														// 	.log(
														// 		'接收的数据',
														// 		this
														// 		.showContent
														// 		)
														processUrl(
															this
															.showContent
														)
														this.showContent
															.reverse()
														uni.hideLoading()
													},
													fail: (res) => {
														// console
														// 	.log(
														// 		res
														// 	)
													}
												})
										}
									})
								}
							});
						},
					})
				}
			})
		},
		onPullDownRefresh() {
			uni.request({
				url: 'http://192.168.1.2:8000/login/',
				method: 'GET',
				data: {
					userdata: this.$store.state.userData
				},
				success: (res) => {
					// console.log('传过来的数据', res)
					this.showContent = res.data.retList
					// console.log('接收的数据', this.showContent)
					processUrl(this.showContent)
					this.showContent.reverse()
					uni.stopPullDownRefresh()
				},
				fail: (res) => {
					console.log(res)
				}
			})
		},
		methods: {
			// pageRotation(commentId, commentText, publisherProfile, publisherName) {
			pageRotation(item) {
				// console.log('调转到评论页面', commentId, commentText, publisherProfile,publisherName)
				// console.log('调转到评论页面', item)
				uni.navigateTo({
					// url: '../CommentsPage/CommentsPage?commentId=' + commentId + '&commentText=' + commentText +
					// 	'&publisherProfile=' + publisherProfile + '&publisherName=' + publisherName
					url: '../CommentsPage/CommentsPage?dataItem=' + JSON.stringify(item)
				})
			},
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
