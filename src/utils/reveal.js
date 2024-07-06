function reveal(grid, x, y) {
    let revealCount = 1;
    let zeros = [];
    zeros.push(grid[x][y]);
     
    let rows = grid.length;
    let cols = grid[0].length;

    while(zeros.length > 0) {
        let top = zeros.pop();
        if(!top.revealed) {
            top.revealed = true;
            grid[top.x][top.y].revealed = true;
            grid[top.x][top.y].flag = false;
            revealCount++ 
        }
        if(top.value !== 0) {
            continue;
        }
        let topX = top.x;
        let topY = top.y;
        for(let i = topX-1; i <= topX+1; i++) {
            for(let j = topY-1; j <= topY+1; j++) {
                if(!(i === topX && j === topY)) {
                    if (i >= 0 && i < rows && j >= 0 && j < cols && !grid[i][j].revealed && !grid[i][j].bomb) {
                        zeros.push(grid[i][j]);    
                    }
                }
            } 
        }
    }
    return {grid, revealCount};
}
export default reveal;