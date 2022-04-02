<script setup>
import { RouterLink } from 'vue-router';
import { game } from '@/services/cards.mjs';
import Room from '../services/Room.mjs';
import { ackree } from '@/services/ackree.mjs'
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
            <nav class="left">
                <RouterLink v-if="Room.roomId == ''" to="/">Inicio</RouterLink>
                <RouterLink v-if="Room.roomId != ''" :to="{ name: game.state, params: { id: (Room.roomId == '' ? 'DEBUG':Room.roomId) } }">Partida</RouterLink>
                <RouterLink to="/rules">Reglas</RouterLink>
                <RouterLink to="/about">Acerca de</RouterLink>
            </nav>
            <div class="right logo">
                <span>Cartas Contra la Obesidad</span>
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

div.right {
    display: flex;
}

div.logo > span {
    color: #83b4f0;
    padding: 1rem 1rem 1rem 2.5rem;
}
</style>