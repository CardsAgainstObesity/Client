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
            document.title = `${this.$display.text(
                this.$router.currentRoute.value.meta.code
            )}${this.gameState} - ${this.$display.text("app_name")}`;
        },
    },
};
</script>

<template>
    <div>
        {{ setRouteTitle }}
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
