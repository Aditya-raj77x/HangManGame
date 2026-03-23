// creating  word display and li element and hint word
const wordDisplay = document.querySelector(".word-display");
const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    //console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    wordDisplay.innerHTML = word
        .split("")
        .map(() => `<li class="letter"></li>`)
        .join("");
}

// creating keyboard buttons using js instead of hardcoding in html
const keyboardDiv = document.querySelector(".keyboard");
for (let i = 65; i <= 90; i++) {
    // console.log(String.fromCharCode(i));
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
}


getRandomWord();
