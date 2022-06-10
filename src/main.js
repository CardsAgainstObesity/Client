import { createApp } from 'vue';
// Stores
import { createPinia } from 'pinia'
import { useDisplayStore } from '@/stores/display';
import { useRoomStore } from '@/stores/room';
import { usePlayerStore } from '@/stores/player';
import { useConfigStore } from '@/stores/config';
import * as vueBridge from '@/services/vueBridge.mjs';

// Vue
import App from './App.vue';
import router from './router';

// WS
import WSConnection from './services/ws.mjs';

// Components
import Checkbox from "@/components/Checkbox.vue";
import Icon from '@/components/Icon.vue';
import Toast, { useToast } from "vue-toastification";

// CSS
import "vue-toastification/dist/index.css";
import "@/assets/base.css";

WSConnection.connect();

const app = createApp(App);
app.use(createPinia())
app.use(router);

// Stores
const displayStore = useDisplayStore();
const roomStore = useRoomStore();
const playerStore = usePlayerStore();
const configStore = useConfigStore();

// Vue -> JS
app.config.globalProperties.$display = displayStore;
window.$displayStore = displayStore; // DEBUG

app.config.globalProperties.$room = roomStore;
window.$roomStore = roomStore; // DEBUG
vueBridge.RoomStore.instance = roomStore;

app.config.globalProperties.$player = playerStore;
window.$playerStore = playerStore; // DEBUG
vueBridge.PlayerStore.instance = playerStore;

app.config.globalProperties.$config = configStore;
vueBridge.ConfigStore.instance = configStore;
window.$configStore = configStore; // DEBUG

window.$vueRouter = router; // DEBUG


app.component("Icon", Icon);
app.component("Checkbox", Checkbox);

app.directive('emoji', {
    inserted (el) {
        el.innerHTML = twemoji.parse(el.innerHTML)
    }
});

// Vue-Toastification

const filterBeforeCreate = (toast, toasts) => {
    if (toasts.filter(t => t.content.props.displayCode === toast.content.props.displayCode).length !== 0) {
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
window.$vueToast = useToast(); // DEBUG

// Init Audio array
for(let index = 1; index <= 6; index++){
    configStore.audio_array[index] = {
        name: `card_flip_${index}`,
    }
}

// Init css variables
for (const css_color of configStore.css_colors){
    if (localStorage.getItem(css_color.code)) configStore.set_property(css_color.code, localStorage.getItem(css_color.code)) // Recover data from localStorage if it exists.
    else css_color.value = configStore.get_computed_style(css_color.code); // Otherwise just use the default theme.
}

// Mount

app.mount('#app');

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

window.$WSConnection = WSConnection; // DEBUG


console.log(
    "%cHey there!%c\n\nCards Against Obesity is Open Source!\nIf you found an issue or want to improve any aspect of the project, please contribute to it!\n🤝 https://gitlab.com/cardsagainstobesity",
    "color:#83B4F0;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold", "font-size:1.25rem;"
);
