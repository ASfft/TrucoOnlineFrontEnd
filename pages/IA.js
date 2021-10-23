import { useEffect, useState } from 'react'
import IAAPI from "./api/IAAPI";

function translateAPICardToImg(card) {
    return "/cartas/" + card + ".png"
}

function translateImgToCard(img) {
    return img.split("/")[2].split(".")[0]
}


const IA = () => {

    const [isGameStart, setIsGameStart] = useState(true);
    const [player1Cards,setPlayer1Cards] = useState([]);
    const [player2Cards,setPlayer2Cards] = useState([]);
    const [player1LastPlay,setPlayer1LastPlay] = useState(null);
    const [player2LastPlay,setPlayer2LastPlay] = useState(null);
    const [player1Points,setPlayer1Points] = useState(0);
    const [player2Points,setPlayer2Points] = useState(0);
    const [whoStarts,setWhoStarts] = useState("player1");
    const [turn,setTurn] = useState("player1");
    const [cardIndex,setCardIndex] = useState(-1)
    const [finishedPlay, setFinishedPlay] = useState(false)


    useEffect(() => {
            IAAPI.startGame(1).then(response => {
                setPlayer1Cards(response.data.player1_cards)
                setPlayer2Cards(response.data.player2_cards)
            })
        }
    , [isGameStart])

    const playCard = (card) => {
        IAAPI.playCard({gameId: 1, player: turn, card: card}).then(response => {
            if (turn === "player1") {
                setPlayer1LastPlay(translateAPICardToImg(card));
                setPlayer1Cards(response.data.player_cards)
                setTurn("player2")
            } else {
                setPlayer2LastPlay(translateAPICardToImg(card));
                setPlayer2Cards(response.data.player_cards)
                setTurn("player1")
            }
            if (response.data.result) {
                console.log(response.data.result)
            }
        })
    }

    return (
        <>
        <div className="pontos">
            <h3>
                Pontos: {player2Points}
            </h3>
        </div>
        <div className="gametable">
            <div className="cards">
            {player2Cards.map((card, index) =>
                <div key={index}>
                     <button disabled={turn !== "player2"} onClick={() => playCard(player2Cards[index])} ><img className="player2cards" src={translateAPICardToImg(card)} /></button>
                </div>
                )}
            </div>
            <div className="cards">
                <img className="plays" src={player2LastPlay} />
            </div>
            <div className="logomesa">
                <a>༼ つ ◕_◕ ༽つ</a>
            </div>
            <div className="cards">
                <img className="plays" src={player1LastPlay} />
            </div>
            <div className="cards">
                {player1Cards.map((card, index) =>
                <div key={index}>
                    <button disabled={turn !== "player1"} onClick={() => playCard(player1Cards[index])} ><img className="player1cards" src={translateAPICardToImg(card)} /></button>
                </div>
                )}
            </div>
        </div>
        <div className="pontos">
            <h3>
                Pontos: {player1Points}
            </h3>
        </div>
        </>
     );
}

export default IA;