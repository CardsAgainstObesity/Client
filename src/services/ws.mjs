import { io, Socket } from 'socket.io-client';

import { useToast } from "vue-toastification";
import Toast from "@/components/Toast.vue";
import * as vueBridge from '@/services/vueBridge.mjs';
import router from '../router'; // Vue Router

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
            vueBridge.PlayerStore.instance.playerId = WSConnection.socket.id;
        });

        WSConnection.socket.on("disconnect", () => {
            console.log("[WS] Disconnected from the server");
            toast.error("DISCONNECTED");
        });

        WSConnection.socket.on("error", (err) => {
            console.error("ERROR:", err);
            toast.error({ component: Toast, props: { displayCode: err, h1Text: false }});
        });

        WSConnection.socket.on("RateLimited", (reply) => {
            console.error("Rate Limited:", reply);
            toast.error({component: Toast, props: { displayCode: "RateLimited", h1Text: true }},
                {
                    position: "top-center",
                    timeout: false,
                    pauseOnHover: false,
                    closeButton: false,
                    progressBar: false,
                    draggable: false,
                    pauseOnFocusLoss: false,
                }
            );
        });

        WSConnection.socket.on("RoomConnectionSuccess", (room) => {
            console.log("[WS] Connected to room: ", room);
            vueBridge.RoomStore.instance.setCzar(room.czar);
            vueBridge.RoomStore.instance.roomId = room.roomId; // kekw
            room.players.forEach(ply => {
                vueBridge.RoomStore.instance.addPlayer(ply);
            });
            vueBridge.RoomStore.instance.changeStatus("lobby");
            router.replace({
                name: "lobby",
                params: { id: vueBridge.RoomStore.instance.roomId },
            });
        });

        WSConnection.socket.on("RoomCreationSuccess", (room) => {
            console.log("[WS] Created room: ", room);
            vueBridge.RoomStore.instance.setCzar(room.czar);
            vueBridge.RoomStore.instance.roomId = room.roomId;
            room.players.forEach(ply => {
                vueBridge.RoomStore.instance.addPlayer(ply);
            });
            vueBridge.RoomStore.instance.changeStatus("lobby");
            router.replace({
                name: "lobby",
                params: { id: vueBridge.RoomStore.instance.roomId },
            });
        });

        WSConnection.socket.on("RoomPlayerConnection", (player) => {
            console.log("[WS] Player connected: ", player);
            if (player.id == vueBridge.PlayerStore.instance.playerId) {
                vueBridge.PlayerStore.instance.setName(player.name);
                vueBridge.PlayerStore.instance.setObesity(player.obesity);
            }
            vueBridge.RoomStore.instance.addPlayer(player);
        });

        WSConnection.socket.on("RoomPlayerDisconnection", (player) => {
            console.log("[WS] Player disconnected: ", player);
            vueBridge.RoomStore.instance.removePlayer(player);
        });

        WSConnection.socket.on("RoomStatusChanged", (status) => {
            console.log("[WS] Room status changed: ", status);
            vueBridge.RoomStore.instance.changeStatus(status);
        });

        WSConnection.socket.on("RoomCzarChanged", (newCzar) => {
            console.log("[WS] Room Czar changed: ", newCzar);
            vueBridge.RoomStore.instance.setCzar(newCzar);
        });

        WSConnection.socket.on("RoomStart", () => {
            console.log("[WS] Room started!");
            vueBridge.RoomStore.instance.changeStatus("choosing");
            if (router.currentRoute.value.name == "lobby") router.replace({
                name: "choosing",
                params: { id: vueBridge.RoomStore.instance.roomId },
            });
        });

        WSConnection.socket.on("PlayerDeckUpdated", (deck) => {
            console.log("[WS] Player deck updated!");
            vueBridge.PlayerStore.instance.updateDeck(deck);
        });

        WSConnection.socket.on("RoomBlackCardChanged", (bCard) => {
            console.log("[WS] Black card changed!");
            vueBridge.RoomStore.instance.setBlackCard(bCard);
        });

        WSConnection.socket.on("PlayerChangeName", player => {
            console.log(`[WS] Player with id ${player.id} changed name to ${player.name}`);
            
            const rPlayer = vueBridge.RoomStore.instance.players.get(player.id);
            if (player) rPlayer.name = player.name;

            if (player.id == vueBridge.PlayerStore.instance.playerId) { // If WE changed name , change the Player instance name
                vueBridge.PlayerStore.instance.setName(player.name);
            }
        });

        WSConnection.socket.on("LobbyAddCardpackSuccess", (cardpack) => {
            console.log("[WS] Added cardpack ", cardpack);
        });

        WSConnection.socket.on("LobbyRemoveCardpackSuccess", (cardpack_id) => {
            console.log("[WS] Removed cardpack ", cardpack_id);
        });

        WSConnection.socket.on("AnnouncePlayerIsNotReady", (player) => {
            console.log("[WS] A player is not ready ", player);
            if (player.id == vueBridge.PlayerStore.instance.playerId) vueBridge.PlayerStore.instance.setReady(player.ready);
        });

        WSConnection.socket.on("AnnouncePlayerIsReady", (player) => {
            console.log("[WS] A player is ready ", player);
            if (player.id == vueBridge.PlayerStore.instance.playerId) vueBridge.PlayerStore.instance.setReady(player.ready);
        });

        WSConnection.socket.on("RoomStartVoting", (cards) => {
            console.log("[WS] Started voting for : ", cards);
            vueBridge.RoomStore.instance.changeStatus("voting");
            vueBridge.PlayerStore.instance.clearCardValues();
            vueBridge.RoomStore.instance.votingFor = cards;
            vueBridge.RoomStore.instance.roundWinner = undefined;
            if (router.currentRoute.value.name == "choosing") router.replace({
                name: "voting",
                params: { id: vueBridge.RoomStore.instance.roomId },
            });
        });

        WSConnection.socket.on("RoomStartChoosing", () => {
            console.log("[WS] Started choosing");
            vueBridge.RoomStore.instance.changeStatus("choosing");

            WSConnection.playerIsNotReady();
            vueBridge.PlayerStore.instance.clearCardValues();
            vueBridge.PlayerStore.instance.selected.clear();
            
            vueBridge.RoomStore.instance.roundWinner = undefined;
            if (router.currentRoute.value.name == "voting") router.replace({
                name: "choosing",
                params: { id: vueBridge.RoomStore.instance.roomId },
            });
        });

        WSConnection.socket.on("AnnounceRoomSelectWinner", (winner) => {
            console.log("[WS] The czar selected a winner ", winner);
            vueBridge.RoomStore.instance.roundWinner = winner;
            
            const selected_player = vueBridge.RoomStore.instance.votingFor.filter(selection => selection.player_id === winner.id);
            vueBridge.PlayerStore.instance.clearCardValues();
            for (const card of selected_player[0].cards) {
                vueBridge.PlayerStore.instance.appendCardValue(card.text);
            }
        });

        WSConnection.socket.on("RoomGameFinished", (winner) => {
            console.log("[WS] The game finished and the winner is ", winner);
            vueBridge.RoomStore.instance.roundWinner = winner;
        });

        WSConnection.socket.on("RoomGoBackToLobby", () => {
            console.log("[WS] After the game ended, the czar has decided to send players back to lobby");
        });

        WSConnection.socket.on("RoomFlipCard", (player_id) => {
            console.log("[WS] Cards from player flipped ", player_id);
            const selected_player = vueBridge.RoomStore.instance.votingFor.filter(selection => selection.player_id === player_id);
            // selected_player[0].flipped = !selected_player[0].flipped; // Toggle
            selected_player[0].flipped = true; // Set to true (flipped)
            vueBridge.ConfigStore.instance.playRandomAudioClip();

            vueBridge.PlayerStore.instance.clearCardValues();
            for (const card of selected_player[0].cards) {
                vueBridge.PlayerStore.instance.appendCardValue(card.text);
            }
        });
        
        WSConnection.socket.on("RoomConnectionRequestPrompt", (callback) => {
            callback(true);
        });

        WSConnection.socket.on("RoomConnectionDenied", () => {
            console.log("[WS] Connection denied");
        });

        WSConnection.socket.on("RoomConnectionSuccess", () => {
            console.log("[WS] Connection success");
        });

        WSConnection.socket.on("AvailableCardPacks", (cardpacks) => {
            console.log(cardpacks);
        });
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
        WSConnection.socket.emit("RoomStartRequest", vueBridge.RoomStore.instance.roomId);
    }

    static flipCard(player_id) {
        WSConnection.socket.emit("RoomFlipCardRequest", player_id);
    }

    static playerIsReady() {
        let selectedCards = Array.from(vueBridge.PlayerStore.instance.selected);
        WSConnection.socket.emit("PlayerIsReady", selectedCards);
    }

    static playerIsNotReady() {
        WSConnection.socket.emit("PlayerIsNotReady");
    }

    static startVoting() {
        WSConnection.socket.emit("RoomStartVotingRequest");
    }

    static startChoosing() {
        WSConnection.socket.emit("RoomStartChoosingRequest");
    }

    static selectWinner(player_id) {
        WSConnection.socket.emit("RoomSelectWinnerRequest", player_id);
    }

    static backToLobby() {
        WSConnection.socket.emit("RoomGoBackToLobbyRequest");
    }

    static addCardPack(cardpack_id) {
        WSConnection.socket.emit("LobbyAddCardpackRequest", {
            "room_id": vueBridge.RoomStore.instance.roomId,
            "cardpack_id": cardpack_id
        });
    }

    static removeCardPack(cardpack_id) {
        WSConnection.socket.emit("LobbyRemoveCardpackRequest", {
            "room_id": vueBridge.RoomStore.instance.roomId,
            "cardpack_id": cardpack_id
        });
    }

}