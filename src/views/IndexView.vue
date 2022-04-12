<script setup>
import Nav from "@/components/Nav.vue";
import Toast from "@/components/Toast.vue";
import WSConnection from "@/services/ws.mjs";
import Room from "../services/Room.mjs";
import ToastTransition from '@/components/transitions/ToastTransition.vue'
</script>

<template>
  <div>
    <Nav :hidelogo="true" />
    <ToastTransition>
      <Toast v-if="showToast" :text="toastText" type="error" />
    </ToastTransition>
    <div class="centered">
      <main>
        <div class="logo noselect">
          <img src="/icons/logo.svg" />
          <span>Cartas Contra la Obesidad</span>
        </div>
        <input type="text" id="username" placeholder="Tu nombre" maxlength="25" />
        <input type="text" id="roomId" placeholder="Codigo de sala" maxlength="10" v-model="roomId" />
        <br />
        <button @click="connect">Unirse</button>
        <button @click="create">Crea una nueva partida</button>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexView",
  data() {
    return {
      showToast: false,
      nTimeoutId: undefined,
      toastText: "ERROR",
      roomId: ""
    }
  },
  watch: {
    roomId(roomId) {
      this.roomId = roomId.replace(" ", "");
    }
  },
  mounted() {
    WSConnection.socket.on("error", (err) => {
      this.toast(err);
    });
    WSConnection.socket.on("RoomConnectionSuccess", (room) => {
      Room.roomId = room.roomId; // Si esto no se pone el valor de Room.roomId es "undefined".
      this.$router.replace({ name: "lobby", params: { id: Room.roomId } });
    });
    WSConnection.socket.on("RoomCreationSuccess", (room) => {
      Room.roomId = room.roomId; // Si esto no se pone el valor de Room.roomId es "undefined".
      this.$router.replace({ name: "lobby", params: { id: Room.roomId } });
    });
  },
  methods: {
    connect() {
      const roomId = document.getElementById("roomId").value;
      const username = document.getElementById("username").value;
      WSConnection.changeName(username);
      WSConnection.joinRoom(roomId);
    },
    create() {
      const roomId = document.getElementById("roomId").value;
      const username = document.getElementById("username").value;
      WSConnection.changeName(username);
      WSConnection.createRoom(roomId);
    },
    toast(text) {
      if (!this.nTimeoutId) {
        this.toastText = text;
        this.showToast = true;
        console.log("Comienzo timeout");
        this.nTimeoutId = setTimeout(() => {
          console.log("Fin timeout");
          this.showToast = false;
          this.nTimeoutId = undefined;
        }, 2500);
      }
    },
  },
};
</script>

<style scoped>
main > div.logo {
  flex-wrap: wrap;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

main > div.logo > img {
  width: 20%;
}

main > div.logo > span {
  font-size: 150%;
  white-space: nowrap;
  color: #5E81AC;
  font-weight: bold;
}

.centered {
  margin: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  padding: 5rem 2rem;
  background-color: #222222;
  border-radius: 1rem;
  text-align: center;
  max-width: 50vh;
}

@media only screen and (max-height: 600px) {
  main > div.logo {
    display: none;
  }

  .centered {
    top: 15%;
    left: 10%;
    right: 10%;
    -ms-transform: none;
    transform: none;
    max-width: 100vw;
  }
}

button,
input[type="text"] {
  margin-bottom: 0.5rem;
  max-width: 50vw;
  background-color: #181818;
  font-size: 1rem;
  width: 100%;
}

input[type="text"]:focus,
button:hover {
  background-color: #83b4f0 !important;
  color: #181818;
}

input[type="text"] {
  min-width: 200px;
}
</style>