let gameCommentaryText=document.getElementById('game-commentary');
const restartButton=document.getElementById('restart');
let turn=true;
let turnCount=0;
const player1="X";
const player2="O";
const winConditions=[
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

gameCommentaryText.innerText="X's turn now. Please make a move";

function clicked(cellId){
    let player=(turn)?player1:player2;
    let nextPlayer=(!turn)?player1:player2;
    gameCommentaryText.innerText=`${nextPlayer}'s turn now. Please make a move`;
    document.getElementById(cellId).innerText=(turn)?player1:player2;
    cellValue=getCellValue(cellId);
    turnCount++;
    console.log(turnCount);
    let winner={};
    winner=checkForWin(cellValue);
    if(winner.hasWinner){
        winner.winningMoves.forEach(cell=>{
            document.getElementById(cell).style.background='#f5f5f5';
        })
        // const gameWinner=turn?player1:player2;
        gameCommentaryText.innerText=`${player} has won the game`;
    }
    if(!winner.hasWinner && turnCount>=9){
        gameCommentaryText.innerText=`What a thrilling game! Unfortunately it ended in a draw.`;
    }
    turn=!turn;
}

function checkForWin(cellValue){
    let hasWinner=false;
    let winningMoves=[]
    winConditions.map(condition=>{
        if(getCellValue(condition[0])===cellValue && getCellValue(condition[1])===cellValue && getCellValue(condition[2])===cellValue){
            hasWinner=true;
            winningMoves=condition;
        }

    })
    return {
        hasWinner,
        winningMoves
    };

}


function getCellValue(cellId){
    return document.getElementById(cellId).innerText;
}

function restartGame(){
    const cells=[1,2,3,4,5,6,7,8,9]
    cells.forEach(cell=>{
        document.getElementById(cell).innerText='';
        document.getElementById(cell).style.background='#fff';
    })
    turn=true;
    turnCount=0;
}


if(annyang){
    let commands={
        'go to *position':function(position){
            let cellPosition=position;
            // cellPosition=(typeof position==='number')?position:WtoN.convert(position);
            if((typeof position)==='string'){
                // console.log(position)
                switch (position) {
                    case 'one':
                        cellPosition=1;
                        break;
                    case 'to':
                        cellPosition=2;
                    break;
                    case 'it':
                    case 'wait':
                        cellPosition=8;
                    break;
                    default:
                        break;
                }
            }
            cellPosition=parseInt(cellPosition);
            if((typeof cellPosition)==='number'&& cellPosition>0  && cellPosition<10){
                clicked(cellPosition);
            }else{
                gameCommentaryText.innerText="Couldn't recognize the position. Please try again clearly";
            }
        },
        'restart game':restartGame
    }
    annyang.addCommands(commands);
    annyang.start();
}