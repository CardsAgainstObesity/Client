import EventHandler from './EventHandler.mjs';

export default class Room {

    static _roomId = "";
    static _players = new Map();
    static _status = "lobby";
    static _czar = null;

    /**
    * @type {EventHandler}
    */
    static _events = null;


    static get events() {
        if (this._events == null) this._events = new EventHandler();
        return this._events;
    }


    static get players() {
        return Room._players;
    }

    static get playersArr() {
        return Array.from(Room._players.values());
    }

    static get roomId() {
        return Room._roomId;
    }
    static set roomId(value) {
        Room._roomId = value;
    }

    static addPlayer(player) {
        this.events.emit("PlayerAdded",player);
        this.events.emit("PlayerListUpdated");
        Room._players.set(player.id, player);
    }

    static removePlayer(player) {
        this.events.emit("PlayerRemoved",player);
        this.events.emit("PlayerListUpdated");
        Room._players.delete(player.id);
    }

    static setCzar(player) {
        this.events.emit("CzarChanged",player);
        this.events.emit("PlayerListUpdated");
        Room._czar = player;
    }

    static getCzar() {
        return Room._czar;
    }

    static start() {
        // TODO
    }
}