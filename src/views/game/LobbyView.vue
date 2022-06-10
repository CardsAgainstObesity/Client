<script>
import Playerlist from "@/components/Playerlist.vue";
import WSConnection from "@/services/ws.mjs";

export default {
	data(){
		return {
			WSConnection
		}
	},
	components: {
		Playerlist
	},
	created() {
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
	<div class="lobby_container">
		<div>
			<main>
				<h1>{{ $display.text("game_players_lobby") }}</h1>
				<Playerlist :list="$room.players.values()" :lobby="true" />
			</main>
		</div>
		<div>
			<main>
				<!-- TODO: Meter esto en un componente -->
				<h1>{{ $display.text("game_card_packs") }}</h1>
				<!-- <ul class="card_pack_container">
					<li>
						<Checkbox
							id="base_card_pack"
							@checked="toggleCardPack($event, 'base')"
						/>
						<label for="base_card_pack">Base</label>
					</li>
				</ul> -->
				<ul class="card_pack_container">
					<li v-for="cardpack in $room.cardpacks" :key="cardpack">
						<Checkbox
							:id="cardpack.id"
							@checked="toggleCardPack($event, cardpack.id)"
						/>
						<label :for="cardpack.id">{{ $display.other_text(cardpack.name) }}</label>
					</li>
				</ul>
			</main>
		</div>
		<div class="lobby_button_start" style="flex-basis: 100%;">
			<button @click="startGame">{{ $display.text("game_start_game_button") }}</button>
		</div>
	</div>
</template>

<style scoped>
.lobby_container {
	padding: 1rem;
	display: flex;
	flex-wrap: wrap;
	gap: 2rem;
}

.lobby_container > div {
	flex: max-content;
}

.card_pack_container {
	list-style-type: none;
}

.lobby_button_start > button {
	margin-left: 0;
	margin-right: 0;
}

@media only screen and (max-width: 1000px) {
	.lobby_container {
		flex-direction: column;
	}
}
</style>