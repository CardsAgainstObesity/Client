<script setup>
import Card from "@/components/Card.vue";
import WSConnection from "@/services/ws.mjs";
import { game } from "@/services/cards.mjs"; // Deprecar
</script>

<template>
    <div>
        <div id="root" class="left_padding">
            <h1 class="noselect">
                <span v-if="$player.isCzar">
                    {{ $display.text("game_current_czar_you") }}
                </span>
                <span v-else>
                    {{ $room.czar.name }} {{ $display.text("game_current_czar_other") }}
                </span>
            </h1>
            <div class="container left">
                <Card
                    :text="$room.blackCard.text"
                    :dark="true"
                    :clickable="false"
                    :active="true"
                />
                <div class="newline" v-if="$player.isCzar">
                    <p>(LOCALE) No puedes elegir cartas esta ronda</p>
                </div>
                <div class="newline" v-else>
                    <button @click="resetCards" :class="'btn ' + ((!$player.ready && $player.selected.size < 1) ? 'active':'')">RESET</button>
                    <button @click="imReady" :class="'btn ' + (($player.ready || $player.selected.size < 1) ? 'active':'')">READY</button>
                </div>
                <div class="break" />
                <Card
                    @click="selectCard(card.id)"
                    v-for="card in $player.deck"
                    :text="card.text"
                    :dark="false"
                    :clickable="true"
                    :active="$room.czar.id !== $player.playerId"
                    :key="card"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ChooseView",
    mounted() {
        if (game.card_index != 0) {
            document.querySelectorAll(".card_input").forEach((card, key) => {
                card.innerHTML =
                    game.getCardValue(key) == undefined
                        ? "[...]"
                        : game
                              .getCardValue(key)
                              [this.$display.language].replaceAll(".", "");
            });
        }
    },
    methods: {
        toggleReady() {
            if (this.$player.ready) {
                this.resetCards();
            } else {
                this.imReady();
            }
        },

        resetCards() {
            for (let input of document.querySelectorAll(".card_input")) {
                input.innerHTML = "[...]";
            }
            game.card_index = 0;
            game.clearCardValues();
            this.$player.selected.clear();
            if (this.$player.ready) WSConnection.playerIsNotReady();
        },

        imReady() {
            if (!this.$player.ready) WSConnection.playerIsReady();
            else WSConnection.playerIsNotReady();
        },

        selectCard(card_id) {
            if (this.$player.selected.size < this.$room.blackCard.slots) {
                this.$player.selected.add(card_id);
            }
        },

        startVoting(){
            WSConnection.startVoting();
        },
    },
};
</script>

<style>
@import "@/assets/card.css";
</style>

<style scoped>
button.btn.active {
    background-color: #83b4f0;
    color: #222222;
}
</style>