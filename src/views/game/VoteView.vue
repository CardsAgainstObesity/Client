<script setup>
import Card from "@/components/Card.vue";
import WSConnection from "@/services/ws.mjs";
</script>

<template>
    <div>
        <h1 class="left_padding noselect">
            {{ $room.czar.name }}
            {{ $display.text("game_current_czar") }}
        </h1>
        <div class="container">
            <Card
                :text="$room.blackCard.text"
                :dark="true"
                :clickable="false"
                :active="true"
            />
            <div class="break" />

            <div
                v-for="selection in $room.votingFor"
                :key="selection"
            >
                <span>{{ selection.player_id }}</span>
                <Card
                    v-for="card in selection.cards"
                    @click="flipCard(selection.player_id)"
                    :text="card.text"
                    :dark="false"
                    :active="selection.flipped"
                    :clickable="$player.isCzar ? true : false"
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
