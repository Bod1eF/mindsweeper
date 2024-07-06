function bgColor(x, y, revealed, bomb) {
        if(revealed) {
            if(bomb) {
                let colors = ["orange", "darkgreen", "cyan", "violet", "yellow"];
                return colors[Math.floor(Math.random() * colors.length)];
            }
            if((x + y) % 2 === 0) {
                return "#e5c29f"; //revealed even tile
            }
            else {
                return "#d7b899"; //revealed odd tile
            }
        }
        else {
            if((x + y) % 2 === 0) {
                return "#aad751"; //hidden even tile
            }
            else {
                return "#a2d249"; //hidden odd tile
            }
        }
}

function numColor(value) {
   const colors = {
    0:"black",
    1:"blue",
    2:"green",
    3:"red",
    4:"purple",
    5:"darkred",
    6:"yellow",
    7:"black",
    8:"grey",
    "X":"black"
   }
   return colors[value];

}

export {bgColor, numColor};