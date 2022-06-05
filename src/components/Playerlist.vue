<script>
import Player from "@/components/Player.vue";

export default {
    components: {
        Player
    },
	props: {
        list: {
            type: Object,
            required: true,
        },
        lobby: {
            type: Boolean,
            required: true,
        },
	}
}
</script>

<template>
    <ul class="playerlist">
        <li v-for="player in list" :key="player.id">
            <Player :player="player" />
        </li>
    </ul>
</template>

<style scoped>
ul.playerlist {
    list-style-type: none;
    padding-left: 0;
}
ul.playerlist > li {
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    min-width: 200px;
    max-width: 50vw;
    background-color: var(--color-background-alt);
    transition: background-color 0.5s, transform 0.5s;
    overflow-x: hidden;
}

ul.playerlist > li:hover {
    background-color: var(--color-tertiary);
    color: var(--color-background-alt);
    transform: scale(1.025);
}

@keyframes slideInFromLeft {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.025);
    }
    100% {
        transform: scale(1);
    }
}

ul.playerlist > li:last-child {
    animation: 1s ease-out 0s 1 slideInFromLeft;
}

@media only screen and (max-width: 1000px) {
    ul.playerlist > li {
        max-width: 100% !important;
        /* margin-right: 2.5%; */
    }
}
</style>
