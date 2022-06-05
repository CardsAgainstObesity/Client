<template>
    <main class="centered_text">
        <label for="language">
            {{ $display.text("settings_language") }}
        </label>
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
        <label for="audio_volume_range">
            audio_volume_range
        </label>
        <input type="range" min="0" max="1" step="0.05" id="audio_volume_range" v-model="$config.audio_volume" @change="$config.setAudioVolume" style="width: 100%;"/>
    </main>
</template>

<script>
export default {
    name: "SettingsView",
    data() {
        return {
            languages: [
                { label: "🇬🇧 English", code: "en" },
                { label: "🇪🇸 Español", code: "es" },
            ],
        };
    },
};
</script>