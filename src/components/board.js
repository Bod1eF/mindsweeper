import create_board from "../utils/create_board";
import React, { useState, useEffect } from "react";
import Cell from "./cell.js";

function Board() {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    function fresh_board() {
      const new_board = create_board(6, 6, 10);
      setGrid(new_board);
    }
    fresh_board();
  }, []);



  const rightClick = (e, x, y) => {
    e.preventDefault();
    console.log("right click");

  }


  // Check if grid is an array and has elements before rendering
  if (!Array.isArray(grid) || grid.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((block, blockIndex) => (
              <Cell key = {blockIndex} details = {block} rightClick = {rightClick} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;