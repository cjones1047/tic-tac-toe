const box = [
    "top-left",
    "top-mid",
    "top-right",
    "mid-left",
    "mid-mid",
    "mid-right",
    "bottom-left",
    "bottom-mid",
    "bottom-right"
];

const letterOptions = [
    "X",
    "O"
]

const board = {
    playerXmoves: [],
    playerOmoves: []
}

const ways = [123, 159, 147,
            258, 357, 369,
            456, 789
]

let lastLetter;

let play = "ON";

const whichLetter = () => {
    if(lastLetter === undefined) {
        const randomNumber = Math.floor(Math.random()*letterOptions.length);
        lastLetter = letterOptions[randomNumber];
        return lastLetter;
    } 
    if(lastLetter === "X") {
        lastLetter = "O";
        return "O";
    } else {
        lastLetter = "X";
        return "X";
    }
}

function fillBox(event) {
    if(play === "OFF") return;
    
    const clickedBox = event.target.getAttribute("id");

    if(clickedBox === "grid") {
        return; // so that clicking the grid border doesn't do anything and the grid elements themelves have to be clicked
    }

    const fillElement = document.getElementById(clickedBox);
    if(fillElement.innerText === lastLetter) {
        return; // so that an already clicked grid element doesn't fill with an alternate letter when re-clicked
    }

    
    fillElement.innerText = whichLetter();

    for(let i=0;i<letterOptions.length;i++) {
        if(lastLetter !== letterOptions[i]) {
            changeFooter = document.querySelector("#footer");
            changeFooter.innerText = "Next up: Player "+letterOptions[i];
        }
    }
    
    player = fillElement.innerText;
    declareWinner(clickedBox,player);
}

const gridClicked = document.querySelector("#grid");
gridClicked.addEventListener("click",fillBox);
const resetClicked = document.querySelector("#reset-button");
resetClicked.addEventListener("click",resetGame);

function declareWinner(lastMove,lastPlayer) {
    for(let i=0;i<box.length;i++) {
        if(lastMove === box[i]) {
            if(lastPlayer === "X") {
                board.playerXmoves.push(i+1);
                for( let w=0;w<ways.length;w++) {
                    let combo = ways[w].toString().split('');
                    for(let t=0;t<combo.length;t++) {
                        findT = board.playerXmoves.includes(Number(combo[t]));
                        if(findT === false) {
                            t = combo.length;
                        }
                        if(t === combo.length-1) {
                            console.log("Player "+player+" wins!");
                            play = "OFF";
                            addElement(player);
                        }

                    }
                }
            }
            if(lastPlayer === "O") {
                board.playerOmoves.push(i+1);
                for( let w=0;w<ways.length;w++) {
                    let combo = ways[w].toString().split('');
                    for(let t=0;t<combo.length;t++) {
                        findT = board.playerOmoves.includes(Number(combo[t]));
                        if(findT === false) {
                            t = combo.length;
                        }
                        if(t === combo.length-1) {
                            console.log("Player "+player+" wins!");
                            play = "OFF";
                            addElement(player);
                        }
                            
                    }
                }
            }
        }
    }
    if(board.playerXmoves.length+board.playerOmoves.length >= 9) {
        console.log("You two tied!");
        play = "OFF";
        addElement("Tie");
        return;
    }
}


function addElement (winner) {
    const newDiv = document.querySelector("#footer");
    let newDivText;
    if(winner === "Tie") {
        newDivText = "You tied!";
    } else {
        newDivText = "Player "+winner+" won!";
    }
    newDiv.innerText = newDivText;
}

function resetGame(event) {
    for(let i=0;i<box.length;i++) {
        const clearBoxes = document.getElementById(box[i]);
        clearBoxes.innerText = " ";
    }
    const resetFooter = document.getElementById("footer");
    resetFooter.innerText = "Let's play again";
    play = "ON";
    lastLetter = undefined;
    for(let x=0;x<board.playerXmoves.length;x++) {
        board.playerXmoves.pop();
        x--;
    }
    for(let o=0;o<board.playerOmoves.length;o++) {
        board.playerOmoves.pop();
        o--;
    }
}
