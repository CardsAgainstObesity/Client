<script>
import Player from "@/components/Player.vue";

export default {
    components: {
        Player,
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
    },
};
</script>

<template>
    <ul class="playerlist">
        <li
            v-for="player in list"
            :key="player.id"
            :class="{
                ready: player.ready && !lobby && player.id !== $room.czar.id,
                unready: !player.ready && !lobby && player.id !== $room.czar.id,
            }"
        >
            <Player :player="player"/>
        </li>
    </ul>
</template>

<style scoped>
li.ready {
    border: 2px solid var(--color-primary) !important;
}

li.unready {
    opacity: 50% !important;
}

ul.playerlist {
    list-style-type: none;
    padding-left: 0;
    overflow-y: auto;
    overflow-x: hidden;
    max-width: 100%;
    max-height: calc( 100vh - 40vh );
}

ul.playerlist > li {
    margin-left: auto;
    margin-right: auto;
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    min-width: 200px;
    max-width: 95%;
    background-color: var(--color-secondary);
    transition: background-color 0.5s, transform 0.5s;
}

ul.playerlist > li:hover {
    color: var(--color-secondary);
    transform: scale(1.025);
}

@keyframes bounceItem {
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
    animation: 1s ease-out 0s 1 bounceItem;
}

</style>
