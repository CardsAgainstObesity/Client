<script setup>
import Card from "@/components/Card.vue";
import Nav from "@/components/Nav.vue";
import Room from "@/services/api/Room.mjs";
import { cards, game, czar } from "@/services/cards.mjs";
import { PlayerStore, RoomStore } from "@/stores/storeManager.mjs";
import WSConnection from "@/services/ws.mjs";

game.state = "vote";
const debug_black_card = {
    es: "Así es, yo maté a ___. ¿Que cómo lo hice? ___.",
    en: "I killed ___, indeed. How did I do it? ___.",
};
</script>

<template>
    <div>
        <Nav />
        <h1 class="left_padding noselect">
            {{ RoomStore.instance.czar.name }}
            {{ $display.text("game_current_czar") }}
        </h1>
        <div class="container">
            <Card
                :text="RoomStore.instance.blackCard.text"
                :dark="true"
                :clickable="false"
                :active="true"
            />
            <div class="break" />

            <div
                v-for="selection in RoomStore.instance.votingFor"
                :key="selection"
            >
                <span>{{ selection.player_id }}</span>
                <Card
                    v-for="card in selection.cards"
                    @click="flipCard(selection.player_id)"
                    :text="card.text"
                    :dark="card.dark"
                    :active="selection.flipped"
                    :clickable="PlayerStore.instance.isCzar ? true : false"
                    :key="card"
                />
            </div>
        </div>
    </div>
</template>

<script>
function flipCard(player_id) {
    WSConnection.socket.emit("RoomFlipCardRequest", player_id);
}
</script>

<style>
@import "@/assets/card.css";

.container.left {
    justify-content: left !important;
}
</style>
