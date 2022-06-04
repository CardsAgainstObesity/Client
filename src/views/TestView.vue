<script>
export default {
    data(){
        return {
            audio_array: {},
        }
    },
    mounted(){
        for(let index = 1; index <= 6; index++){
            this.audio_array[index] = {
                element: new Audio(`/audio/card_flip_${index}.mp3`),
                name: `card_flip_${index}`,
            }
        }
    },
    methods: {
        playAudioFlip(audio){
            console.log("audio", audio);
            audio.element.play();
        }
    }
}
</script>

<template>
    <div>
        <h1>Test Audio API (Card flip sound)</h1>
        <button style="display: block;" v-for="audio in audio_array" :key="audio" @click="playAudioFlip(audio)">{{ audio.name }}</button>
    </div>
</template>