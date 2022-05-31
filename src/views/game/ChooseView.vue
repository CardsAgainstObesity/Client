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
                />
            </div>
        </div>
    </div>
</template>

<script>
import Card from "@/components/Card.vue";
import Modal from "@/components/Modal.vue";
import WSConnection from "@/services/ws.mjs";

export default {
    name: "ChooseView",
    components: {
        Card,
        Modal,
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