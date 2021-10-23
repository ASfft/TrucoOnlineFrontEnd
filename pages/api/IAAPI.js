import axios from "axios";
import API from "./APIHelper";

export default class IAAPI {

    static startGame = (gameId) => {
        return API.post("/game/ia/start", {game_id: gameId})
    };

    static playCard = ({gameId, player, card}) => {
        return API.post("/game/ia/play-card", {game_id: gameId, player: player, card: card})
    };
}