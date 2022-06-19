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
				nav_secret: "Secreto",

				// VIEW: INDEX
				index_username: "Tu nombre",
				index_roomid: "Código de sala",
				index_password: "Contraseña (Opcional)",
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
				game_player_list: "Lista de jugadores",
				game_next_round: "Siguiente ronda",
				game_finish_game: "Finalizar partida",

				game_choosing_modal_czar_header: "¡Eres el Zar!",
				game_choosing_modal_czar_body: "Esta ronda no podrás elegir carta. Cuando los demás jugadores acaben de elegir sus cartas, deberás elegir la carta ganadora.",

				// VIEW: SETTINGS
				settings_audio_volume_range: "Volumen",
				settings_css_presets: "Temas",
				settings_theme_dark: "Oscuro",
				settings_theme_white: "Claro",
				settings_theme_cardsagainsthumanity: "Cartas Contra la Humanidad",
				settings_color_primary: "Primario",
				settings_color_secondary: "Secundario",
				settings_color_tertiary: "Terciario",
				settings_color_card_black: "Carta negra",
				settings_color_card_black_text: "Texto de carta negra",
				settings_color_card_white: "Carta blanca",
				settings_color_card_white_text: "Texto de carta blanca",
				settings_color_ui_text: "Texto",
				settings_color_background: "Fondo",
				settings_color_background_alt: "Contraste del fondo",
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
				nav_secret: "Secret",

				// VIEW: INDEX
				index_username: "Your name",
				index_roomid: "Room id",
				index_password: "Password (Optional)",
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
				game_player_list: "Player list",
				game_next_round: "Next round",
				game_finish_game: "Finish game",

				game_choosing_modal_czar_header: "You are the Czar!",
				game_choosing_modal_czar_body: "You won't be able to pick a card this round. When everyone else picks their card, you'll have to choose which is the winning card.",

				// VIEW: SETTINGS
				settings_audio_volume_range: "Volume",
				settings_css_presets: "Themes",
				settings_theme_dark: "Dark",
				settings_theme_white: "White",
				settings_theme_cardsagainsthumanity: "Cards Against Humanity",
				settings_color_primary: "Primary",
				settings_color_secondary: "Secondary",
				settings_color_tertiary: "Tertiary",
				settings_color_card_black: "Black card",
				settings_color_card_black_text: "Black card text",
				settings_color_card_white: "White card color",
				settings_color_card_white_text: "White card text",
				settings_color_ui_text: "Text",
				settings_color_background: "Background",
				settings_color_background_alt: "Background contrast",
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
		other_text(data){
			if (data[ConfigStore.instance.language] !== undefined) return data[ConfigStore.instance.language];
			else {
				const first_available_language = Object.keys(data)[0];
				return data[first_available_language];
			}
		},
		text(key) {
			const user_language = this.text_obj[ConfigStore.instance.language];
			return user_language[key] || this.text_obj.en[key] || key;
		},
		error(key) {
			return this.error_obj[ConfigStore.instance.language][key] || `CODE: ${key}`;
		},
		console_log(key) {
			return this.console_log_obj[ConfigStore.instance.language][key];
		}
	}
})
