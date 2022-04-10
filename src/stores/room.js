import { defineStore } from 'pinia'

export const useRoomStore = defineStore({
  id: 'room',
  state: () => ({
    playerlist: []
  })
})
