<script>
import { mdiHome } from "@mdi/js";
import WSConnection from "@/services/ws.mjs";

import Logo from "@/components/Logo.vue";

export default {
    components: {
        Logo,
    },
    data() {
        return {
            WSConnection,
            mdiHome,
            roomId: this.$route.params.roomId,
        };
    },
    watch: {
        roomId(roomId) {
            this.roomId = roomId.replace(" ", "");
        },
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
    },
};
</script>

<template>
    <div>
        <div class="centered">
            <main>
                <div class="logo noselect">
                    <!-- <img src="/icons/logo.svg" /> -->
                    <Logo />
                    <span>{{ $display.text("app_name") }}</span>
                </div>
                <input
                    type="text"
                    id="username"
                    :placeholder="$display.text('index_username')"
                    maxlength="25"
                />
                <input
                    type="text"
                    id="roomId"
                    :placeholder="$display.text('index_roomid')"
                    maxlength="10"
                    v-model="roomId"
                />
                <br />
                <button @click="connect">
                    {{ $display.text("index_join_button") }}
                </button>
                <button @click="create">
                    {{ $display.text("index_create_button") }}
                </button>
            </main>
        </div>
    </div>
</template>

<style scoped>
main > div.logo {
    flex-wrap: wrap;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

main > div.logo > img,
main > div.logo > svg {
    width: 20%;
}

main > div.logo > span {
    font-size: 150%;
    white-space: nowrap;
    color: var(--color-primary);
    font-weight: bold;
}

@media only screen and (max-height: 600px) {
    main > div.logo {
        display: none;
    }
}

button,
input[type="text"] {
    margin-bottom: 0.5rem;
    max-width: 50vw;
    background-color: var(--color-background) !important;
    font-size: 1rem;
    width: 100%;
}

input[type="text"]:focus,
button:hover {
    background-color: var(--color-primary) !important;
    color: var(--color-background);
}

input[type="text"] {
    min-width: 200px;
}
</style>
