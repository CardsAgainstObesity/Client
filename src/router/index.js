import { createRouter, createWebHistory } from "vue-router";
import PathNotFound from "../views/PathNotFound.vue";

let router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "index",
            meta: {
                code: "nav_index",
            },
            component: () => import('../views/IndexView.vue'),
            props: true,
        },
        {
            path: "/game/:id",
            name: "lobby",
            meta: {
                code: "nav_game",
                game_code: "game_state_lobby",
            },
            component: () => import('../views/game/LobbyView.vue'),
        },
        {
            path: "/game/:id",
            name: "choosing",
            meta: {
                code: "nav_game",
                game_code: "game_state_choosing",
            },
            component: () => import('../views/game/ChooseView.vue'),
        },
        {
            path: "/game/:id",
            name: "voting",
            meta: {
                code: "nav_game",
                game_code: "game_state_voting",
            },
            component: () => import('../views/game/VoteView.vue'),
        },
        {
            path: "/rules",
            name: "rules",
            meta: {
                code: "nav_rules",
            },
            component: () => import('../views/RulesView.vue'),
        },
        {
            path: "/settings",
            name: "settings",
            meta: {
                code: "nav_settings",
            },
            component: () => import('../views/SettingsView.vue'),
        },
        {
            path: "/about",
            name: "about",
            meta: {
                code: "nav_about",
            },
            component: () => import('../views/AboutView.vue'),
        },
        { // DEBUG
            path: '/test',
            name: 'test',
            meta: {
                code: "error",
            },
            component: () => import('../views/TestView.vue'),
        },
        {
            path: "/:pathMatch(.*)*",
            name: "error404",
            meta: {
                code: "error",
            },
            component: PathNotFound,
        },
    ],
});

export default router;
