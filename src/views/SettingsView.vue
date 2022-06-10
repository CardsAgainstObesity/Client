<script>
import { mdiContentCopy } from '@mdi/js'; 
import twemoji from "twemoji";

import Logo from "@/components/Logo.vue";
import Card from "@/components/Card.vue";
import { ColorPicker } from 'vue-accessible-color-picker';

export default {
    components: {
        Logo,
        Card,
        ColorPicker,
    },
    data() {
        return {
            languages: [
                { emoji: "🇬🇧", label: "English", code: "en" },
                { emoji: "🇪🇸", label: "Español", code: "es" },
            ],
            twemoji,
            mdiContentCopy,
            property_index: 0,
            color_presets: [
                {
                    name: "settings_theme_dark",
                    colors: [
                        { label: "settings_color_primary", code: "--color-primary", value: "#5d88bd" },
                        { label: "settings_color_secondary", code: "--color-secondary", value: "#222222" },
                        { label: "settings_color_tertiary", code: "--color-tertiary", value: "#a2a2a2" },
                        { label: "settings_color_ui_text", code: "--color-ui-text", value: "#a2a2a2"},
                        { label: "settings_color_card_black", code: "--color-card-black", value: "#2e3440" },
                        { label: "settings_color_card_black_text", code: "--color-card-black-text", value: "#fefefe" },
                        { label: "settings_color_card_white", code: "--color-card-white", value: "#5d88bd" },
                        { label: "settings_color_card_white_text", code: "--color-card-white-text", value: "#fefefe" },
                        { label: "settings_color_background", code: "--color-background", value: "#181818" },
                        { label: "settings_color_background_alt", code: "--color-background-alt", value: "#222222" },
                    ]
                },
                {
                    name: "settings_theme_white",
                    colors: [
                        { label: "settings_color_primary", code: "--color-primary", value: "#5d88bd" },
                        { label: "settings_color_secondary", code: "--color-secondary", value: "#cccccc" },
                        { label: "settings_color_tertiary", code: "--color-tertiary", value: "#202020" },
                        { label: "settings_color_ui_text", code: "--color-ui-text", value: "#202020"},
                        { label: "settings_color_card_black", code: "--color-card-black", value: "#2e3440" },
                        { label: "settings_color_card_black_text", code: "--color-card-black-text", value: "#fefefe" },
                        { label: "settings_color_card_white", code: "--color-card-white", value: "#5d88bd" },
                        { label: "settings_color_card_white_text", code: "--color-card-white-text", value: "#fefefe" },
                        { label: "settings_color_background", code: "--color-background", value: "#eeeeee" },
                        { label: "settings_color_background_alt", code: "--color-background-alt", value: "#cccccc" },
                    ]
                },
                {
                    name: "settings_theme_cardsagainsthumanity",
                    colors: [
                        { label: "settings_color_primary", code: "--color-primary", value: "#fefefe" },
                        { label: "settings_color_secondary", code: "--color-secondary", value: "#000000" },
                        { label: "settings_color_tertiary", code: "--color-tertiary", value: "#808080" },
                        { label: "settings_color_ui_text", code: "--color-ui-text", value: "#fefefe"},
                        { label: "settings_color_card_black", code: "--color-card-black", value: "#000000" },
                        { label: "settings_color_card_black_text", code: "--color-card-black-text", value: "#fefefe" },
                        { label: "settings_color_card_white", code: "--color-card-white", value: "#fefefe" },
                        { label: "settings_color_card_white_text", code: "--color-card-white-text", value: "#000000" },
                        { label: "settings_color_background", code: "--color-background", value: "#050505" },
                        { label: "settings_color_background_alt", code: "--color-background-alt", value: "#202020" },
                    ]
                }
            ],
            card_preview: {
                black: {
                    text: {
                        en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ___.",
                    }
                },
                white: {
                    text: {
                        en: "Vivamus imperdiet posuere justo, quis egestas purus rutrum eget.",
                    },
                    preview_active: true, 
                }
            },
        };
    },
    methods: {
        apply_preset(colors){
            for(const color of colors){
                this.$config.set_property(color.code, color.value);
            }
        }
    },
	computed: {
        dynamic_color_picker() {
            const property_index = this.property_index;
			let text = `
                <span>{{ $display.text(property_option.label) }}</span>
                <ColorPicker style="min-width: 50%; background-color: var(--color-background); transition: 0.5s; margin-bottom: 1rem;" default-format="hex" :visible-formats="['hex']" alpha-channel="hide" :color="property_option.value" @color-change="$config.set_property(property_option.code, $event.cssColor)">
                    <template #copy-button>
                        <Icon :path="mdiContentCopy" style="color: white; display: inherit;" />
                    </template>
                </ColorPicker>
            `;
            return { // Returrns a dynamically-generated component.
                components: {
                    ColorPicker
                },
                data() {
                    return {
                        mdiContentCopy,
                        property_option: this.$config.css_colors[property_index],
                    }
                },
                template: `<div>${text}</div>`
            }

        }
    }
};
</script>

<template>
    <main class="padding">
        <p>{{ $display.text("settings_language") }}</p>
        <ul>
            <!-- TODO: Cambiar este v-for por cartas que tengan el estilo de las banderas del idioma. -->
            <li
                style="cursor: pointer"
                @click="$config.setLanguage(lang)"
                v-for="lang in languages"
                :key="lang.code"
            >
            <div v-html="twemoji.parse(lang.emoji)" />
            <span>{{ lang.label }}</span>
            </li>
        </ul>
        <p>{{ $display.text("settings_audio_volume_range") }}</p>
        <input type="range" min="0" max="1" step="0.05" v-model="$config.audio_volume" @change="$config.setAudioVolume" style="width: 100%;"/>

        <div id="color_preview">
            <Logo id="color_preview_logo" />
                <Card
                    :data="card_preview.black"
                    :dark="true"
                    :clickable="false"
                    :active="true"
                />
                <Card
                    :data="card_preview.white"
                    :dark="false"
                    :clickable="true"
                    :active="card_preview.preview_active"
                    @click="card_preview.preview_active = !card_preview.preview_active; $config.playRandomAudioClip();"
                />
        </div>

        <p>{{ $display.text("settings_css_presets") }}</p>
        <button style="margin-bottom: 0.5rem;" v-for="preset in color_presets" :key="preset" @click="apply_preset(preset.colors)">{{ $display.text(preset.name) }}</button>

        <div class="color_chooser">
            <ul style="list-style: none; padding-left: 0; padding-right: 5rem;">
                <li v-for="(property_option, index) in $config.css_colors" :key="property_option" style="cursor: pointer;" @click="property_index = index">
                    <div :style="{ border: '2px solid black', borderRadius: '50px', display: 'inline-block', width: '1.5rem', height: '1.5rem', backgroundColor: property_option.value, marginRight: '0.5rem' }" />
                    <span style="vertical-align: top;">{{ $display.text(property_option.label) }}</span>
                </li>
            </ul>
            <component style="flex-grow: 2;" :is="dynamic_color_picker"></component>
        </div>
    </main>
</template>

<style>
.vacp-copy-button {
    display: none !important;
}
</style>

<style scoped>
.color_chooser {
    display: flex;
    flex-wrap: wrap;
    justify-content: stretch;
    margin-top: 1rem;
}

#color_preview {
    display: flex;
    flex-wrap: wrap;
}

#color_preview_logo {
    width: 20vw;
}

@media only screen and (max-width: 600px){
    #color_preview_logo {
        width: 100%;
    }
}
</style>