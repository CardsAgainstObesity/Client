import EventHandler from '../EventHandler.mjs';

export default class Room {

    static __roomId = "";
    static __players = new Map();
    static __status = "lobby";
    static __blackCard = null;
    static __czar = null;

    /**
    * @type {EventHandler}
    */
    static _events = null;


    static get events() {
        if (this._events == null) this._events = new EventHandler();
        return this._events;
    }

    static changeStatus(status) {
        this.__status = status;
    }

    static get status() {
        return this.__status;
    }

    static get players() {
        return Room.__players;
    }

    static get playersArr() {
        return Array.from(Room.__players.values());
    }

    static get roomId() {
        return Room.__roomId;
    }
    static set roomId(value) {
        Room.__roomId = value;
    }

    static addPlayer(player) {
        this.events.emit("PlayerAdded",player);
        this.events.emit("PlayerListUpdated");
        Room.__players.set(player.id, player);
    }

    static removePlayer(player) {
        this.events.emit("PlayerRemoved",player);
        this.events.emit("PlayerListUpdated");
        Room.__players.delete(player.id);
    }

    static setCzar(player) {
        this.events.emit("CzarChanged",player);
        this.events.emit("PlayerListUpdated");
        Room.__czar = player;
    }

    static getCzar() {
        return Room.__czar;
    }

    static getBlackCard() {
        return this.__blackCard;
    }

    static setBlackCard(bCard) {
        this.__blackCard = bCard;
    }

}