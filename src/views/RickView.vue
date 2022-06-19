<script>
export default {
    data(){
        return {
            screen: window.screen
        }
    }
}
</script>
<template>
	<div style="margin-top: -2rem; line-height: 0;">
		<iframe
            style="height: calc( 100vh - 56px); width: 100vw;"
            :width="screen.width"
            :height="screen.height"
			src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	</div>
</template>
