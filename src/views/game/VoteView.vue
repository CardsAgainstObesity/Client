<script setup>
import Card from "@/components/Card.vue";
import WSConnection from "@/services/ws.mjs";
import { mdiCamera } from "@mdi/js";
import html2canvas from "html2canvas";
</script>

<template>
    <div>
        <h1 class="left_padding noselect">
            <span v-if="$room.czar.id == $player.playerId">
                {{ $display.text("game_current_czar_you") }}
            </span>
            <span v-else>
                {{ $room.czar.name }}
                {{ $display.text("game_current_czar_other") }}
            </span>
            <Icon
                style="vertical-align: unset; cursor: pointer"
                :path="mdiCamera"
                @click="screenshot"
            />
        </h1>
        <div class="container">
            <Card
                :text="$room.blackCard.text"
                :dark="true"
                :clickable="false"
                :active="true"
            />
            <div class="break" />

            <div v-for="selection in $room.votingFor" :key="selection">
                <span>{{ selection.player_id }}</span>
                <Card
                    v-for="card in selection.cards"
                    @click="clickHandler(selection)"
                    :text="card.text"
                    :dark="false"
                    :active="selection.flipped"
                    :clickable="$player.isCzar ? true : false"
                    :key="card"
                />
            </div>
            <div class="break" />
            <button @click="nextRound" v-if="$room.roundWinner != undefined">
                {{ $display.text("game_next_round") }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        nextRound(){
            WSConnection.startChoosing();
        },
        clickHandler(selection) {
            if (this.$room.roundWinner == undefined) { // If no winner has been already selected
                // Select winner if all cards are flipped.
                if (this.$room.allCardsFlipped)
                    WSConnection.selectWinner(selection.player_id);
                // Otherwise flip the selected card.
                else if (!selection.flipped)
                    WSConnection.flipCard(selection.player_id);
            }
        },
        screenshot() {
            html2canvas(document.querySelector("body")).then((canvas) => {
                var link = document.createElement("a");
                link.download = `${this.$display
                    .text("app_name")
                    .replaceAll(" ", "-")}_${new Date()
                    .toISOString()
                    .slice(0, 10)}`;
                link.href = canvas.toDataURL();
                link.click();
            });
        },
    },
};
</script>

<style>
@import "@/assets/card.css";
</style>
