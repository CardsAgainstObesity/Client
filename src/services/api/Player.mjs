export default class Player {
    
    static __id = "";
    static __name = "";
    static __deck = [];
    static __obesity = -1;

    static updateDeck(deck) {
        this.__deck = deck;
    }

    static get id() {
        return this.__id;
    }

    static get deck() {
        return this.__deck;
    }

    static get obesity() {
        return this.__obesity;
    }

    static get name() {
        return this.__name;
    }

}