import { defineStore } from 'pinia';

export const useRoomStore = defineStore({
  id: 'room',
  state: () => ({
    playerlist: [],
    blackCard: {
      text: {
        es: "Así es, yo maté a ___. ¿Que cómo lo hice? ___.",
        en: "I killed ___, indeed. How did I do it? ___."
      }
    }
  })
});
