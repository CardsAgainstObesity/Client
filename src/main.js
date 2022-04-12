import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import WSConnection from './services/ws.mjs';

WSConnection.connect();

const app = createApp(App);
app.use(createPinia())
app.use(router);
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

setTimeout(() => {
    console.log(
        "%cHey there!%c\n\nCards Against Obesity is Open Source!\nIf you found an issue or want to improve any aspect of the project, please contribute to it!\n🤝 https://gitlab.com/cardsagainstobesity",
        "color:#83B4F0;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold","font-size:1.25rem;"
    );
}, 500);