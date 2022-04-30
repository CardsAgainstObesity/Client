<script setup>
import WSConnection from "@/services/ws.mjs";
import Playerlist from "@/components/Playerlist.vue";
</script>

<script>
export default {
    name: "LobbyView",
    mounted() {
        if (this.$room.roomId == "")
            this.$router.replace({
                name: "index",
                params: { roomId: this.$route.params.id },
            });
    },
    methods: {
        toggleCardPack(checked, id) {
            console.log(checked, "toggleCardPack:", id);
            if (checked) {
                console.info("Requested to add card pack:", id);
                WSConnection.addCardPack(id);
            } else {
                console.info("Requested to remove card pack:", id);
                WSConnection.removeCardPack(id);
            }
        },
        startGame() {
            console.info("Requested to start game");
            WSConnection.startRoom();
        },
    },
};
</script>

<template>
    <div>
        <div style="float: left; width: 45%" class="left_padding">
            <main>
                <h1>{{ $display.text("game_players_lobby") }}</h1>
                <Playerlist :list="$room.players.values()" :lobby="true" />
            </main>
        </div>
        <div style="float: right; width: 45%" class="right_padding">
            <main>
                <!-- TODO: Meter en un componente esto y hacer que sea responsive de nuevo. -->
                <h1 style="direction: rtl">game_card_packs</h1>
                <ul>
                    <!-- TODO: Deprecar el <input> nativo cuando se asegure plena compatibilidad del componente custom. -->
                    <li>
                        <input
                            @click="
                                toggleCardPack($event.target.checked, 'base')
                            "
                            type="checkbox"
                        /><span>Base</span>
                    </li>
                    <li>
                        <Checkbox
                            id="base_card_pack"
                            @checked="toggleCardPack($event, 'base')"
                        />
                        <label for="base_card_pack">Base</label>
                    </li>
                </ul>
            </main>
        </div>
        <button @click="startGame">game_start_game_button</button>
    </div>
</template>
