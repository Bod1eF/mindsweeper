import create_board from "../utils/create_board";
import React, { useState, useEffect } from "react";
import Cell from "./cell.js";
import Reveal from "../utils/reveal.js";
import Explode from "../utils/explode.js";

function Board() {
  const [grid, setGrid] = useState([]);
  const [nonMineCount, setMineCount] = useState(0);
  const [flagCount, setFlagCount] = useState(0);
  let first_click = true;
  let rowDim = 12;
  let colDim = 12;
  let mineCount = 25;
  useEffect(() => {
    function fresh_board() {
      let [new_board, bomb_location] = create_board(rowDim, colDim, mineCount);
      setGrid(new_board);
      setMineCount(rowDim * colDim - mineCount);
      setFlagCount(mineCount);
    }
    fresh_board();
  }, []);
  let newFlagCount = flagCount;
  const rightClick = (e, x, y) => {
    e.preventDefault(); //prevent right click menu from popping up
    const new_grid = grid.map(row => row.map(cell => ({ ...cell }))); //make deep copy to update grid state
    if (!new_grid[x][y].revealed) {
        if(!new_grid[x][y].flag) {
          new_grid[x][y].flag = true;
          newFlagCount = flagCount - 1;
        }
        else if (new_grid[x][y].flag) {
          new_grid[x][y].flag = false;
          newFlagCount = flagCount + 1;
        }
      setFlagCount(newFlagCount);
    }
    setGrid(new_grid);
    console.log(new_grid[x][y])
  }

  const leftClick = (e, x, y) => {
    let new_grid = grid.map(row => row.map(cell => ({ ...cell })));
    if(first_click) {
      first_click = false;
    }
    if (!new_grid[x][y].flag && !new_grid[x][y].bomb) {
      new_grid[x][y].revealed = true;
      let revealResult = Reveal(new_grid, x, y);
      new_grid = revealResult.grid;
      setMineCount(nonMineCount - revealResult.revealCount);
    }
    else if(new_grid[x][y].bomb) {
      new_grid[x][y].revealed = true;
      //explode();
    }
    setGrid(new_grid);
    // console.log(new_grid[x][y]);
  }

  return (
    <div>
      <div><p>{flagCount}</p></div>
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