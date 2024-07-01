import create_board from "../utils/create_board";
import React, { useState, useEffect } from "react";

function Board() {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    function fresh_board() {
      const new_board = create_board(5, 5, 10);
      setGrid(new_board);
    }
    fresh_board();
  }, []);

  // Check if grid is an array and has elements before rendering
  if (!Array.isArray(grid) || grid.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((block, blockIndex) => (
            <div key={blockIndex} className="block">
              {block.value} {block.x}  {block.y}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;