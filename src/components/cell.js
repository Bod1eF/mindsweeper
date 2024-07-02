import React from "react";

function Cell({details}, {rightClick}) {
    return (
        <div className="cell"
        onContextMenu={(e) => rightClick(e, details.x, details.y)}
        onClick={() => console.log(details)}>
            {details.value}
        </div>
    );


}
export default Cell;