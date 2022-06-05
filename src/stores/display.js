import { defineStore } from 'pinia';
import { ConfigStore } from "@/services/vueBridge.mjs";

export const useDisplayStore = defineStore({
	id: 'display',
	state: () => ({
		text_obj: {
			es: {
				// GENERAL
				app_name: "Cartas Contra la Obesidad",
				app_short_name: "CCO",
				settings_language: "Idioma",
				error: "Error",

				// NAV
				nav_screenshot: "Hacer una captura de pantalla",
				nav_index: "Inicio",
				nav_game: "Partida",
				nav_rules: "Reglas",
				nav_settings: "Configuración",
				nav_about: "Acerca de",

				// VIEW: INDEX
				index_username: "Tu nombre",
				index_roomid: "Código de sala",
				index_join_button: "Unirse",
				index_create_button: "Crear una nueva sala",

				// VIEW: GAME
				game_state_lobby: "Sala de espera",
				game_state_choosing: "Eligiendo",
				game_state_voting: "Votando",

				game_start_game_button: "Empezar partida",
				game_current_czar_you: "Tú eres el Zar de las cartas.",
				game_current_czar_other: "es el Zar de las Cartas.",
				game_players_lobby: "Jugadores en la partida",
				game_card_packs: "Mazos de cartas",
				game_next_round: "Siguiente ronda",
			},
			en: {
				// GENERAL
				app_name: "Cards Against Obesity",
				app_short_name: "CAO",
				settings_language: "Language",
				error: "Error",

				// NAV
				nav_screenshot: "Take a screenshot",
				nav_index: "Home",
				nav_game: "Game",
				nav_rules: "Rules",
				nav_settings: "Settings",
				nav_about: "About",

				// VIEW: INDEX
				index_username: "Your name",
				index_roomid: "Room id",
				index_join_button: "Join",
				index_create_button: "Create new room",

				// VIEW: GAME
				game_state_lobby: "Lobby",
				game_state_choosing: "Choosing",
				game_state_voting: "Voting",

				game_start_game_button: "Start game",
				game_current_czar_you: "You are the Card Czar.",
				game_current_czar_other: "is the Card Czar.",
				game_players_lobby: "Players in this lobby",
				game_card_packs: "Card packs",
				game_next_round: "Next round",
			},
		},
		error_obj: {
			es: {
				RateLimited: "¿¡¿¡PUEDES PARAR!?!?",
				UnknownRoom: "Esta sala no existe.",
				RoomAlreadyExists: "Ya hay una sala con ese código.",
				NoPermissions: "No tienes permisos para hacer eso.",
				NotEnoughCards: "No hay suficientes cartas para empezar la partida.",
				CardpackAlreadyAdded: "Ya has añadido este pack de cartas.",
			},
			en: {
				RateLimited: "CAN YOU STOP!?!?",
				UnknownRoom: "This room does not exist.",
				RoomAlreadyExists: "There's already a room with that code.",
				NoPermissions: "You don't have permissions to do that.",
				NotEnoughCards: "There aren't enough cards to start the game.",
				CardpackAlreadyAdded: "You've already added this cardpack.",
			},
		},
		console_log_obj: {
			es: {},
			en: {},
		},
	}),
	actions: { // TODO: If no translated text is available for the selected language, default to English.
		text(key) {
			return this.text_obj[ConfigStore.instance.language][key];
		},
		error(key) {
			return this.error_obj[ConfigStore.instance.language][key];
		},
		console_log(key) {
			return this.console_log_obj[ConfigStore.instance.language][key];
		}
	}
})
