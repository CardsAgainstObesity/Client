import { defineStore } from 'pinia';
import html2canvas from "html2canvas";

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

// Data persistance
const ls_language = localStorage.getItem("language");
const ls_audio_volume = localStorage.getItem("audio_volume");

export const useConfigStore = defineStore({
	id: 'config',
	state: () => ({
        language: ls_language === null ? 'en' : ls_language,
        audio_volume: ls_audio_volume === null ? 0.5 : parseFloat(ls_audio_volume),
        audio_array: {},
        css_root: document.querySelector(":root"),
        css_variables: {
            "--color-primary": { label: "settings_color_primary", code: "--color-primary", value: "" },
            "--color-secondary": { label: "settings_color_secondary", code: "--color-secondary", value: "" },
            "--color-tertiary": { label: "settings_color_tertiary", code: "--color-tertiary", value: "" },
            "--color-card-black": { label: "settings_color_card_black", code: "--color-card-black", value: "" },
            "--color-card-black-text": { label: "settings_color_card_black_text", code: "--color-card-black-text", value: "" },
            "--color-card-white": { label: "settings_color_card_white", code: "--color-card-white", value: "" },
            "--color-card-white-text": { label: "settings_color_card_white_text", code: "--color-card-white-text", value: "" },
            "--color-ui-text": { label: "settings_color_ui_text", code: "--color-ui-text", value: ""},
            "--color-background": { label: "settings_color_background", code: "--color-background", value: "" },
            "--color-background-alt": { label: "settings_color_background-alt", code: "--color-background-alt", value: "" },
            "--background-image": { label: "", code: "", value: "" },
        },
	}),
    actions: {
        setLanguage(value) {
            this.language = value.code;
            localStorage.setItem("language", value.code);
        },
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
        },
        get_computed_style(property){
            return getComputedStyle(this.css_root).getPropertyValue(property);
        },
        set_property(property, value){
            this.css_variables[property].value = value;
            localStorage.setItem(property, value);
            this.css_root.style.setProperty(property, value);
        },
    },
    getters: {
        css_colors(){
            return Object.values(this.css_variables).filter(css_variable => css_variable.code.includes("--color"));
        }
    }
});
