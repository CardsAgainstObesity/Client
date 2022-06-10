<script>
import { mdiAccount, mdiCrown } from '@mdi/js';
import { PlayerStore, RoomStore } from '@/services/vueBridge.mjs';
import WSConnection from "@/services/ws.mjs";

export default {
    props: {
        player: {
            type: Object,
            required: true,
        },
	},
    data(){
        return {
            WSConnection, mdiAccount, mdiCrown, PlayerStore, RoomStore,
            name: this.player.name,
        }
    },
    methods: {
        changeName(){
            WSConnection.changeName(this.name);
        }
    },
    computed: {
        czar(){
            return this.player.id === RoomStore.instance.czar.id;
        },
        editable(){
            return this.player.id === PlayerStore.instance.playerId;
        }
    },
}
</script>

<template>
    <div class="player">
        <Icon :path="mdiCrown" v-if="czar" />
        <Icon :path="mdiAccount" v-else />
        <input v-if="editable" type="text" style="padding: 0;" v-model="name" @keyup.enter="changeName" @blur="changeName">
        <span v-else style="margin-left: 0;">{{player.name}}</span>
    </div>
</template>

<style scoped>
svg, span {
    color: var(--color-ui-text);
}
</style>