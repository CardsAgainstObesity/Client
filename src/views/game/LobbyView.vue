<script setup>
import WSConnection from "@/services/ws.mjs";
import Nav from "@/components/Nav.vue";
import Playerlist from "@/components/Playerlist.vue";
import { game } from "@/services/cards.mjs";
import Room from "@/services/api/Room.mjs";
import { useRoomStore } from "@/stores/room";

const roomStore = useRoomStore();
game.state = "lobby";

WSConnection.socket.on("RoomConnectionSuccess", () => {
    roomStore.playerlist = Room.playersArr;
});

WSConnection.socket.on("RoomPlayerConnection", () => {
    roomStore.playerlist = Room.playersArr;
});

WSConnection.socket.on("RoomPlayerDisconnection", () => {
    roomStore.playerlist = Room.playersArr;
});
</script>

<script>
export default {
    name: "LobbyView",
    data() {
        return {
            playerlist: [],
            nIntervId: undefined,
        };
    },
    mounted() {
        if (Room.roomId == "")
            this.$router.replace({
                name: "index",
                params: { roomId: this.$route.params.id },
            });
		WSConnection.socket.on("RoomStart", () => {
		this.$router.replace({
			name: "choose",
			params: { id: Room.roomId },
		});
});
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
		}
	}
};
</script>

<template>
    <div>
        <Nav />
        <div style="float: left; width: 45%;" class="left_padding">
            <main>
                <h1>{{ $display.text("game_players_lobby") }}</h1>
                <Playerlist :list="roomStore.playerlist" :lobby="true" />
            </main>
        </div>
        <div style="float: right; width: 45%;" class="right_padding">
			<main>
				<!-- TODO: Meter en un componente esto y hacer que sea responsive de nuevo. -->
				<h1 style="direction: rtl;">game_card_packs</h1>
				<ul>
					<li><input @click="toggleCardPack($event.target.checked, 'base')" type="checkbox"><span>Base</span></li>
				</ul>
			</main>
		</div>
		<button @click="startGame">game_start_game_button</button>
    </div>
</template>
