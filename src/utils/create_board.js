function create_board(rows, columns, bombs) {
   let board = [];
   for (let row = 0; row < rows; row++) {
        let new_row = [];
        for (let col = 0; col < columns; col++) {
            new_row.push({
                x: row,
                y: col,
                flag: false,
                revealed: false,
                value: 0,
                bomb: false
            });
        }
        board.push(new_row);
    }
   let bomb_count = 0;
   while(bomb_count < bombs) {
    let x = random_num(0, rows - 1);
    let y = random_num(0, columns - 1);
    if (board[x][y].bomb === false) {
        board[x][y].bomb = true;
        board[x][y].value = "X";
        bomb_count++;
        
        for(let i = x-1; i <= x+1; i++) {
            for(let j = y-1; j <= y+1; j++) {
                if (i >= 0 && i < rows && j >= 0 && j < columns && !board[i][j].bomb) {
                    board[i][j].value++;    
                }
            } 
        }
    }
   }  
   console.log(board);
   return board;

}

function random_num(min = 0, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export default create_board;