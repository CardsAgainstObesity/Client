<script setup>
import Card from "@/components/Card.vue";
import Nav from "@/components/Nav.vue";
import Room from "@/services/Room.mjs";
import { cards, game, czar } from "@/services/cards.mjs";
game.state = "vote";
const debug_black_card = {
    es: "Así es, yo maté a ___. ¿Que cómo lo hice? ___.",
    en: "I killed ___, indeed. How did I do it? ___."
}
</script>

<template>
    <div>
        <Nav/>
        <h1 class="left_padding noselect">{{ Room.getCzar().name }} {{$display.text("game_current_czar")}}</h1>
        <div class="container">
            <Card :text="debug_black_card[$display.language]" :dark="true" :clickable="false" />
            <div class="break" />
            <Card v-for="card in cards" :text="card.text[$display.language]" :dark="card.dark" :clickable="true" :key="card" />
        </div>
    </div>
</template>

<style>
@import "@/assets/card.css";

.container.left {
    justify-content: left !important;
}
</style>