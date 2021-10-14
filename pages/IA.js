import { useState } from 'react'


const IA = () => {

    const [yourCards,setYourCards] = useState([["/cartas/4_of_clubs.png",1], ["/cartas/king_of_hearts.png",2], ["/cartas/7_of_diamonds.png",3]]);
    const [hisCards,setHisCards] = useState([["/cartas/3_of_spades.png",1], ["/cartas/king_of_hearts.png",2], ["/cartas/4_of_clubs.png",3]]);
    const [yourLastPlay,setYourLastPlay] = useState([]);
    const [hisLastPlay,setHisLastPlay] = useState([]);

    function jogadaSua(card) {

        setYourLastPlay([])

        var removeArr1 = [...yourCards].filter(carta => carta[1] !== card[1])
        setYourCards(removeArr1);

        var removeArr2 = [...yourCards].filter(carta => carta[1] == card[1])
        setYourLastPlay(removeArr2[0][0]);

}

    function jogadaDele(card) {

        setHisLastPlay([])

        var removeArr1 = [...hisCards].filter(carta => carta[1] !== card[1])
        setHisCards(removeArr1);

        var removeArr2 = [...hisCards].filter(carta => carta[1] == card[1])
        setHisLastPlay(removeArr2[0][0]);

    }


    return ( 
        <div className="gametable">
            <div className="cards">
            {hisCards.map(card =>
                <div key={card[1]}>
                     <button onClick={() => jogadaDele(card)} ><img className="hiscards" src={card[0]} /></button>
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
                    <button onClick={() => jogadaSua(card)} ><img className="yourcards" src={card[0]} /></button>
                </div>
                )}
            </div>
        </div>
     );
}
 
export default IA;