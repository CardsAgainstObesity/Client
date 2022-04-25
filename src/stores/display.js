import { defineStore } from 'pinia'

export const useDisplayStore = defineStore({
	id: 'display',
	state: () => ({
		language: "en",
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
				game_current_czar: "es el Zar de las Cartas.",
				game_players_lobby: "Jugadores en la partida",

				// ERRORS
				UknownRoom: "Esta sala no existe.",
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
				game_current_czar: "is the Card Czar.",
				game_players_lobby: "Players in this lobby",

				// ERRORS
				UknownRoom: "This room does not exist.",
			}
		},
		// cards: fetch() // TODO: Descargar el pack de cartas del servidor
	}),
	actions: {
		text(key) {
			return this.text_obj[this.language][key]
		},
	}
})
