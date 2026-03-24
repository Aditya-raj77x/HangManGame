const hangManImg = document.querySelector(".hangman-box img");
const displayHint = document.querySelector(".hint-text b");
const wordDislay = document.querySelector(".word-display");
const guessedText = document.querySelector(".guess-text b");
const gameModel = document.querySelector(".game-model");
const playAgainbtn = document.querySelector(".play-again");
let currentWord, correctLetters, wrognGuessCount;
const maxGuress = 6;
//creating hint and word(dynamiclally)
const resetGame = () => {
    correctLetters = [];
    wrognGuessCount = 0;
    wordDislay.innerHTML = currentWord.split("").map(() => '<li class="letter"></li>').join("");
    gameModel.classList.remove("show");
    hangManImg.src = `assets/hangman-${0}.svg`
    guessedText.innerHTML = `${wrognGuessCount}/${maxGuress}`;
    keyboardDIV.querySelectorAll("button").forEach(btn => btn.disabled = false);

}
const getRandomWord = () => {

    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    //console.log(hint, word)
    currentWord = word;
    displayHint.innerHTML = hint;
    resetGame()
    wordDislay.innerHTML = word.split("").map(() => '<li class="letter"></li>').join("");

}
// game over function
const gameOver = (isVictory) => {
    setTimeout(() => {
        const modelText = isVictory ? 'you found the word :' : 'thw correct wordwas:';
        gameModel.querySelector("img").src = `assets/${isVictory ? 'victory' : 'lost'}.gif`
        gameModel.querySelector("h1").innerText = `${isVictory ? 'You Win' : 'you lost'}`;
        gameModel.querySelector("p").innerHTML = `${modelText}<b>${currentWord}</b>`;
        gameModel.classList.add("show");
    }, 300)
}

// function initGame(button,clickedletter){

// }
// main game function
const initGame = (button, clickedletter) => {
    // console.log(clickedletter);
    // console.log(button)
    console.log(currentWord);

    //check if click key word me hai ya nhi hai 
    if (currentWord.includes(clickedletter)) {
        //console.log(clickedletter, "nikal")
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedletter) {
                correctLetters.push(letter);
                wordDislay.querySelectorAll("li")[index].innerText = letter;
                wordDislay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    }
    else {
        // console.log(clickedletter, "not exit")
        wrognGuessCount++;
        // gatal click me hang man image change hoti jayegi
        hangManImg.src = `assets/hangman-${wrognGuessCount}.svg`


    }
    button.disabled = true;
    guessedText.innerHTML = `${wrognGuessCount}/${maxGuress}`;
    // calling gameOver functon if one of these met 
    if (wrognGuessCount === maxGuress) return gameOver(false)
    if (correctLetters.length === currentWord.length) return gameOver(true)
}
// button creation
const keyboardDIV = document.querySelector(".keyboard");
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerHTML = String.fromCharCode(i);
    keyboardDIV.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
}
getRandomWord()
playAgainbtn.addEventListener("click", getRandomWord);