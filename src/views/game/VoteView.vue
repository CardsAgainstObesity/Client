<script>
import Card from "@/components/Card.vue";
import CzarName from "@/components/CzarName.vue";

import WSConnection from "@/services/ws.mjs";

export default {
    components: {
        Card,
        CzarName,
    },
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
    },
};
</script>

<template>
    <div>
        <h1 class="left_padding noselect">
            <CzarName />
        </h1>
        <div class="container">
            <Card
                :data="$room.blackCard"
                :dark="true"
                :clickable="false"
                :active="true"
            />
            <div class="break" />

            <div style="margin: 1rem;" v-for="selection in $room.votingFor" :key="selection">
                <div :set="player = $room.players.get(selection.player_id)" style="text-align: center;">
                    {{ player === undefined ? "player_disconnected" : player.name }}
                </div>
                <Card
                    v-for="card in selection.cards"
                    @click="clickHandler(selection)"
                    :data="card"
                    :dark="false"
                    :active="selection.flipped"
                    :clickable="$player.isCzar ? true : false"
                    :key="card"
                    style="margin: 1rem auto;"
                />
            </div>
            <div class="break" />
            <button @click="nextRound" v-if="$room.roundWinner != undefined">
                {{ $display.text("game_next_round") }}
            </button>
        </div>
    </div>
</template>

<style>
@import "@/assets/card.css";
</style>
