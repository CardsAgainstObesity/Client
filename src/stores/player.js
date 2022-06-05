import { defineStore } from 'pinia';
import { RoomStore } from "@/services/vueBridge.mjs";

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
		cards: new Set(),
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
			if (this.cards.has(card_value)){
				this.cards.delete(card_value);
			} else {
				if (this.cards.size < RoomStore.instance.blackCard.slots) {
                    this.cards.add(card_value);
                }
			}
		},
		getCardValue(index){
			return [...this.cards][index];
		},
		cardIsSelected(id){
			return this.selected.has(id);
		},
		clearCardValues(){
			this.cards.clear();
		}
	},
	getters: {
		isRoundWinner(){
			if (RoomStore.instance.roundWinner === undefined) return false;
			return RoomStore.instance.roundWinner.id === this.playerId;
		}
	}
});
