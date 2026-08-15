const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const restart = document.getElementById("restart");
const winLine = document.getElementById("winLine");

let currentPlayer = "X";
let gameOver = false;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach((cell) => {

    cell.addEventListener("click", () => {

        if (cell.textContent !== "" || gameOver) {
            return;
        }

        cell.textContent = currentPlayer;

        if (currentPlayer === "X") {
            cell.classList.add("x");
        } else {
            cell.classList.add("o");
        }

        const winningPattern = checkWinner();

        if (winningPattern) {

            status.textContent = "Player " + currentPlayer + " Wins!";

            gameOver = true;

            drawWinningLine(winningPattern);

            return;
        }

        if (checkDraw()) {

            status.textContent = "It's a Draw!";

            gameOver = true;

            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";

        status.textContent = "Player " + currentPlayer + "'s Turn";
    });
});


function checkWinner() {

    for (let pattern of winningPatterns) {

        let a = cells[pattern[0]].textContent;
        let b = cells[pattern[1]].textContent;
        let c = cells[pattern[2]].textContent;

        if (a !== "" && a === b && b === c) {
            return pattern;
        }
    }

    return null;
}


function checkDraw() {

    for (let cell of cells) {

        if (cell.textContent === "") {
            return false;
        }
    }

    return true;
}


function drawWinningLine(pattern) {

    const firstCell = cells[pattern[0]];
    const lastCell = cells[pattern[2]];

    const boardRect = document.querySelector(".board").getBoundingClientRect();

    const firstRect = firstCell.getBoundingClientRect();
    const lastRect = lastCell.getBoundingClientRect();

    const x1 = firstRect.left + firstRect.width / 2 - boardRect.left;
    const y1 = firstRect.top + firstRect.height / 2 - boardRect.top;

    const x2 = lastRect.left + lastRect.width / 2 - boardRect.left;
    const y2 = lastRect.top + lastRect.height / 2 - boardRect.top;

    const distance = Math.sqrt(
        Math.pow(x2 - x1, 2) +
        Math.pow(y2 - y1, 2)
    );

    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    winLine.style.width = distance + "px";
    winLine.style.left = x1 + "px";
    winLine.style.top = y1 + "px";
    winLine.style.transform = "rotate(" + angle + "deg)";
    winLine.style.display = "block";
}


restart.addEventListener("click", () => {

    cells.forEach((cell) => {

        cell.textContent = "";

        cell.classList.remove("x");
        cell.classList.remove("o");
    });

    winLine.style.display = "none";

    currentPlayer = "X";
    gameOver = false;

    status.textContent = "Player X's Turn";
});