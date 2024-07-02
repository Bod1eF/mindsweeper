import React from "react";

function Cell({details, rightClick, leftClick}) {
    return (
        <div className="cell"
        onContextMenu={(e) => rightClick(e, details.x, details.y)}
        onClick={(e) => leftClick(e, details.x, details.y)}>
            {details.revealed ? details.value : " "}
            {details.flag ? <h3>flag</h3> : ""}
        </div>
    );


}
export default Cell;