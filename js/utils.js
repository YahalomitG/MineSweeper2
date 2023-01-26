'use strict'

function startTimer() {
    
    gTimerInterval = setInterval(() => {
        gGame.secsPassed++
        var elH2 = document.querySelector(' .timer')
        elH2.innerText = '0' + gGame.secsPassed
    }, 1000);

}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            // var minesCount = setMinesNegCount(board, i, j)
            // cell.minesAroundCount = minesCount
            const className = `cell cell-${i}-${j}`
            strHTML += `<td class="${className}" 
            onclick="onCellClicked(this,${i} , ${j} )" 
            oncontextmenu="onCellMarked(event, ${i}, ${j})"> ${cell.minesAroundCount}</td>`
        }
        strHTML += '</tr>'
    }

    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function getEmptyCells(board) {
    var cells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (!board[i][j].isMine) {
                cells.push({ i, j })
            } 
        }
    } return cells
}

function getRandomCell(cells) {
    var randIdx = getRandomInt(0, cells.length)
    return cells.splice(randIdx, 1)[0]
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

