import { createApp } from 'vue'

import { createPinia } from 'pinia'
import { useDisplayStore } from '@/stores/display';
import { useRoomStore } from './stores/room';
import { usePlayerStore } from './stores/player';
import * as StoreManager from './stores/storeManager.mjs';

import App from './App.vue';
import router from './router';

import WSConnection from './services/ws.mjs';

import Player from './services/api/Player.mjs';
import Room from './services/api/Room.mjs';

import Checkbox from "@/components/Checkbox.vue";
import Icon from '@/components/Icon.vue';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

WSConnection.connect();

const app = createApp(App);
app.use(createPinia())
app.use(router);

// Stores
const displayStore = useDisplayStore();
const roomStore = useRoomStore();
const playerStore = usePlayerStore();

// 
app.config.globalProperties.$display = displayStore;
window.$display = displayStore; // DEBUG

app.config.globalProperties.$room = roomStore;
window.$room = roomStore; // DEBUG
StoreManager.RoomStore.instance = roomStore;

app.config.globalProperties.$player = playerStore;
// window.$player = playerStore; // DEBUG
StoreManager.PlayerStore.instance = playerStore;

app.component("Icon", Icon);
app.component("Checkbox", Checkbox);

// Vue-Toastification

const filterBeforeCreate = (toast, toasts) => {
    console.log("TOAST:", toast);
    if (toasts.filter(t => t.content === toast.content).length !== 0) {
        // Returning false discards the toast
        return false;
    }
    // You can modify the toast if you want
    return toast;
}

const ToastOptions = {
    position: "bottom-right",
    pauseOnFocusLoss: false,
    maxToasts: 5,
    newestOnTop: false,
    closeButton: false,
    closeOnClick: true,
    timeout: 5000,
    filterBeforeCreate,
};

app.use(Toast, ToastOptions);

// Mount

app.mount('#app');

/* // Disable PWA for now.
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registered!');
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        }).catch(function (err) {
            console.log(err);
        });
    });
} else {
    console.log('ServiceWorker is not supported');
}
*/

window.debug = { // DEBUG
    addCardPack(cardpack_id) {
        WSConnection.addCardPack(cardpack_id);
    },
    removeCardPack(cardpack_id) {
        WSConnection.removeCardPack(cardpack_id);
    },
    startRoom() {
        WSConnection.startRoom();
    },
    showPlayer() {
        return Player;
    },
    showRoom() {
        return Room;
    }
}

window.WSConnection = WSConnection; // DEBUG

setTimeout(() => {
    console.log(
        "%cHey there!%c\n\nCards Against Obesity is Open Source!\nIf you found an issue or want to improve any aspect of the project, please contribute to it!\n🤝 https://gitlab.com/cardsagainstobesity",
        "color:#83B4F0;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold", "font-size:1.25rem;"
    );
}, 500);