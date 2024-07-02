import create_board from "../utils/create_board";
import React, { useState, useEffect } from "react";
import Cell from "./cell.js";

function Board() {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    function fresh_board() {
      let new_board = create_board(6, 6, 10);
      setGrid(new_board);
    }
    fresh_board();
  }, []);

  const rightClick = (e, x, y) => {
    e.preventDefault();
    const new_grid = grid.map(row => row.map(cell => ({ ...cell })));
    console.log("right click");
    new_grid[x][y].flag = !new_grid[x][y].flag;
    setGrid(new_grid);
    console.log(new_grid[x][y])
  }

  const leftClick = (e, x, y) => {
    const new_grid = grid.map(row => row.map(cell => ({ ...cell })));
    if (!new_grid[x][y].flag) {
      new_grid[x][y].revealed = true;
    }
    else if(new_grid[x][y].bomb) {
      //explode();
    }
    setGrid(new_grid);
    console.log(new_grid[x][y])
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
              <Cell key = {blockIndex} details = {block} rightClick = {rightClick} leftClick = {leftClick} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;