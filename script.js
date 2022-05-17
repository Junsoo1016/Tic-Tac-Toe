const title = document.createElement('h1')
title.setAttribute('id', 'title')
document.body.appendChild(title)

const container = document.createElement('div')
container.setAttribute('id', 'container')
document.body.appendChild(container)

const resetBtn = document.createElement('button')
resetBtn.setAttribute('id', 'reset')
resetBtn.innerText = 'reset'
document.body.appendChild(resetBtn)

let playerOneTurn = true
let turns = 0
let board = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8
]

function makeBoxes (num) {
    for(i = 0 ; i < num ; i++) {
        let cell = document.createElement('div')
        container.appendChild(cell).className = 'grid-item'
        cell.setAttribute('id', `${i}`)
    }
}
makeBoxes(9)
const boxes = document.querySelectorAll('.grid-item')
console.log(boxes)

if(playerOneTurn) {
    title.innerText = "Player 1's Turn"
} else {
    title.innerText = "Player 2's Turn"
}

const checkWinner = () => {
    console.log("inside of checkWinner: ", turns);

    if ((board[0] === board[1] && board[0] === board[2])||
        (board[3] === board[4] && board[3] === board[5])||
        (board[6] === board[7] && board[6] === board[8])||
        (board[0] === board[3] && board[0] === board[6])||
        (board[1] === board[4] && board[1] === board[7])||
        (board[2] === board[5] && board[2] === board[8])||
        (board[0] === board[4] && board[0] === board[8])||
        (board[2] === board[4] && board[2] === board[6]))
    {
        if (playerOneTurn) {
            title.innerText = "Player 1 Wins!"
        } else {
            title.innerText = "Player 2 Wins!"
        }
        boxes.forEach(box => {
            box.removeEventListener('click', clickEvent)
        })
    } else if (turns >= 9) {
        title.innerText = "It's a tie!"
    }
}

const clickFuction = (e) => {
    if (playerOneTurn) {
        e.target.style.backgroundColor = 'red'
        title.innerText = "Player 2's Turn"
    } else {
        e.target.style.backgroundColor = 'blue'
        title.innerText = "Player 1's Turn"
    }
    
    board[e.target.id] = playerOneTurn
    console.log(board);

    turns++
    console.log("Inside of clickEvent: ", turns);
    checkWinner()
    
    playerOneTurn = !playerOneTurn
    e.target.removeEventListener('click', clickFuction)
}

boxes.forEach(box => {
    box.addEventListener('click', clickFuction)
})

resetBtn.addEventListener('click', () => {
    boxes.forEach(box => {
        box.style.backgroundColor = 'black'
        box.addEventListener('click', clickFuction)
    })
    playerOneTurn = true
    turns = 0
    title.innerText = "Player 1's Turn"
    board = [0, 1, 2, 3, 4, 5, 6, 7, 8]
})