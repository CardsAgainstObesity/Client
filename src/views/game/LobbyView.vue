<script setup>
import WSConnection from "@/services/ws.mjs";
import Nav from "@/components/Nav.vue";
import Playerlist from "@/components/Playerlist.vue";
import { game } from "@/services/cards.mjs";
import Room from "@/services/api/Room.mjs";
import { useRoomStore } from '@/stores/room';

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
    if (Room.roomId == "") this.$router.replace({ name: "index", params: { roomId: this.$route.params.id } });
  }
};
</script>

<template>
  <div>
    <Nav />
    <div class="left_padding">
      <main>
        <h1>{{$display.text("game_players_lobby")}}</h1>
        <Playerlist :list="roomStore.playerlist" :lobby="true" />
      </main>
    </div>
  </div>
</template>