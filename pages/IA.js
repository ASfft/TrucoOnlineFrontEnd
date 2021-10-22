import { useEffect, useState } from 'react'


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
   const [turn,setTurn] = useState("his");
   const [cardIndex,setCardIndex] = useState(-1)

    function botaoManeiro(index) {
        setCardIndex(index);
        if (turn == "his"){
            setTurn("your")
        } else if (turn == "your") {
            setTurn("his")
        }
    }

    useEffect(() => {
        console.log("sua " + yourCards.length)
    },[yourCards])

    useEffect(() => {
        console.log("dele " + hisCards.length)
    },[hisCards])

    useEffect(() => {

        console.log(turn)

        if (turn == "your"){

            setYourLastPlay([]);

            setDisableYourCards(true);        

            var removeArr1 = [...yourCards].filter(carta => carta[1] !== cardIndex)
            setYourCards(removeArr1);

            var removeArr2 = [...yourCards].filter(carta => carta[1] == cardIndex)
            setYourLastPlay(removeArr2.join().slice(0,-2));

            if (whoStarts == "he"){
                setTimeout(() => {
                    setYourLastPlay([]);
                    setHisLastPlay([]);
                    setDisableHisCards(false);
                }, 2000);
            } else {
                setDisableHisCards(false);
            }

            if (yourCards.length == 1 && whoStarts == "he") {
                setTimeout(() => {
                    setYourCards([["/cartas/4_of_clubs.png",1], ["/cartas/king_of_hearts.png",2], ["/cartas/7_of_diamonds.png",3]]);
                    setHisCards([["/cartas/3_of_spades.png",1], ["/cartas/king_of_hearts.png",2], ["/cartas/4_of_clubs.png",3]]);
                    setYourLastPlay([]);
                    setHisLastPlay([]);
                }, 2000);
            }
    

        } else {

            setHisLastPlay([])
            setDisableHisCards(true);

            var removeArr3 = [...hisCards].filter(carta => carta[1] !== cardIndex)
            setHisCards(removeArr3);

            var removeArr4 = [...hisCards].filter(carta => carta[1] == cardIndex)
            setHisLastPlay(removeArr4.join().slice(0,-2));

            if (whoStarts == "you"){
                setTimeout(() => {
                    setYourLastPlay([]);
                    setHisLastPlay([]);
                    setDisableYourCards(false)
                }, 2000);
            } else {
                setDisableYourCards(false)
            }

            if (hisCards.length == 1 && whoStarts == "you") {
                setTimeout(() => {
                    setYourCards([["/cartas/4_of_clubs.png",1], ["/cartas/king_of_hearts.png",2], ["/cartas/7_of_diamonds.png",3]]);
                    setHisCards([["/cartas/3_of_spades.png",1], ["/cartas/king_of_hearts.png",2], ["/cartas/4_of_clubs.png",3]]);
                    setYourLastPlay([]);
                    setHisLastPlay([]);
                }, 2000);
            }
        }



    },[turn])

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
                     <button disabled={disableHisCards} onClick={() => botaoManeiro(card[1])} ><img className="hiscards" src={card[0]} /></button>
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
                    <button disabled={disableYourCards} onClick={() => botaoManeiro(card[1])} ><img className="yourcards" src={card[0]} /></button>
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