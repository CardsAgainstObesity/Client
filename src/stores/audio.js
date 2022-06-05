import { defineStore } from 'pinia';

export const useAudioStore = defineStore({
	id: 'audio',
	state: () => ({
        audio_array: {},
        audio_volume: 1,
	}),
    actions: {
        setAudioVolume(){
            // console.log(this.audio_volume);
            for (const element of document.querySelectorAll(".audio_card_flip")){
                element.volume = this.audio_volume;
            }
        },
        playAudioFlip(audio){
            document.getElementById(`audio_${audio.name}`).play();
        }
    },
});
