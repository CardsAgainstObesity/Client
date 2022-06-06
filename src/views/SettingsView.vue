<script>
import { mdiContentCopy } from '@mdi/js'; 

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
                { label: "🇬🇧 English", code: "en" },
                { label: "🇪🇸 Español", code: "es" },
            ],
            mdiContentCopy,
            color_presets: [
                {
                    name: "settings_theme_default",
                    colors: [
                        { label: "settings_color_primary", code: "--color-primary", value: "#5d88bd" },
                        { label: "settings_color_secondary", code: "--color-secondary", value: "#2e3440" },
                        { label: "settings_color_ui_text", code: "--color-ui-text", value: "#a2a2a2"},
                        { label: "settings_color_card_text", code: "--color-card-text", value: "#fefefe" },
                        { label: "settings_color_background", code: "--color-background", value: "#181818" },
                        { label: "settings_color_background-alt", code: "--color-background-alt", value: "#222222" },
                    ]
                },
                {
                    name: "settings_theme_white",
                    colors: [
                        { label: "settings_color_primary", code: "--color-primary", value: "#5d88bd" },
                        { label: "settings_color_secondary", code: "--color-secondary", value: "#2e3440" },
                        { label: "settings_color_ui_text", code: "--color-ui-text", value: "#202020"},
                        { label: "settings_color_card_text", code: "--color-card-text", value: "#fefefe" },
                        { label: "settings_color_background", code: "--color-background", value: "#eeeeee" },
                        { label: "settings_color_background-alt", code: "--color-background-alt", value: "#cccccc" },
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
            }
        };
    },
    methods: {
        apply_preset(colors){
            for(const color of colors){
                this.$config.set_property(color.code, color.value);
            }
        }
    },
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
                {{ lang.label }}
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
        <div v-for="preset in color_presets" :key="preset">
            <button @click="apply_preset(preset.colors)">{{ $display.text(preset.name) }}</button>
        </div>

        <p>settings_css_property</p>
        <div v-for="property_option in $config.css_colors" :key="property_option">
            <p>{{ property_option.label }}</p>
            <ColorPicker style="background-color: var(--color-background); transition: 0.5s;" default-format="hex" :visible-formats="['hex']" alpha-channel="hide" :color="property_option.value" @color-change="$config.set_property(property_option.code, $event.cssColor)">
                <template #copy-button>
                    <Icon :path="mdiContentCopy" style="color: white; display: inherit;" />
                </template>
            </ColorPicker>
        </div>
    </main>
</template>

<style scoped>
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