import React from "react";
import flag from "../img/flag.svg";

function Cell({details, rightClick, leftClick}) {
    return (
        <div className={details.revealed ? "cell_revealed" : "cell"}
        onContextMenu={(e) => rightClick(e, details.x, details.y)}
        onClick={(e) => leftClick(e, details.x, details.y)}>
            <h3 className="cell_values"> {details.revealed ? details.value : " "} </h3>
            {details.flag ? <img className = "flag" src={flag} alt = "red flag icon" /> : ""}
        </div>
    );


}
export default Cell;