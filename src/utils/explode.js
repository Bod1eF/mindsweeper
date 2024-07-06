function explode(grid, bomb_location) {
    if (!bomb_location || bomb_location.length === 0) {
        //loop through and reveal bombs manually as a back up
        for(let i = 0; i < grid.length; i++) {
            for(let j = 0; j < grid[0].length; j++) {
                if (!grid[i][j].revealed && grid[i][j].bomb) {
                    grid[i][j].revealed = true;
                    grid[i][j].flag= false;
                }
            }
        }
        return grid;
      }
    for(let i = 0; i < bomb_location.length; i++) {
        if (!grid[bomb_location[i][0]][bomb_location[i][1]].revealed && grid[bomb_location[i][0]][bomb_location[i][1]].bomb) {
            grid[bomb_location[i][0]][bomb_location[i][1]].revealed = true;
            grid[bomb_location[i][0]][bomb_location[i][1]].flag= false;
        }
    }
    return(grid); 
}

export default explode;