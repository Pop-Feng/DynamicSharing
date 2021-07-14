<template>
	<view class="content">
		<view class="publisherComments">
			<view class="publisherMessage">
				<image :src="publisherData.publisherProfile" mode=""></image>
				<text class="publisherName">{{publisherData.publisherName}}:</text>
				<text>{{publisherData.contentText}}</text>
			</view>
		</view>
		
		<view v-for="(item,index) in reviewerData" class="reviewer" >
				<view class="reviewerMessage">
					<image :src="item.reviewerImage" mode=""></image>
					<text class="reviewerName">{{item.reviewerName}}:</text>
					<text>{{item.reviewerContent}}</text>
				</view>
		</view>
		<view class="bottomInput">
			<image :src="userData.avatarUrl" mode=""></image>
			<input maxlength=40 type="text" placeholder="添加评论..." v-model="commentContent"/>
			<button @click="postComment" type="default" :disabled='btnDisabled'>发布</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				publisherData:{},
				userData:{},
				commentContent:'',
				reviewerData:[]
			}
		},
		onLoad(options){
			this.userData = this.$store.state.userData
			// console.log(this.userData)
			// console.log(options)
			// console.log(JSON.parse(options.dataItem))
			this.publisherData = JSON.parse(options.dataItem)
			console.log('该条动态的id：',this.publisherData.id)
			uni.request({
				url:'http://192.168.1.2:8000/sendcomments/',
				data:{
					commentId:this.publisherData.id
				},
				success: (res) => {
					console.log(res)
					this.reviewerData = res.data.retlist
					this.reviewerData.reverse()
				}
			})
		},
		computed:{
			btnDisabled(){
				if(this.commentContent ===''){
					return true
				}else{
					return false
				}
			}
		},
		methods:{
			postComment(){
				// console.log('此评论的id：',this.publisherData.id)
				// console.log('评论者的头像：',this.userData.avatarUrl)
				// console.log('评论者的名称：',this.userData.nickName)
				// console.log('评论者的openid：',this.userData.openid)
				// console.log('评论者的内容：',this.commentContent)
				const comment = {}
				comment.reviewerImage = this.userData.avatarUrl
				comment.reviewerName = this.userData.nickName
				comment.reviewerContent = this.commentContent
				comment.commentId = this.publisherData.id
				comment.reviewerOpenid = this.userData.openid
				console.log(comment)
				this.reviewerData.unshift(comment)
				uni.request({
					url:'http://192.168.1.2:8000/receivecomments/',
					method:"POST",
					data:{
						commentId:this.publisherData.id,
						reviewerImage:this.userData.avatarUrl,
						reviewerName:this.userData.nickName,
						reviewerOpenid:this.userData.openid,
						reviewerContent:this.commentContent
					},
					success: (res) => {
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style scoped>
	.reviewerMessage,
	.publisherMessage{
		display: flex;
		padding: 20rpx;
		height: 100rpx;
		border-bottom: 2rpx solid #F0AD4E;
		align-items: center;
	}
	
	.reviewerMessage{
		border-bottom: none;
	}
	.reviewerMessage image,
	.bottomInput image,
	.publisherMessage image{
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}
	.reviewerMessage .reviewerName,
	.publisherMessage .publisherName{
		font-weight: 700;
		padding: 0 10rpx;
		color: #007AFF;
	}
	
	.bottomInput{
		padding: 10rpx;
		position: fixed;
		display: flex;
		align-items: center;
		bottom: 0;
		left: 0;
	}
	.bottomInput image,
	.bottomInput button{
		flex: 1;
	}
	.bottomInput input{
		width: 65vw;
		padding: 20rpx;
		
	}
</style>
