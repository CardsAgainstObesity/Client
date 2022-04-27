import { io, Socket } from 'socket.io-client';
import Player from './api/Player.mjs';
import Room from './api/Room.mjs';
import { useToast } from "vue-toastification";

const toast = useToast();

export default class WSConnection {

    /**
     * @type {Socket}
     */
    static _socket = null;

    static get socket() {
        if (this._socket == null) throw new Error("Client is not connected to the WS server!");
        return this._socket;
    }

    static connect() {
        // Create a connection to the WS server
        // WSConnection._socket = io(window.location.hostname + ":" + window.location.port);
        WSConnection._socket = io("https://" + window.location.hostname + ":8443"); // TODO: Cambiar para producción


        WSConnection.socket.on("connect", () => {
            console.log("[WS] Connected to the server");
            Player.__id = WSConnection.socket.id;
        });

        WSConnection.socket.on("error", (err) => {
            console.error("ERROR:", err);
            toast.error(`${window.$display.text(err)}`);
        });

        WSConnection.socket.on("RoomConnectionSuccess", (room) => {
            console.log("[WS] Connected to room: ", room);
            Room.setCzar(room.czar);
            Room.roomId = room.id;
            room.players.forEach(ply => {
                Room.addPlayer(ply);
            });
        });

        WSConnection.socket.on("RoomCreationSuccess", (room) => {
            console.log("[WS] Created room: ", room);
            Room.setCzar(room.czar);
            Room.roomId = room.id;
            room.players.forEach(ply => {
                Room.addPlayer(ply);
            });
        });

        WSConnection.socket.on("RoomPlayerConnection", (player) => {
            console.log("[WS] Player connected: ", player);
            if(player.id == Player.id)
            {
                Player.__name = player.name;
                Player.__obesity = player.obesity;
            }
            Room.addPlayer(player);
        });

        WSConnection.socket.on("RoomPlayerDisconnection", (player) => {
            console.log("[WS] Player disconnected: ", player);
            Room.removePlayer(player);
        });

        WSConnection.socket.on("RoomStatusChanged", (status) => {
            console.log("[WS] Room status changed: ", status);
            Room.changeStatus(status);
        });

        WSConnection.socket.on("RoomCzarChanged", (newCzar) => {
            console.log("[WS] Room Czar changed: ", newCzar);
            Room.setCzar(newCzar);
        });

        WSConnection.socket.on("RoomStart", () => {
            console.log("[WS] Room started!");
        });

        WSConnection.socket.on("RoomCardsDealed",() => {
            console.log("[WS] Cards dealed!");
        });

        WSConnection.socket.on("PlayerDeckUpdated",(deck) => {
            console.log("[WS] Player deck updated!");
            Player.updateDeck(deck);
        });

        WSConnection.socket.on("RoomBlackCardChanged", (bCard) => {
            console.log("[WS] Black card changed!");
            Room.setBlackCard(bCard);
        });
    
        WSConnection.socket.on("PlayerChangeName", player => {
            console.log(`[WS] Player with id ${player.id} changed name to ${player.name}`);
            var player = Room.players.get(player.id);
            if(player) player.name = player.name;
            if(player.id == Player.id) { // If WE changed name , change the Player instance name
                Player.__name = player.name;
            }
        });

        WSConnection.socket.on("AnnouncePlayerIsNotReady", (player) => {
            console.log("[WS] A player is not ready ", player);
        });

        WSConnection.socket.on("AnnouncePlayerIsReady", (player) => {
            console.log("[WS] A player is ready ", player);
        });

        WSConnection.socket.on("RoomStartVoting", (cards) => {
            console.log("[WS] Started voting for : ", cards);
        })
    }

    static createRoom(roomId) {
        WSConnection.socket.emit("RoomCreationRequest", roomId);
    }

    static joinRoom(roomId) {
        WSConnection.socket.emit("RoomConnectionRequest", roomId);
    }

    static changeName(newName) {
        WSConnection.socket.emit("RequestPlayerChangeName", newName);
    }

    static startRoom() {
        WSConnection.socket.emit("RoomStartRequest",Room.roomId);
    }

    static addCardPack(cardpack_id) {
        WSConnection.socket.emit("LobbyAddCardpackRequest", {
            "room_id": Room.roomId,
            "cardpack_id": cardpack_id 
        });
    }

    static removeCardPack(cardpack_id) {
        WSConnection.socket.emit("LobbyRemoveCardpackRequest", {
            "room_id": Room.roomId,
            "cardpack_id": cardpack_id 
        });
    }

}