<script setup>
import Nav from "@/components/Nav.vue";
</script>

<template>
    <div>
        <Nav />
        <main class="centered_text">
            <label for="language">
                {{$display.text("settings_language")}}
                </label>
            <ul>
                <!-- TODO: Cambiar este v-for por cartas que tengan el estilo de las banderas del idioma. -->
                <li style="cursor: pointer;" @click="setLanguage(lang)" v-for="lang in languages" :key="lang.code">{{lang.label}}</li>
            </ul>
        </main>
    </div>
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
    methods: {
        setLanguage (value) {
            this.$display.language = value.code;
        },
    }
};
</script>

<style scoped>
.v-select {
    background-color: #222;
    --vs-controls-color: #83b4f0;
    --vs-border-color: #83b4f0;

    --vs-dropdown-bg: #222222;
    --vs-dropdown-color: #cc99cd;
    --vs-dropdown-option-color: #83b4f0;

    --vs-selected-bg: #83b4f0;
    --vs-selected-color: #83b4f0;

    --vs-search-input-color: #eeeeee;

    --vs-dropdown-option--active-bg: #83b4f0;
    --vs-dropdown-option--active-color: #222222;
}
</style>
