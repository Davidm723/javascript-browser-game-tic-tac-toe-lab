//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.

/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEls = document.querySelector('#message');
console.log(messageEls);
const resetBtnEl = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/
const updateBoard = () => {
    squareEls.forEach((square, index) => {
        square.textContent = board[index];
        console.log(square.textContent)
        console.log(board[index])
    });
}

const updateMessage = () => {
    if(winner === false && tie === false){
        messageEls.textContent = `It's ${turn}'s turn.`
    } else if(winner === false && tie === true){
        messageEls.textContent = "It's a tie!"
    } else {
        messageEls.textContent = 'You win!'
    }
}

const render = () => {
    updateBoard();
    updateMessage();
}

const init = () => {
    board = [
            '','','',
            '','','',
            '','',''
        ];
    turn = 'X';
    winner = false;
    tie = false;
    render();
}

const handleClick = (e) => {
    const squareIdx = parseInt(e.target.id);
    if(board[squareIdx] === 'X' || board[squareIdx === 'O' ]|| winner === true){
        return;
    }
    placePiece(squareIdx);
    checkForWinner();
    console.log(winner);
    checkForTie();
    switchPlayerTurn();
    render();
}

const placePiece = (index) => {
    board[index] = turn;
    console.log(board);
}

const checkForWinner = () => {
    winningCombos.forEach(([a, b, c]) =>{
        if(board[a] !== '' && board[a] === board[b] && board[a] === board[c]){
            winner = true;
        }
    })
}

const checkForTie = () => {
    if(winner === true){
        return;
    } else if(board.includes('')){
        tie = false;
    } else {
        tie = true;
    }
}

const switchPlayerTurn = () => {
    if(winner === true){
        return;
    } else if (turn === 'X'){
        turn = 'O';
    } else {
        turn = 'X';
    }
}
init();
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((square) => {
    square.addEventListener('click', handleClick)
});
resetBtnEl.addEventListener('click', init);