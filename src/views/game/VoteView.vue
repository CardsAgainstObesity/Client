<script setup>
import Card from "@/components/Card.vue";
import WSConnection from "@/services/ws.mjs";
import { mdiCamera } from '@mdi/js';
import html2canvas from 'html2canvas';
</script>

<template>
    <div>
        <h1 class="left_padding noselect">
            {{ $room.czar.name }}
            {{ $display.text("game_current_czar") }}
            <Icon style="vertical-align: unset; cursor: pointer;" :path="mdiCamera" @click="screenshot" />
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
function screenshot() {
    html2canvas(document.querySelector("body")).then(canvas => {
        var link = document.createElement('a');
        link.download = `${$display.text("app_name").replaceAll(" ", "-")}_${new Date().toISOString().slice(0, 10)}`;
        link.href = canvas.toDataURL()
        link.click();
    });
}

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
