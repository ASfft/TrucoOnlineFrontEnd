import { useEffect, useState} from 'react'
import IAAPI from "./api/IAAPI";
import {delay, isEqual} from "lodash";
import {useRouter} from "next/dist/client/router";

function translateAPICardToImg(card) {
    return "/cartas/" + card + ".png"
}


const IA = () => {

    const router = useRouter()
    const [player1Cards,setPlayer1Cards] = useState([]);
    const [player2Cards,setPlayer2Cards] = useState([]);
    const [player1LastPlay,setPlayer1LastPlay] = useState(null);
    const [player2LastPlay,setPlayer2LastPlay] = useState(null);
    const [player1Points,setPlayer1Points] = useState(0);
    const [player2Points,setPlayer2Points] = useState(0);
    const [player1RoundPoints, setPlayer1RoundPoints] = useState(0);
    const [player2RoundPoints, setPlayer2RoundPoints] = useState(0);
    const [turn,setTurn] = useState("player1");
    const [restartRound, setRestartRound] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [roundValue, setRoundValue] = useState(2);
    const [gameId, setGameID] = useState(1)
    const [colors,setColors] = useState(["#ddd", "#ddd", "#ddd", "#ddd"])

    useEffect(() => {
        console.log(player2RoundPoints)
        let newColors = [...colors]
        if (player1RoundPoints === 0){
            newColors[0] = "#ddd"
            newColors[1] = "#ddd"
        } else if (player1RoundPoints === 1) {
            newColors[0] = "blue"
        } else if (player1RoundPoints === 2) {
            newColors[1] = "blue"
        }
        if (player2RoundPoints === 0) {
            newColors[2] = "#ddd"
            newColors[3] = "#ddd"
        } else if (player2RoundPoints === 1){
            newColors[2] = "blue"
        } else if (player2RoundPoints ===2) {
            newColors[3] = "blue"
        }
        setColors(newColors)
        },[player1RoundPoints, player2RoundPoints])

    useEffect(() => {
        if (gameFinished) {
            router.push('/').then(r => () => {})
        }
    }, [gameFinished])

    useEffect(() => {
        IAAPI.getDetails(gameId).then(response => {
            handleAPIGameResponse(response.data)
        })
    }, [])

    useEffect(() => {
        if (restartRound) {
            IAAPI.startRound(gameId).then(response => {
                delay(() => {
                    console.log(response.data)
                    handleAPIGameResponse(response.data)
                }, (player1Points + player2Points + player1RoundPoints + player2RoundPoints)?2000: 0)
                setRestartRound(false)
            })
        }
    }, [restartRound])

    const handleAPIGameResponse = (response) => {
        setPlayer1Cards(response.player1_cards);
        setPlayer2Cards(response.player2_cards);
        setPlayer1LastPlay(response.play_cards["1"] !== undefined? translateAPICardToImg(response.play_cards["1"]): null);
        setPlayer2LastPlay(response.play_cards["2"] !== undefined? translateAPICardToImg(response.play_cards["2"]): null);
        setPlayer1Points(response.player1_points);
        setPlayer2Points(response.player2_points);
        setPlayer1RoundPoints(response.player1_round_points);
        setPlayer2RoundPoints(response.player2_round_points);
        setTurn(response.turn);
        setRoundValue(response.round_value)
    }

    useEffect(() => {
        if (turn === "player2" && !isEqual(player2Cards, [])) {
            delay(() => {playCard(player2Cards[Math.floor(Math.random()*player2Cards.length)])}, 2000)
        }
    }, [turn])

    const playCard = (card) => {
        IAAPI.playCard({gameId: gameId, player: turn, card: card}).then(response => {
            if (turn === "player1") {
                setPlayer1LastPlay(translateAPICardToImg(card));
                setPlayer1Cards(response.data.result.player1_cards)
            } else {
                setPlayer2LastPlay(translateAPICardToImg(card));
                setPlayer2Cards(response.data.result.player2_cards)
            }
            if (response.data.play_winner !== null) {
                setPlayer1RoundPoints(response.data.result.player1_round_points)
                setPlayer2RoundPoints(response.data.result.player2_round_points)
                setTurn("nobody")
                delay(() => {
                    setPlayer1LastPlay(null);
                    setPlayer2LastPlay(null);
                }, 1000)
                setPlayer1Points(response.data.result.player1_points);
                setPlayer2Points(response.data.result.player2_points);
                if (response.data.game_completed) {
                    setGameFinished(true)
                } else {
                    setRestartRound(response.data.round_finished || response.data.game_finished);
                    if (response.data.round_finished) {
                        setTurn("nobody")
                    } else {
                        setTurn(response.data.result.turn)
                    }
                }
            } else {
                setTurn(response.data.result.turn)
            }
        })
    }

    const truco = () => {
        let response = Math.random() >= 0.5
        if (response === true) {
            setTurn("nobody")
        }
        IAAPI.truco({gameId, response}).then(response => {
            console.log(response.data)
            handleAPIGameResponse(response.data.result)
            if (response.data.game_completed) {
                setGameFinished(true)
            } else {
            setRestartRound(response.data.round_finished || response.data.game_finished);
            }
        })
        }

    return (
        <>
        <div className="playerinfo">
            <h3>
                Pontos: {player2Points}
            </h3>
        </div>
        <div className="gametable">
            <div className="cards">
            {player2Cards.map((card, index) =>
                <div key={index}>
                     <button disabled={true} onClick={() => playCard(player2Cards[index])}>
                         <img className="player2cards" src={"/cartas/FlippedCard.png"} alt=""/>
                     </button>
                </div>
                )}
            </div>
            <div className="cards">
                <img className="plays" src={player2LastPlay} />
            </div>
            <div className="logomesa">
                <div className="JfvckAn">
                    <a>
                        Player 2
                    </a>
                    <span className="roundPoints" style={{backgroundColor: colors[2]}}/>
                    <span className="roundPoints" style={{backgroundColor: colors[3]}}/>
                </div>
                    <a>༼ つ ◕_◕ ༽つ</a>
                <div className="JfvckAn">
                    <a>
                        Player 1
                    </a>
                    <span className="roundPoints" style={{backgroundColor: colors[0]}}/>
                    <span className="roundPoints" style={{backgroundColor: colors[1]}}/>
                </div>
            </div>
            <div className="cards">
                <img className="plays" src={player1LastPlay} />
            </div>
            <div className="cards">
                {player1Cards.map((card, index) =>
                <div key={index}>
                    <button disabled={turn !== "player1"} onClick={() => playCard(player1Cards[index])} >
                        <img className="player1cards" src={translateAPICardToImg(card)} alt=""/>
                    </button>
                </div>
                )}
            </div>
        </div>
        <div className="playerinfo">
            <h3>
                Pontos: {player1Points}
            <button disabled={turn !== "player1" || roundValue > 2} onClick={() => truco()}> Truco </button>
            Round Value: {roundValue}
            </h3>
        </div>
        </>
     );
}

export default IA;