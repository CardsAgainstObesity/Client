import { createRouter, createWebHistory } from "vue-router";
import PathNotFound from "@/views/PathNotFound.vue";
import IndexView from "@/views/IndexView.vue";
import LobbyView from "@/views/game/LobbyView.vue";
import ChooseView from "@/views/game/ChooseView.vue";
import VoteView from "@/views/game/VoteView.vue";
import RulesView from "@/views/RulesView.vue";
import SettingsView from "@/views/SettingsView.vue";
import AboutView from "@/views/AboutView.vue";

let router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "index",
            meta: {
                code: "nav_index",
            },
            component: IndexView,
            props: true,
        },
        {
            path: "/game/:id",
            name: "lobby",
            meta: {
                code: "nav_game",
                game_code: "game_state_lobby",
            },
            component: LobbyView,
        },
        {
            path: "/game/:id",
            name: "choosing",
            meta: {
                code: "nav_game",
                game_code: "game_state_choosing",
            },
            component: ChooseView,
        },
        {
            path: "/game/:id",
            name: "voting",
            meta: {
                code: "nav_game",
                game_code: "game_state_voting",
            },
            component: VoteView,
        },
        {
            path: "/rules",
            name: "rules",
            meta: {
                code: "nav_rules",
            },
            component: RulesView,
        },
        {
            path: "/settings",
            name: "settings",
            meta: {
                code: "nav_settings",
            },
            component: SettingsView,
        },
        {
            path: "/about",
            name: "about",
            meta: {
                code: "nav_about",
            },
            component: AboutView,
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
