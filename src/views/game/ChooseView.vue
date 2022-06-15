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
            showCzarModal: false,
            showPlayerList: false,
        }
    },
    created(){
        const user_has_been_czar = localStorage.getItem("user_has_been_czar");
        if (user_has_been_czar !== "true") this.showCzarModal = true;
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
            if (this.$player.selected.has(card_id)){
                this.$player.selected.delete(card_id);
                if (this.$player.ready) WSConnection.playerIsNotReady();
            } else {
                if (this.$player.selected.size < this.$room.blackCard.slots && !this.$player.isCzar) {
                    this.$player.selected.add(card_id);
                }
            }
        },

        startVoting(){
            WSConnection.startVoting();
        },

        closeModal(){
            this.showCzarModal = false;
            localStorage.setItem("user_has_been_czar", true);
        }
    },
};
</script>

<template>
    <div>
        <div id="root" class="padding">
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
                <Card
                    @click="showPlayerList = true"
                    style="font-size: 2rem;"
                    :data="{ text: { en: $room.countReadyPlayers + '/' + $room.allPlayersExceptCzar.length } }"
                    :dark="false"
                    :clickable="true"
                    :active="true"
                    :index="0"
                />
                <Teleport to="body">
                    <modal :show="showPlayerList" @close="showPlayerList = false">
                    <template #header>
                        <h3>game_choosing_players_ready</h3>
                    </template>
                    <template #body>
                        <ul>
                            <li v-for="player in $room.players.values()" :key="player">
                                <input type="checkbox" disabled :checked="player.ready" style="margin-right: 0.5rem;" />
                                <span>{{ player.name }}</span>
                            </li>
                        </ul>
                    </template>
                    </modal>
                </Teleport>
                <div class="newline" v-if="$player.isCzar">
                    <button class="btn" @click="showCzarModal = true">Show Modal</button>
                    <Teleport to="body">
                        <modal :show="showCzarModal" @close="closeModal">
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

<style scoped>
button.btn.active {
    background-color: var(--color-primary);
    color: var(--color-secondary);
}
</style>