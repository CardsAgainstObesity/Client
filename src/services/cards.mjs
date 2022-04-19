let cards = [{
        text: {
            es: "Barack Obama.",
            en: "Barack Obama."
        },
        dark: false,
    },
    {
        // text: "Gente blanca.",
        text: {
            es: "Gente blanca.",
            en: "White people."
        },
        dark: false,
    },
    {
        // text: "Los niños de la guerra.",
        text: {
            es: "Los niños de la guerra.",
            en: "War kids."
        },
        dark: false,
    },
    {
        // text: "Racismo.",
        text: {
            es: "Racismo.",
            en: "Racism."
        },
        dark: false,
    },
    {
        // text: "Pedofilia.",
        text: {
            es: "Pedofilia.",
            en: "Pedophilia."
        },
        dark: false,
    },
    {
        // text: "Porno con tentáculos.",
        text: {
            es: "Porno con tentáculos.",
            en: "Porn with tentacles."
        },
        dark: false,
    },
    {
        // text: "Nazis.",
        text: {
            es: "Nazis.",
            en: "Nazis."
        },
        dark: false,
    },
    {
        // text: "Pilotos kamikaze.",
        text: {
            es: "Pilotos kamikaze.",
            en: "Kamikaze pilots."
        },
        dark: false,
    },
    {
        // text: "Colegios tradicionalmente negros.",
        text: {
            es: "Colegios tradicionalmente negros.",
            en: "Traditionally black schools."
        },
        dark: false,
    },
    {
        // text: "Ocultar una erección.",
        text: {
            es: "Ocultar una erección.",
            en: "Hide an erection."
        },
        dark: false,
    }
];

let game = {
    gamestate: "lobby",
    _card_index: 0,
    _card_values: [],
    set state(value) {
        console.log(`${this.gamestate} => ${value}`);
        this.gamestate = value;
        console.log(`New gamestate: ${this.gamestate}`);
    },
    get state() {
        console.log(`Current gamestate: ${this.gamestate}`);
        return this.gamestate;
    },
    set card_index(index){
        this._card_index = index;
    },
    get card_index(){
        return this._card_index;
    },
    appendCardValue(card_value){
        this._card_values.push(card_value);
    },
    getCardValue(index){
        return this._card_values[index];
    },
    clearCardValues(){
        this._card_values = [];
    }
}

let czar = "Tu puta madre";

export { cards, game, czar }