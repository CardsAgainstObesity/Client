<script setup>
import Card from "@/components/Card.vue";
import Nav from "@/components/Nav.vue";
import Room from "@/services/api/Room.mjs";
import { cards, game, czar } from "@/services/cards.mjs";
import { PlayerStore, RoomStore } from '@/stores/storeManager.mjs';

game.state = "vote";
const debug_black_card = {
    es: "Así es, yo maté a ___. ¿Que cómo lo hice? ___.",
    en: "I killed ___, indeed. How did I do it? ___."
}
</script>

<template>
    <div>
        <Nav/>
        <h1 class="left_padding noselect">{{ RoomStore.instance.czar.name }} {{$display.text("game_current_czar")}}</h1>
        <div class="container">
            <Card :text="RoomStore.instance.blackCard.text" :dark="true" :clickable="false" />
            <div class="break" />

            <div v-for="selection in RoomStore.instance.votingFor" :key="selection">
                <span>{{selection.player_id}}</span>
                <Card v-for="card in selection.cards" :text="card.text" :dark="card.dark" :clickable="true" :key="card" />
            </div>
        </div>
    </div>
</template>

<style>
@import "@/assets/card.css";

.container.left {
    justify-content: left !important;
}
</style>