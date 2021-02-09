<template>
	<div>
		<video :src="src" @click='checkVideoFun' style="width:100%;height:100%" :ref="src"></video>
		<div class="mask" v-if="videoState == true" @click="masksCloseFun">
			<!-- //弹窗 -->
			<div class="videomasks" >
				<video :src="src" controls="controls" autoplay :ref="src" >您的浏览器不支持 video 标签。</video>
			</div>
		</div>


	</div>
</template>

<script>
	export default {
		props: {
			src: String,
		},
		data() {
			return {
				videoState: false
			};
		},
		created() {},
		methods: {
			checkVideoFun(videos) {
				this.videoState = true;
			},
			masksCloseFun() {
				console.log(111)
				this.videoState = false;
				
			},
		}
	};
</script>

<style lang="less">
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 10;
		background-color: rgba(0, 0, 0, .5);
		// opacity: 0.6;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 12px;
	}

	// // 内容层 z-index要比遮罩大，否则会被遮盖
	.videomasks {
		// max-width: 1200px;
		// position: fixed;
		// left: 50%;
		// top: 50%;
		z-index: 20;
		// background: #fff;
		// transform: translate(-50%, -50%);

	}

	.videomasks video {
		width: 300px;
		margin: 0 auto;
		// height: 10%;
	}
</style>