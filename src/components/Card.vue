<script setup>
import { game } from "@/services/cards.mjs";
defineProps({
  text: {
    type: Object,
    required: true
  },
  dark: {
    type: Boolean,
    required: true
  },
  clickable: {
    type: Boolean,
    required: true
  }
});
</script>

<template>
  <div @click="assignInput(text, clickable, $display.language); flip()" :class="'game-card ' + (dark ? 'dark ' : ' ') + (clickable ? 'clickable ' : ' ') + (active ? 'active ': ' ')">
    <div class="game-card-inner">
      <div class="game-card-front">
      </div>
      <div class="game-card-back">
        <p v-html="text[$display.language].replaceAll(`___`, `${chapuza}`)" class="noselect"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: this.dark === true ? true : false
    }
  },
  methods: {
    flip() { // TODO: Hacer que este metodo se active al darle click a un botón que ponga "siguiente", no al darle click a la carta.
      if (this.clickable) {
        this.active = !this.active;
      }
    }
  }
}

const chapuza = `<span class='card_input'>[...]</span>`;
function assignInput(value, clickable, language) {
    if (clickable){
        if (document.querySelectorAll('.card_input').length <= game.card_index) {
          game.card = 0;
        } else {
          document.querySelectorAll('.card_input')[game.card_index].innerHTML = value[language].replaceAll(".","");
          game.appendCardValue(value);
          game.card_index++;
        }
    }
}
</script>