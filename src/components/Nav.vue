<script>
import { RouterLink } from 'vue-router';
import { mdiCamera, mdiHome, mdiHamburger, mdiBookOpenVariant, mdiCog, mdiInformation } from '@mdi/js';
import html2canvas from "html2canvas";

import Logo from "@/components/Logo.vue";

export default {
    data(){
        return {
            mdiCamera, mdiHome, mdiHamburger, mdiBookOpenVariant, mdiCog, mdiInformation,
        }
    },
    components: {
        RouterLink,
        Logo,
    },
    methods: {
        screenshot() {
            html2canvas(document.querySelector("html")).then((canvas) => {
                var link = document.createElement("a");
                link.download = `${this.$display
                    .text("app_name")
                    .replaceAll(" ", "-")}_${new Date()
                    .toISOString()
                    .slice(0, 10)}`;
                link.href = canvas.toDataURL();
                link.click();
            });
        },
    },
}
</script>

<template>
    <header>
        <div class="topnav noselect" :class="($router.currentRoute.value.name === 'index' ? 'hide':'')">
            <div style="position: absolute; top: 0; left: 0; margin-left: 1rem; margin-top: 1rem; z-index: 1;" :title="$display.text('nav_screenshot')">
                <Icon
                    style="vertical-align: unset; cursor: pointer; color: var(--color-ui-text);"
                    :path="mdiCamera"
                    @click="screenshot"
                />
            </div>
            <nav class="center">
                <RouterLink to="/test" style="display: none;"><Icon :path="mdiInformation" /> TEST</RouterLink>
                <RouterLink v-if="$room.roomId == ''" to="/"><Icon :path="mdiHome" /> {{$display.text("nav_index")}}</RouterLink>
                <RouterLink v-if="$room.roomId != ''" :to="{ name: $room.status, params: { id: ($room.roomId == '' ? 'DEBUG':$room.roomId) } }"><Icon :path="mdiHamburger" /> {{$display.text("nav_game")}}</RouterLink>
                <RouterLink to="/rules"><Icon :path="mdiBookOpenVariant" /> {{$display.text("nav_rules")}}</RouterLink>
                <RouterLink to="/settings"><Icon :path="mdiCog" /> {{$display.text("nav_settings")}}</RouterLink>
                <RouterLink to="/about"><Icon :path="mdiInformation" /> {{$display.text("nav_about")}}</RouterLink>
            </nav>
            <div class="right logo" v-if="$router.currentRoute.value.name !== 'index'">
                <RouterLink to="/secret">
                    <Logo/>
                    <span>{{$display.text("app_name")}}</span>
                </RouterLink>
            </div>
        </div>
    </header>
</template>

<style scoped>
@media only screen and (min-height: 601px) {
    div.hide div.logo {
        display: none;
    }
}

@media screen and (max-width: 1000px) {
    div div.logo {
        display: none;
    }
}

@media screen and (max-width: 600px) {
    nav.center a {
        font-size: 0;
    }
}

div.topnav {
    position: relative;
    overflow: hidden;
    background-color: var(--color-secondary);
    margin-bottom: 2rem;
    transition: 0.5s;
}

nav a.router-link-exact-active {
    color: var(--color-tertiary);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 1rem 1rem;
}

div.right {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
}

div.logo a {
    display: flex;
    align-items: center;
}

div.logo span {
    color: var(--color-primary);
    padding: 1rem 1rem 1rem 0.25rem;
    transition: 0.5s;
}
div.logo svg {
    height: 2rem;
}
</style>