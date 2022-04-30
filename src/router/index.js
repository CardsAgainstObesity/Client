import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import RulesView from "../views/RulesView.vue";
import LobbyView from "../views/game/LobbyView.vue";
import ChooseView from "../views/game/ChooseView.vue";
import VoteView from "../views/game/VoteView.vue";
import SettingsView from "../views/SettingsView.vue";
import AboutView from "../views/AboutView.vue";
import PathNotFound from "../views/PathNotFound.vue";

let router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "index",
            component: IndexView,
            props: true,
        },
        {
            path: "/game/:id",
            name: "lobby",
            component: LobbyView,
        },
        {
            path: "/game/:id",
            name: "choosing",
            component: ChooseView,
        },
        {
            path: "/game/:id",
            name: "voting",
            component: VoteView,
        },
        {
            path: "/rules",
            name: "rules",
            component: RulesView,
        },
        {
            path: "/settings",
            name: "settings",
            component: SettingsView,
        },
        {
            path: "/about",
            name: "about",
            component: AboutView,
        },
        // ,
        // {
        //     path: '/about',
        //     name: 'about',
        //     // route level code-splitting
        //     // this generates a separate chunk (About.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () =>
        //         import ('../views/AboutView.vue')
        // }
        {
            path: "/:pathMatch(.*)*",
            component: PathNotFound,
        },
    ],
});

export default router;
