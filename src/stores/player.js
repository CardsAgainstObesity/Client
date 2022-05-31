import { defineStore } from 'pinia';

export const usePlayerStore = defineStore({
	id: 'player',
	state: () => ({
		deck: [],
		selected: new Set(),
		name: "",
		playerId: "",
		obesity: -1,
		ready: false,
		isCzar: false,
		cards: [],
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
		},
		appendCardValue(card_value){
			this.cards.push(card_value);
		},
		getCardValue(index){
			return this.cards[index];
		},
		clearCardValues(){
			this.cards = [];
		}
	}
});
