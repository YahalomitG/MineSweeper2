'use strict'

// ****<!-- GAME DOES NOT WORK YET!,*****
//  WILL TRY TO SUBMIT AGAIN ON SATURDAY -->

const MINE = '💣'
const NORMAL = '🙂'
const EMPTY = ''
const LOSE = '🤯'
const WIN = '😎'
const HINT = '💡'
const MARK = '🚩'

var elRestartBtn = document.querySelector('restart')

var gBoard
var gGame
var gStartTime
var gTimerInterval
var gClicksNum
var gLevel = {
    size: 4,
    mines: 2
}



function OnInIt() {
    gGame = {
        isOn: true,
        isFirstClick: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        flagCount: 0,
        lives: 3
    }
    gBoard = buildBoard(gLevel.size)
    console.table(gBoard);
    renderBoard(gBoard)
    gClicksNum = 0
    document.querySelector('.restart-btn').innerText = NORMAL
    // restartGame()

}

function restartGame() {
    gGame = {
        isOn: false,
        isFirstClick: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        flagCount: 0,
        lives: 3
    }

    var lives = document.querySelector(' .lives').innerText
    document.querySelector(' .lives').innerText = lives

    clearInterval(gTimerInterval)
    document.querySelector(' .timer').innerText = '000⏱️'
    elRestartBtn.innerText = NORMAL

}


function buildBoard() {
    var size = gLevel.size
    const board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            const cell = {
                i: i,
                j: j,
                minesAroundCount: ' ',
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell
        }
    }
    board[0][0].isMine = true
    board[1][2].isMine = true
    return board;
}

function onCellClicked(elCell, i, j) {
    // console.log(gGame);
    // debugger
    var currCell = gBoard[i][j]
    // 
    if (!gGame.isOn) return
    if (currCell.isMarked) return

    currCell.isShown = true
    console.log(currCell);
    elCell.classList.add('opened')
    gClicksNum++
    gGame.shownCount++
    if (gGame.isFirstClick) {
        if (!gTimerInterval){
            startTimer()
            checkGameOver()
        } 
        // gGame.shownCount++
        
        // findMines(currCell)
        // minesCount(gBoard)
        gGame.isFirstClick = false
        gGame.isOn = true
    }
    if (currCell.isMine) {
        elCell.innerText = MINE
        gGame.lives--

        var lives = document.querySelector('.lives').innerText
        lives = lives.slice(2)
        document.querySelector('.lives').innerText = lives

        if (checkGameOver()) {
            gGame.isOn = false
            elRestartBtn.innerText = LOSE

            clearInterval(gTimerInterval)
        }

        if (!currCell.isMine) {
            elCell.style.color = '#c54914'
            elCell.innerText = currCell.minesAroundCount
        }else if (currCell.minesAroundCount) {
            renderCell(currCell, currCell.minesAroundCount)

    }

    // renderCell({i,j},'x')
}
}



function setMinesNegCount(board, rowIdx, colIdx) {
    var minesCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= colIdx.length) continue
            if (board[i][j].isMine) minesCount++

        }
    }
    return minesCount
}

function minesCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j]
            currCell.minesAroundCount = setMinesNegCount(i, j, board)
        }
    }

}

function OnChangeLevel(size, mines) {
    gLevel.size = size
    gLevel.mines = mines
    OnInIt()

}




function findMines(currCell) {
    var cells = getEmptyCells(gBoard)
    var location = getRandomCell(cells)


    for (var i = 0; i < gLevel.mines; i++) {
        location = getRandomCell(cells)

        if (currCell !== location) {
            gBoard[location.i][location.j].isMine = true

        } else {
            location = getEmptyCells(cells)
            gBoard[location.i][location.j].isMine = true

        }
    }
}







function renderLives() {
    document.querySelector('.lives').innerText = '❤️'.repeat(gGame.lives)

}

function onCellMarked(ev, i, j ) {
    ev.preventDefault()
    console.log('ok');
    gBoard[i][j].isMarked =  !gBoard[i][j].isMarked
    renderCell({i,j},MARK)


    // Called when a cell is right- clicked See how you can h ide the context
    // menu on right click
}

function checkGameOver() {
    // Game ends when all mines are marked, and all the other cells are shown
    if (gGame.shownCount + gGame.markedMines === gLevel.size * gLevel.size) { // The condition to win
        gGame.isOn = false
        clearInterval(gTimerInterval)
        document.querySelector('.restart-btn').innerText = WON
        if (gGame.lives === 0 || gGame.shownCount >= (gLevel.size ** 2) - gLevel.mines
        || gGame.shownCount >= gLevel.size ** 2 ){
            gGame.isOn = false
            clearInterval(gTimerInterval)
            document.querySelector('.restart-btn').innerText = LOSE
            
        }
    }
}

    // if (gGame.shownCount >= (gLevel.size ** 2) - gLevel.mines) return true
    
    // if (gGame.shownCount >= gLevel.size ** 2) return true

//     // return false
// }
// }

// function expandShown(board, elCell, i, j) {

//     // When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors. NOTE: start with 
//     // a basic implementation that only opens the non-mine 1st degree neighbors 
//     // BONUS: if you have the time later, try to work more like the real algorithm (see description at the Bonuses section below)

// }


