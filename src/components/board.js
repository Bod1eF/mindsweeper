import create_board from "../utils/create_board";
import React, { useState, useEffect } from "react";
import Cell from "./cell.js";
import Reveal from "../utils/reveal.js";
import explode from "../utils/explode.js";
import flag from "../img/flag1.png";
import Endscreen from "./Endscreen.js";

function Board() {
  const [grid, setGrid] = useState([]);
  const [nonMineCount, setMineCount] = useState(0);
  const [flagCount, setFlagCount] = useState(0);
  const [bomb_location, setBombs] = useState([]);
  const [firstClick, setClick] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  let rowDim = 15;
  let colDim = 15;
  let mineCount = 50;

  function fresh_board() {
    let [new_board, new_bombs] = create_board(rowDim, colDim, mineCount);
    setGrid(new_board);
    setMineCount(rowDim * colDim - mineCount);
    setFlagCount(mineCount);
    setBombs(new_bombs);
    setGameOver(false);
    setWin(false);
    }

  useEffect(() => {
    fresh_board();
  }, [rowDim, colDim, mineCount]);

  const restartGame = () => {
    fresh_board();
  };

  let newFlagCount = flagCount;
  const rightClick = (e, x, y) => {
    e.preventDefault(); //prevent right click menu from popping up
    const new_grid = grid.map(row => row.map(cell => ({ ...cell }))); //make deep copy to update grid state
    if (!new_grid[x][y].revealed && !gameOver) {
        if(!new_grid[x][y].flag) {
          new_grid[x][y].flag = true;
          newFlagCount = flagCount - 1;
        }
        else if (new_grid[x][y].flag) {
          new_grid[x][y].flag = false;
          newFlagCount = flagCount + 1;
        }
      setFlagCount(newFlagCount);
      setGrid(new_grid);
    }
  }

  const leftClick = (e, x, y) => {
    if (grid[x][y].revealed || gameOver) {
      return;
    }
    let new_grid = grid.map(row => row.map(cell => ({ ...cell })));
    if(firstClick) {
      let bomb_loc;
      setClick(false);
      while (new_grid[x][y].value !== 0) {
        [new_grid, bomb_loc] = create_board(rowDim, colDim, mineCount);
      }
      setBombs(bomb_loc);
    }
    if (!new_grid[x][y].flag && !new_grid[x][y].bomb) {
      new_grid[x][y].revealed = true;
      let revealResult = Reveal(new_grid, x, y);
      new_grid = revealResult.grid;
      setMineCount(nonMineCount - revealResult.revealCount);
    }
    else if(grid[x][y].bomb) {
      new_grid[x][y].revealed = true;
      new_grid = explode(new_grid, bomb_location);
      setGameOver(true);
    }
    setGrid(new_grid);
    if (nonMineCount - Reveal(new_grid, x, y).revealCount === 0) {
      setGameOver(true);
      setWin(true);
    }
  }

  return (
    <div id="game_container">
       {gameOver && <Endscreen win = {win} restartGame={restartGame} />}

      <div id="board_container">
      <h1 className = "header">MindSweeper</h1>
      <div className="counter_container">
      <div><img className = "flag" src={flag} alt = "red flag icon" /><p className = "counter">{flagCount}</p></div>
      <div><div className = "cell" id = "cell_icon"></div><p className = "counter">{nonMineCount}</p></div>
      </div>
      <div id="board">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((block, blockIndex) => (
              <Cell key = {blockIndex} details = {block} rightClick = {rightClick} leftClick = {leftClick} />
          ))}
        </div>
      ))}
      </div>
      </div>
    </div>
  );
}

export default Board;