<template>
	<view class="content">
		<view class="title">动态发布</view>
		<view class="imgClass" >
				<image v-for="(item,index) in imgList" :key='index'  :src="item" mode=""></image>
		</view>
		<view class="inputClass">
			<input class="input" type="text" placeholder="为你的图片写上一段话吧!" v-model="publishedText"/>
		</view>
		<view class="btnClass">
			<button type="default" @click="addImg" :disabled="disableButton" size="mini">上传图片/拍摄</button>
			<button type="warn" @click="cancelUpload" size="mini">取	消上传</button>
		</view>
		<button type="primary" @click="release" :disabled="disableButtonRelease">发	布</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
					imgList:[],
					publishedText:''
			}
		},
		methods: {
			addImg(){
				console.log(this)
				uni.chooseImage({
					sizeType:['original'],
					crop:{
						'width':100,
						'height':100
					},
					success:(res)=> {
						this.imgList = res.tempFilePaths
						// console.log(this.imgList)
					}
				})
			},
			cancelUpload(){
				this.imgList = []
				this.publishedText=''
			},
			release(){
				uni.request({
					url:"http://192.168.1.2:8000/release/",
					method:'POST',
					data:{
						contentImg:this.imgList,
						contentText:this.publishedText,
						contentOpenid:this.$store.state.userData.openid,
						publisherProfile:this.$store.state.userData.avatarUrl,
						publisherName:this.$store.state.userData.nickName
					},
					success: (res) => {
						// console.log(res)
						uni.showToast({
							title:'刷新成功,主页下拉即可获取最新动态',
							icon:'success',
							mask:true,
							duration:2000
						})
						uni.switchTab({
							url:'/pages/index/index'
						})
					}
				})

			}
		},
		
		computed:{
			disableButton(){
				if(this.imgList.length === 9){
					return true
				}else{
					return false
				}
			},
			disableButtonRelease(){
				if(this.imgList.length === 0){
					return true
				}else{
					return false
				}
			}
		}
	}
</script>

<style scoped>
.imgClass{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	/* justify-content: center; */
	width: 100%;
	height: 750rpx;
	border: #4CD964 2rpx solid;
	padding: 4rpx;
}
.imgClass image{

}
.imgClass image{
	width: 32%;
	height: 250rpx;
}


.content .inputClass {
	border: 2rpx solid #007AFF;
	margin: 10rpx 0;
}
.btnClass{
	display: flex;
	justify-content: space-evenly;
	padding: 30rpx 0;
}
.title{
	text-align: center;
}
</style>
