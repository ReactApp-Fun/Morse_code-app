import React from "react";
import '../css/display.css'
import transfer from '../../assets/transfer.svg'

function MorseDisplay (){
    return(
        <div className="display-main">
            <div className="display-text">
                <div className="display-inside-table">
                </div>
            </div>
            <img src={transfer} alt="transfer" style={{margin: "0px 10px", width: "50px"}}></img>
            <div className="display-morse">
                <div className="display-inside-table">
                    
                </div>
            </div>
        </div>
    )
}

export default MorseDisplay 