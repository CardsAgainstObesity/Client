import { defineStore } from 'pinia';

export const usePlayerStore = defineStore({
  id: 'player',
  state: () => ({
    deck: [],
    selected: new Set(),
    name:"",
    obesity:-1,
    ready: false
  }),
  actions: {
    setName(name) {
      this.name = name;
    },
    updateDeck(deck) {
      this.deck = deck;
    },
    setObesity(obesity) {
      this.obesity = obesity;
    },
    setReady(status) {
      this.ready = status;
    }
  }
});
