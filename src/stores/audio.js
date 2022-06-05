import { defineStore } from 'pinia';

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const ls_audio_volume = localStorage.getItem("audio_volume"); // Persist audio volume selection

export const useAudioStore = defineStore({
	id: 'audio',
	state: () => ({
        audio_array: {},
        audio_volume: ls_audio_volume === null ? 0.5 : ls_audio_volume,
	}),
    actions: {
        setAudioVolume(){
            localStorage.setItem("audio_volume", this.audio_volume);
            for (const element of document.querySelectorAll(".audio_card_flip")){
                element.volume = this.audio_volume;
            }
        },
        playRandomAudioClip(){
            const randomAudio = this.audio_array[getRandomIntInclusive(1, Object.keys(this.audio_array).length)];
            this.playAudioClip(randomAudio);
        },
        playAudioClip(audio){
            document.getElementById(`audio_${audio.name}`).play();
        }
    },
});
