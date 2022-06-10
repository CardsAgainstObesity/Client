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
        finishGame(){
            WSConnection.backToLobby();
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
        <h1 class="padding noselect">
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

            <button v-if="$room.roundWinner && $player.isCzar && !$room.gameFinished" style="position: absolute; top: 350px;" @click="nextRound">
                {{ $display.text("game_next_round") }}
            </button>

            <button v-if="$room.roundWinner && $player.isCzar && $room.gameFinished" style="position: absolute; top: 350px;" @click="finishGame">
                {{ $display.text("game_finish_game") }}
            </button>

            <div class="player_card_container" :class="$room.isRoundWinner(selection.player_id) ? 'winner':''" v-for="selection in $room.randomVotingFor" :key="selection">
                <div v-if="$room.roundWinner" :set="player = $room.players.get(selection.player_id)" class="player_name">
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
        </div>
    </div>
</template>

<style scoped>
.player_card_container {
    background-color: var(--color-card-black);
    margin: 1rem;
    padding: 0.5rem 1rem 0 1rem;
    border-radius: 1rem;
}

.player_card_container > .player_name {
    text-align: center;
    color: var(--color-card-white);
    transition: 0.5s;
}

.player_card_container.winner {
    background-color: var(--color-card-white);
}

.player_card_container.winner > .player_name {
    color: var(--color-card-black);
}

</style>

<style>
.player_card_container.winner .game-card-inner {
    box-shadow: 0 4px 8px 0 #000;
}
</style>