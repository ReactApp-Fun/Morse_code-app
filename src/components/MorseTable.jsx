import React from "react";
import './css/table.css'
import MorseDisplay from './children-components/MorseDisplay'
import MorseInteractive from './children-components/MorseInteractive'
import MorseButton from './children-components/MorseButton'

function MorseTable(){
    return(
        <div className="morse-align">
            <div className="morse-table">
                <p className="title"> Morse </p>
                <div className="morse-table-align">
                    <MorseDisplay />
                    <MorseInteractive />
                    <MorseButton />
                </div>
            </div>
        </div>
    )
}

export default MorseTable 