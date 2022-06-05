<script>
export default {
    name: "SettingsView",
    data() {
        return {
            languages: [
                { label: "🇬🇧 English", code: "en" },
                { label: "🇪🇸 Español", code: "es" },
            ],
            css_root: document.querySelector(":root"),
            css_property: "",
            css_property_select: [
                { label: "settings_color_primary", code: "--color-primary" },
                { label: "settings_color_secondary", code: "--color-secondary" },
                { label: "settings_color_ui_text", code: "--color-ui-text" },
                { label: "settings_color_card_text", code: "--color-card-text" },
                { label: "settings_color_background", code: "--color-background" },
                { label: "settings_color_background-alt", code: "--color-background-alt" },
            ],
            css_value: "",
        };
    },
    methods: {
        get_computed_style(property){
            // getComputedStyle(this.css_root).getPropertyValue("--color-background");
            return getComputedStyle(this.css_root).getPropertyValue(property);
        },
        set_property(property, value){
            // this.css_root.style.setProperty('--color-background', 'black');
            console.log("property", property);
            console.log("value", value);
            this.css_root.style.setProperty(property, value);
        }
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

        <p>settings_css_property</p>
        <select id="css_property" v-model="css_property">
            <option v-for="property_option in css_property_select" :key="property_option" :value="property_option.code">{{ property_option.label }}</option>
        </select>

        <p>settings_css_color</p>
        <input id="css_color" type="color" v-model="css_value"/>
        <button @click="set_property(css_property, css_value)">settings_apply</button>
    </main>
</template>