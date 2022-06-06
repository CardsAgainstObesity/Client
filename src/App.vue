<script>
import { RouterView, RouterLink } from "vue-router";
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";

export default {
    data() {
        return {
            RouterView,
            RouterLink,
        };
    },
    components: {
        Nav,
        Footer,
    },
    mounted(){
        this.$config.setAudioVolume();
    },
    computed: {
        gameState() {
            let returnValue = "";
            const currentRoute = this.$router.currentRoute.value;
            if (String(currentRoute.path).includes("/game/")) {
                returnValue = ` (${this.$display.text(
                    currentRoute.meta.game_code
                )})`;
            }
            return returnValue;
        },
        setRouteTitle() {
            let routeName = "";
            if (this.$router.currentRoute.value.meta.code) {
                routeName = this.$display.text(this.$router.currentRoute.value.meta.code);
                document.title = `${routeName}${this.gameState} - ${this.$display.text("app_name")}`;
            }
            
        },
        setBackgroundImage(){
            const data_svg_xml = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23${this.$config.css_variables["--color-background-alt"].value.replaceAll("#","").replaceAll(" ","")}' fill-opacity='0.45' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`;
            /* Background image by https://heropatterns.com/ */
            const data = `url("${data_svg_xml}")`;
            this.$config.set_property("--background-image", data);
        },
    },
};
</script>

<template>
    <div>
        {{ setRouteTitle }}
        {{ setBackgroundImage }}
        <Nav />
        <RouterView />
        <ul style="display: none">
            <li v-for="audio in $config.audio_array" :key="audio">
                <audio
                    :id="`audio_${audio.name}`"
                    class="audio_card_flip"
                    :src="`/audio/${audio.name}.mp3`"
                    controls
                />
                <button
                    style="display: block"
                    @click="$config.playAudioClip(audio)"
                >
                    {{ audio.name }}
                </button>
            </li>
        </ul>
    </div>
</template>

<style>
body {
    background-image: var(--background-image);
}
</style>