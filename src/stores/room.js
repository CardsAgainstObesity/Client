import { defineStore } from "pinia";
import { PlayerStore } from "@/services/vueBridge.mjs";

export const useRoomStore = defineStore({
	id: "room",
	state: () => ({
		roomId: "",
		czar: undefined,
		status: "",
		blackCard: {
			text: {
				es: "Así es, yo maté a ___. ¿Que cómo lo hice? ___.",
				en: "I killed ___, indeed. How did I do it? ___.",
			},
		},
		players: new Map(),
		votingFor: [],
		roundWinner: undefined,
	}),
	actions: {
		setBlackCard(bCard) {
			this.blackCard = bCard;
		},
		addPlayer(player) {
			this.players.set(player.id, player);
		},
		removePlayer(player) {
			this.players.delete(player.id);
		},
		setCzar(player) {
			if (player.id == PlayerStore.instance.id) {
				PlayerStore.instance.isCzar = true;
			} else {
				PlayerStore.instance.isCzar = false;
			}
			this.czar = player;
		},
		changeStatus(status) {
			this.status = status;
		},
	},
	getters: {
		flippedCards() {
			return this.votingFor.filter(selection => selection.flipped === true);
		},
		allCardsFlipped() {
			const flippedCards = this.flippedCards;
			return flippedCards.length == this.votingFor.length;
		},
	},
});
