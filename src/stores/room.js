import { defineStore } from "pinia";
import { PlayerStore } from "@/services/vueBridge.mjs";

export const useRoomStore = defineStore({
	id: "room",
	state: () => ({
		cardpacks: [],
		roomId: "",
		czar: undefined,
		status: "",
		blackCard: {},
		players: new Map(),
		votingFor: [],
		roundWinner: undefined,
		gameFinished: false,
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
			if (player.id == PlayerStore.instance.playerId) {
				PlayerStore.instance.isCzar = true;
			} else {
				PlayerStore.instance.isCzar = false;
			}
			this.czar = player;
		},
		changeStatus(status) {
			this.status = status;
		},
		isRoundWinner(player_id){
			if (this.roundWinner === undefined) return false;
			return this.roundWinner.id === player_id
		},
		setReady(player){
			const selected_player = this.players.get(player.id);
			if (selected_player){ // If player exists
				selected_player.ready = player.ready;
			}
		},
		async getCardPacks(){
			const response = await fetch(`https://${window.location.hostname}/api/cardpacks`);
			const json = await response.json();
			this.cardpacks = json.data;
		},
		setPlayerObesity(player){
			const selected_player = this.players.get(player.id);
			if (selected_player) { // If player exists
				selected_player.obesity = player.obesity;
			}
		},
		// TODO: Abstraer setReady y setPlayerObesity en una sola función
	},
	getters: {
		flippedCards() {
			return this.votingFor.filter(selection => selection.flipped === true);
		},
		allCardsFlipped() {
			const flippedCards = this.flippedCards;
			return flippedCards.length == this.votingFor.length;
		},
		randomVotingFor(){
			let votingFor = Object.assign(this.votingFor);
			return votingFor.sort((a, b) => 0.5 - Math.random());
		},
		playerArray(){
			return [...this.players.values()];
		},
		allPlayersExceptCzar(){
			return this.playerArray.filter(player => player.id !== this.czar.id);
		},
		countReadyPlayers(){
			let count = 0;
			this.players.forEach((player) => {
				if (player.ready) count++;
			});
			return count;
		}
	},
});
