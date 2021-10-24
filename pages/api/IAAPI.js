import axios from "axios";
import API from "./APIHelper";

export default class IAAPI {

    static getDetails = (gameId) => {
        return API.get("/game/ia/"+gameId+"/details")
    };

    static startRound = (gameId) => {
        return API.post("/game/ia/"+gameId+"/start")
    };

    static playCard = ({gameId, player, card}) => {
        return API.post("/game/ia/"+gameId+"/play-card", {player: player, card: card})
    };

    static truco = ({gameId, response}) => {
        return API.post("/game/ia/"+gameId+"/truco", {response: response})
    }
}