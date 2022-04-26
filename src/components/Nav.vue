<script setup>
import { RouterLink } from 'vue-router';
import { game } from '@/services/cards.mjs';
import Room from '../services/api/Room.mjs';
import { ackree } from '@/services/ackree.mjs';
import { mdiHome, mdiHamburger, mdiBookOpenVariant, mdiCog, mdiInformation } from '@mdi/js';
// ackree(); // https://ackee.electerious.com/
defineProps({
    hidelogo: {
        type: Boolean,
        required: false
    }
});
</script>
<template>
    <header>
        <div class="topnav noselect" :class="(hidelogo === true ? 'hide':'')">
            <nav class="center">
                <RouterLink v-if="Room.roomId == ''" to="/"><Icon :path="mdiHome" /> {{$display.text("nav_index")}}</RouterLink>
                <RouterLink v-if="Room.roomId != ''" :to="{ name: game.state, params: { id: (Room.roomId == '' ? 'DEBUG':Room.roomId) } }"><Icon :path="mdiHamburger" /> {{$display.text("nav_game")}}</RouterLink>
                <RouterLink to="/rules"><Icon :path="mdiBookOpenVariant" /> {{$display.text("nav_rules")}}</RouterLink>
                <RouterLink to="/settings"><Icon :path="mdiCog" /> {{$display.text("nav_settings")}}</RouterLink>
                <RouterLink to="/about"><Icon :path="mdiInformation" /> {{$display.text("nav_about")}}</RouterLink>
            </nav>
            <div class="right logo">
                <span>{{$display.text("app_name")}}</span>
            </div>
        </div>
    </header>
</template>

<style scoped>
@media only screen and (min-height: 601px) {
	div.hide > div.logo {
		background-image: none;
	}
    div.hide > div.logo > span {
        display: none;
    }
}

@media screen and (max-width: 1000px) {
    div > div.logo > span {
        display: none;
    }
}

@media screen and (max-width: 600px) {
    nav.center > a {
        font-size: 0;
    }
}

div.topnav {
    position: relative;
    overflow: hidden;
    background-color: var(--color-background-soft);
    margin-bottom: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 1rem 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:nth-last-child(1) {
    border-right: 1px solid var(--color-border);
}

div.right {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
}

div.logo > span {
    color: #83b4f0;
    padding: 1rem 1rem 1rem 2.5rem;
}
</style>