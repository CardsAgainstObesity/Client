<script>
export default {
    data(){
        return {
            audio_array: {},
            audio_volume: 1,
        }
    },
    mounted(){
        for(let index = 1; index <= 6; index++){
            this.audio_array[index] = {
                name: `card_flip_${index}`,
            }
        }
    },
    watch: {
        audio_volume(newvolume){
            this.audio_volume = newvolume;
            for (const element of document.querySelectorAll(".audio_card_flip")){
                element.volume = newvolume;
            }
        }
    },
    methods: {
        playAudioFlip(audio){
            console.log("audio", audio);
            document.getElementById(`audio_${audio.name}`).play();
        }
    }
}
</script>

<template>
    <div>
        <h1>Test Audio API (Card flip sound)</h1>
        <input type="range" v-model="audio_volume" min="0" max="1" step="0.1"/>
            <ul>
                <li v-for="(audio, index) in audio_array" :key="audio">
                    <audio :id="`audio_${audio.name}`" class="audio_card_flip" :src="`/audio/card_flip_${index}.mp3`" controls />
                    <button style="display: block;" @click="playAudioFlip(audio)">{{ audio.name }}</button>
                </li>
            </ul>
    </div>
</template>