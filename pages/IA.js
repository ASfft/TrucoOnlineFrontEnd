import { useState } from 'react'


const IA = () => {

    const [yourCards,setYourCards] = useState([["/cartas/4_of_clubs.png",1], ["/cartas/king_of_hearts.png",2], ["/cartas/7_of_diamonds.png",3]]);
    const [hisCards,setHisCards] = useState([["/cartas/3_of_spades.png",1], ["/cartas/king_of_hearts.png",2], ["/cartas/4_of_clubs.png",3]]);
    const [yourLastPlay,setYourLastPlay] = useState([]);
    const [hisLastPlay,setHisLastPlay] = useState([]);
    const [disableYourCards,setDisableYourCards] = useState(false);
    const [disableHisCards,setDisableHisCards] = useState(true);
    const [yourPoints,setYourPoints] = useState(0);
    const [hisPoints,setHisPoints] = useState(0);
    const [whoStarts,setWhoStarts] = useState("you");


    function jogadaSua(card) {


        setDisableYourCards(true);

        var removeArr1 = [...yourCards].filter(carta => carta[1] !== card[1])
        setYourCards(removeArr1);

        var removeArr2 = [...yourCards].filter(carta => carta[1] == card[1])
        setYourLastPlay(removeArr2[0][0]);

        setDisableHisCards(false);

        if (yourCards.length == 1 && whoStarts == "he") {
            setTimeout(restartGame, 2000);
        }
        

}

    function jogadaDele(card) {

        setDisableHisCards(true);

        var removeArr1 = [...hisCards].filter(carta => carta[1] !== card[1])
        setHisCards(removeArr1);

        var removeArr2 = [...hisCards].filter(carta => carta[1] == card[1])
        setHisLastPlay(removeArr2[0][0]);


        setDisableYourCards(false);

        if (hisCards.length == 1 && whoStarts == "you") {
            setTimeout(restartGame, 2000);
        }

    }

    function clearPlays() {
        setYourLastPlay([]);
        setHisLastPlay([]);
    }

    function restartGame() {
        console.log("funcionou")
            setYourCards([["/cartas/4_of_clubs.png",1], ["/cartas/king_of_hearts.png",2], ["/cartas/7_of_diamonds.png",3]]);
            setHisCards([["/cartas/3_of_spades.png",1], ["/cartas/king_of_hearts.png",2], ["/cartas/4_of_clubs.png",3]]);
            setYourLastPlay([]);
            setHisLastPlay([]);
    }

    return ( 
        <>
        <div className="pontos">
            <h3>
                Pontos: {hisPoints}
            </h3>
        </div>
        <div className="gametable">
            <div className="cards">
            {hisCards.map(card =>
                <div key={card[1]}>
                     <button disabled={disableHisCards} onClick={() => jogadaDele(card)} ><img className="hiscards" src={card[0]} /></button>
                </div>
                )}
            </div>
            <div className="cards">
                <img className="plays" src={hisLastPlay} />
            </div>
            <div className="logomesa">
                <a>༼ つ ◕_◕ ༽つ</a>
            </div>
            <div className="cards">
                <img className="plays" src={yourLastPlay} />
            </div>
            <div className="cards">
                {yourCards.map(card =>
                <div key={card[1]}>
                    <button disabled={disableYourCards} onClick={() => jogadaSua(card)} ><img className="yourcards" src={card[0]} /></button>
                </div>
                )}
            </div>
        </div>
        <div className="pontos">
            <h3>
                Pontos: {yourPoints}
            </h3>
        </div>
        </>
     );
}
 
export default IA;