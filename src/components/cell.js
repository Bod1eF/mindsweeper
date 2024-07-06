import React from "react";
import flag from "../img/flag1.png";
import bomb from "../img/bomb_icon.png";
import {bgColor, numColor} from "../utils/cell_style.js";


function Cell({details, rightClick, leftClick}) {
    const cell_background = {
        backgroundColor: bgColor(details.x, details.y, details.revealed, details.bomb),
        color: numColor(details.value)
    };

    return (
        <div className="cell" style = {cell_background}
        onContextMenu={(e) => rightClick(e, details.x, details.y)}
        onClick={(e) => leftClick(e, details.x, details.y)}>
            <h3 className="cell_values" style = {cell_background} > {details.revealed && details.value !== 0 && !details.bomb ? details.value : " "} </h3>
            {details.flag ? <img className = "flag" src={flag} alt = "red flag icon" /> : ""}
            {details.bomb && details.revealed ? <img className = "flag" src={bomb} alt = "a minesweeper bomb" /> : ""}
        </div>
    );

}
export default Cell;