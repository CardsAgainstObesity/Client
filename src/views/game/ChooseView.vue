<script setup>
import Card from "@/components/Card.vue";
import WSConnection from "@/services/ws.mjs";
import Nav from "@/components/Nav.vue";
import { PlayerStore, RoomStore } from "@/stores/storeManager.mjs";
import { game } from "@/services/cards.mjs";

game.state = "choose";
const debug_black_card = {
  es: "Así es, yo maté a ___. ¿Que cómo lo hice? ___.",
  en: "I killed ___, indeed. How did I do it? ___.",
};
const roomStore = RoomStore.instance;
const playerStore = PlayerStore.instance;
</script>

<template>
  <div>
    <Nav />
    <div id="root" class="left_padding">
      <h1 class="noselect">
        {{ roomStore.czar.name }} {{ $display.text("game_current_czar") }}
      </h1>
      <div class="container left">
        <Card
          :text="roomStore.blackCard.text"
          :dark="true"
          :clickable="false"
        />
        <button @click="resetCards()" class="btn">RESET</button>
        <button @click="imReady()" class="btn">READY</button>
        <div class="break" />
        <Card
          @click="selectCard(card.id)"
          v-for="card in playerStore.deck"
          :text="card.text"
          :dark="false"
          :clickable="true"
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
    // TODO: Mirar
    WSConnection.socket.on("RoomStartVoting", () => {
      this.$router.replace({
        name: "vote",
        params: { id: RoomStore.instance.roomId },
      });
    });
  },
};

function resetCards() {
  for (let input of document.querySelectorAll(".card_input")) {
    input.innerHTML = "[...]";
  }
  game.card_index = 0;
  game.clearCardValues();
  PlayerStore.instance.selected.clear();
  imReady();
}

function imReady() {
  if (!PlayerStore.instance.ready) WSConnection.playerIsReady();
  else WSConnection.playerIsNotReady();
}

function selectCard(card_id) {
  if (PlayerStore.instance.selected.size < RoomStore.instance.blackCard.slots) {
    PlayerStore.instance.selected.add(card_id);
  }
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