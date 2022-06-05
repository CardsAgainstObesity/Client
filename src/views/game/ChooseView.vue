<script>
import Card from "@/components/Card.vue";
import Modal from "@/components/Modal.vue";
import CzarName from "@/components/CzarName.vue";

import WSConnection from "@/services/ws.mjs";

export default {
    name: "ChooseView",
    components: {
        Card,
        Modal,
        CzarName,
    },
    data() {
        return {
            showModal: true
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
            this.$player.clearCardValues();
            this.$player.selected.clear();
            if (this.$player.ready) WSConnection.playerIsNotReady();
        },

        imReady() {
            if (!this.$player.ready) WSConnection.playerIsReady();
            else WSConnection.playerIsNotReady();
        },

        selectCard(card_id) { // TODO: Mover a una store
            if (this.$player.selected.has(card_id)){
                this.$player.selected.delete(card_id);
            } else {
                if (this.$player.selected.size < this.$room.blackCard.slots && !this.$player.isCzar) {
                    this.$player.selected.add(card_id);
                }
            }
        },

        startVoting(){
            WSConnection.startVoting();
        },
    },
};
</script>

<template>
    <div>
        <div id="root" class="left_padding">
            <h1 class="noselect">
                <CzarName />
            </h1>
            <div class="container left">
                <Card
                    :data="$room.blackCard"
                    :dark="true"
                    :clickable="false"
                    :active="true"
                />
                <div class="newline" v-if="$player.isCzar">
                    <button id="show-modal" @click="showModal = true">Show Modal</button>
                    <Teleport to="body">
                        <modal :show="showModal" @close="showModal = false">
                        <template #header>
                            <h3>(LOCALE) Eres el Zar!</h3>
                        </template>
                        <template #body>
                            <p>(LOCALE) Eso quiere decir que esta ronda no podrás elegir carta.</p>
                            <p>Cuando los demás jugadores acaben de elegir sus cartas, deberás elegir la carta ganadora.</p>
                        </template>
                        </modal>
                    </Teleport>
                </div>
                <div class="newline" v-else>
                    <button @click="resetCards" :class="'btn ' + ((!$player.ready && $player.selected.size < 1) ? 'active':'')">RESET</button>
                    <button @click="imReady" :class="'btn ' + (($player.ready || $player.selected.size < 1) ? 'active':'')">READY</button>
                </div>
                <div class="break" />
                <Card
                    @click="selectCard(card.id)"
                    v-for="card in $player.deck"
                    :data="card"
                    :dark="false"
                    :clickable="true"
                    :active="$room.czar.id !== $player.playerId"
                    :key="card"
                    :index="[...$player.selected].indexOf(card.id)+1"
                />
            </div>
        </div>
    </div>
</template>

<style>
@import "@/assets/card.css";
</style>

<style scoped>
button.btn.active {
    background-color: #83b4f0;
    color: #222222;
}
</style>