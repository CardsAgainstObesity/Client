<script>
import { ColorPicker } from 'vue-accessible-color-picker';
import { mdiContentCopy } from '@mdi/js'; 

export default {
    components: {
        ColorPicker,
    },
    data() {
        return {
            languages: [
                { label: "🇬🇧 English", code: "en" },
                { label: "🇪🇸 Español", code: "es" },
            ],
            mdiContentCopy,
        };
    },
    methods: {

    },
};
</script>

<template>
    <main class="centered_text">
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
        <p>settings_audio_volume_range</p>
        <input type="range" min="0" max="1" step="0.05" v-model="$config.audio_volume" @change="$config.setAudioVolume" style="width: 100%;"/>

        <!-- <p>settings_css_property</p>
        <select id="css_property" v-model="css_property">
            <option v-for="property_option in css_property_select" :key="property_option" :value="property_option.code">{{ property_option.label }}</option>
        </select>

        <p>settings_css_color</p>
        <input id="css_color" type="color" v-model="css_value"/>
        <button @click="set_property(css_property, css_value)">settings_apply</button> -->
        <p>settings_css_property</p>
        <div v-for="property_option in $config.css_colors" :key="property_option">
            <p>{{ property_option.label }}</p>
            <!-- <input id="css_color" type="color" v-model="property_option.value" @change="set_property(property_option.code, property_option.value)"/> -->
            <ColorPicker style="background-color: var(--color-background); transition: 0.5s;" default-format="hex" :visible-formats="['hex']" alpha-channel="hide" :color="$config.get_computed_style(property_option.code)" @color-change="$config.set_property(property_option.code, $event.cssColor)">
                <template #copy-button>
                    <Icon :path="mdiContentCopy" style="color: white; display: inherit;" />
                </template>
            </ColorPicker>
        </div>
    </main>
</template>