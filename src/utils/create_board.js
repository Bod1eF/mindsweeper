function create_board(rows, columns, bombs) {
   let board = [];
   for (let row = 0; row < rows; row++) {
        let new_row = [];
        for (let col = 0; col < columns; col++) {
            new_row.push({
                x: col,
                y: row,
                flag: false,
                revealed: false,
                value: "X",
            });
        }
        board.push(new_row);
    }
   console.log(board);
   return board;

}
export default create_board;