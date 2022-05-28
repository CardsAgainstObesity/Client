import { defineStore } from 'pinia'

const ls_language = localStorage.getItem("language"); // Persist language selection

export const useDisplayStore = defineStore({
	id: 'display',
	state: () => ({
		language: ls_language === null ? 'en' : ls_language,
		text_obj: {
			es: {
				// GENERAL
				app_name: "Cartas Contra la Obesidad",
				settings_language: "Idioma",

				// NAV
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
				game_current_czar_you: "Tú eres el Zar de las cartas.",
				game_current_czar_other: "es el Zar de las Cartas.",
				game_players_lobby: "Jugadores en la partida",
				game_next_round: "Siguiente ronda",
			},
			en: {
				// GENERAL
				app_name: "Cards Against Obesity",
				settings_language: "Language",

				// NAV
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
				game_current_czar_you: "You are the Card Czar.",
				game_current_czar_other: "is the Card Czar.",
				game_players_lobby: "Players in this lobby",
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
			return this.text_obj[this.language][key];
		},
		error(key) {
			return this.error_obj[this.language][key];
		},
		console_log(key) {
			return this.console_log_obj[this.language][key];
		}
	}
})
