import { defineStore } from 'pinia';
import { PlayerStore } from '@/stores/storeManager.mjs';

export const useRoomStore = defineStore({
  id: 'room',
  state: () => ({
    roomId:"",
    czar: undefined,
    status:"",
    playerId: "",
    blackCard: {
      text: {
        es: "Así es, yo maté a ___. ¿Que cómo lo hice? ___.",
        en: "I killed ___, indeed. How did I do it? ___."
      }
    },
    players: new Map(),
    votingFor: []
  }),
  actions: {
    setBlackCard(bCard) {
      this.blackCard = bCard;
    },
    addPlayer(player) {
      //this.events.emit("PlayerAdded", player);
      //this.events.emit("PlayerListUpdated");
      this.players.set(player.id, player);
    },
    removePlayer(player) {
      //this.events.emit("PlayerRemoved", player);
      //this.events.emit("PlayerListUpdated");
      this.players.delete(player.id);
    },
    setCzar(player) {
      //this.events.emit("CzarChanged", player);
      //this.events.emit("PlayerListUpdated");
      if(player.id == PlayerStore.instance.id) {
        PlayerStore.instance.isCzar = true;
      } else {
        PlayerStore.instance.isCzar = false;
      }
      this.czar = player;
    },
    changeStatus(status) {
      this.status = status;
    }

  }
});
