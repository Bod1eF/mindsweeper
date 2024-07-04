import create_board from "../utils/create_board";
import React, { useState, useEffect } from "react";
import Cell from "./cell.js";
import Reveal from "../utils/reveal.js";

function Board() {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    function fresh_board() {
      let new_board = create_board(10, 10, 25);
      setGrid(new_board);
    }
    fresh_board();
  }, []);

  const rightClick = (e, x, y) => {
    e.preventDefault(); //prevent right click menu from popping up
    const new_grid = grid.map(row => row.map(cell => ({ ...cell }))); //make deep copy to update grid state
    if (!new_grid[x][y].revealed) {
      new_grid[x][y].flag = !new_grid[x][y].flag;
    }
    setGrid(new_grid);
    console.log(new_grid[x][y])
  }

  const leftClick = (e, x, y) => {
    const new_grid = grid.map(row => row.map(cell => ({ ...cell })));
    if (!new_grid[x][y].flag && new_grid[x][y].bomb) {
      new_grid[x][y].revealed = true;
      // reveal(new_grid, x, y);
    }
    else if(new_grid[x][y].bomb) {
      new_grid[x][y].revealed = true;
      //explode();
    }
    setGrid(new_grid);
    console.log(new_grid[x][y])
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