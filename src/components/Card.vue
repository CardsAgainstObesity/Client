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
  },
  active: {
    type: Boolean,
    required: false
  }
});
</script>

<template>
  <div @click="assignInput(text, clickable, $display.language)" :class="'game-card ' + (dark ? 'dark ' : ' ') + (clickable ? 'clickable ' : ' ') + (active ? 'active ' : ' ')">
    <div class="game-card-inner">
      <div class="game-card-front">
      </div>
      <div class="game-card-back" :style="active ? 'z-index: 0;' : 'z-index: -1;'">
        <!-- Es necesario modificar el z-index para que html2canvas imprima la imagen correctamente. -->
        <p v-html="text[$display.language].replaceAll(`___`, `${chapuza}`)" class="noselect"></p>
      </div>
    </div>
  </div>
</template>

<script>

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