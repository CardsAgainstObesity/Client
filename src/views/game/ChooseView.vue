<script setup>
import Card from "@/components/Card.vue";
import Nav from "@/components/Nav.vue";
import Room from "@/services/Room.mjs";
import { cards, game, czar } from "@/services/cards.mjs";
game.state = "choose";
const debug_black_card = {
    es: "Así es, yo maté a ___. ¿Que cómo lo hice? ___.",
    en: "I killed ___, indeed. How did I do it? ___."
}
</script>

<template>
    <div>
        <Nav />
        <div id="root" class="left_padding">
            <h1 class="noselect">{{ Room.getCzar().name }} {{$display.text("game_current_czar")}}</h1>
            <div class="container left">
                <Card :text="debug_black_card[$display.language]" :dark="true" :clickable="false" />
                <button @click="resetCards()" class="btn">RESET</button>
                <button class="btn">READY</button>
                <div class="break" />
                <Card v-for="card in cards" :text="card.text[$display.language]" :dark="card.dark" :clickable="true" :key="card" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "ChooseView",
  mounted() {
    if (game.card_index != 0) {
        document.querySelectorAll('.card_input').forEach((card, key) => {
            card.innerHTML = game.getCardValue(key) == undefined ? "[...]":game.getCardValue(key);
        });
    }
  }
};

function resetCards() {
    for (let input of document.querySelectorAll('.card_input')){
        input.innerHTML = "[...]";
    }
    game.card_index = 0;
    game.clearCardValues();
}
</script>


<style>
@import "@/assets/card.css";

.container.left {
    justify-content: left !important;
}

button.btn {
    margin-bottom: 24px;
    height: 2.5rem;
}
</style>