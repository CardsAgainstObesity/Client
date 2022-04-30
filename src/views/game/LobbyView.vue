<script setup>
import WSConnection from "@/services/ws.mjs";
import Nav from "@/components/Nav.vue";
import Playerlist from "@/components/Playerlist.vue";
import { game } from "@/services/cards.mjs";
import Room from "@/services/api/Room.mjs";
import { PlayerStore, RoomStore } from '@/services/vueBridge.mjs';

const roomStore = RoomStore.instance;
game.state = "lobby";
/*
WSConnection.socket.on("RoomConnectionSuccess", () => {
    roomStore.playerlist = Room.playersArr;
});

WSConnection.socket.on("RoomPlayerConnection", () => {
    roomStore.playerlist = Room.playersArr;
});

WSConnection.socket.on("RoomPlayerDisconnection", () => {
    roomStore.playerlist = Room.playersArr;
});
*/
</script>

<script>
export default {
    name: "LobbyView",
    data() {
        return {
            nIntervId: undefined,
        };
    },
    mounted() {
        if (RoomStore.instance.roomId == "")
            this.$router.replace({
                name: "index",
                params: { roomId: this.$route.params.id },
            });
        // WSConnection.socket.on("RoomStart", () => {
        //     this.$router.replace({
        //         name: "choose",
        //         params: { id: RoomStore.instance.roomId },
        //     });
        // });
    },
    methods: {
        toggleCardPack(checked, id) {
            console.log(checked, "toggleCardPack:", id);
            if (checked) {
                console.info("Requested to add card pack:", id);
                WSConnection.addCardPack(id);
            } else {
                console.info("Requested to remove card pack:", id);
                WSConnection.removeCardPack(id);
            }
        },
        startGame() {
            console.info("Requested to start game");
            WSConnection.startRoom();
        },
    },
};
</script>

<template>
    <div>
        <Nav />
        <div style="float: left; width: 45%" class="left_padding">
            <main>
                <h1>{{ $display.text("game_players_lobby") }}</h1>
                <Playerlist :list="roomStore.players.values()" :lobby="true" />
            </main>
        </div>
        <div style="float: right; width: 45%" class="right_padding">
            <main>
                <!-- TODO: Meter en un componente esto y hacer que sea responsive de nuevo. -->
                <h1 style="direction: rtl">game_card_packs</h1>
                <ul>
                    <!-- TODO: Deprecar el <input> nativo cuando se asegure plena compatibilidad del componente custom. -->
                    <li>
                        <input
                            @click="
                                toggleCardPack($event.target.checked, 'base')
                            "
                            type="checkbox"
                        /><span>Base</span>
                    </li>
                    <li>
                        <Checkbox
                            id="base_card_pack"
                            @checked="toggleCardPack($event, 'base')"
                        />
                        <label for="base_card_pack">Base</label>
                    </li>
                </ul>
            </main>
        </div>
        <button @click="startGame">game_start_game_button</button>
    </div>
</template>
