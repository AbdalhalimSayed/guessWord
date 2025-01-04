const gameName = " Guess The Word ";
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Created By Abdalhalim &copy; ${new Date().getFullYear()}`;
// game fields

const numberTry = 5;
let numerletters = 6;
let currentTry = 1;
let wordGuess = "";
let words = ["Branch", "Master", "Elzero", "Create", "Update", "Delete", "school"];
wordGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
// Hints
let numberHints = 3;
document.querySelector(".hints span").innerHTML = numberHints;
function generateInput() {
  const containerInputs = document.querySelector(".inputs");
  for (let i = 1; i <= numberTry; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span> Try ${i} </span>`;
    if (i != 1) tryDiv.classList.add("disable-input");
    for (let j = 1; j <= numerletters; j++) {
      let inputField = document.createElement("input");
      inputField.type = "text";
      inputField.id = `guess-${i}-letter-${j}`;
      inputField.setAttribute("maxLength", "1");
      tryDiv.appendChild(inputField);
    }

    containerInputs.appendChild(tryDiv);
  }
  containerInputs.children[0].children[1].focus();
  // Make Disable for all input
  const inputDisable = document.querySelectorAll(".disable-input input");
  inputDisable.forEach((inpt) => inpt.disabled = true);
  const inputs = document.querySelectorAll("input");
  // convert letter to uppercase
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      if (!isNaN(parseInt(this.value))) {
        this.value = "";
      } else if (this.value) {
        let nextInput = inputs[index + 1];
        if (nextInput) nextInput.focus();
      } else if (this.value === "") {
        let nextInput = inputs[index];
        if (nextInput) nextInput.focus();
      }

    });
    input.addEventListener("keydown", (event) => {
      let currentInput = Array.from(inputs).indexOf(event.target);


      if (event.key == "ArrowRight") {
        let nextInput = currentInput + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key == "ArrowLeft") {
        let previousInput = currentInput - 1;
        if (previousInput >= 0) inputs[previousInput].focus();
      }
      if (event.key == "Backspace") {
        if (event.target.value !== "") {
          let previousInput = currentInput;
          if (previousInput >= 0) inputs[previousInput].focus();
        } else {
          let previousInput = currentInput - 1;
          if (previousInput >= 0) inputs[previousInput].focus();
        }



      }
    })
  });
}

let CheckLetter = document.querySelector(".check");
CheckLetter.addEventListener("click", guessLogic);
console.log(wordGuess);
function guessLogic() {

  let successGuess = true;
  for (let i = 1; i <= numerletters; i++) {
    const inputFild = document.querySelector(`#guess-${currentTry}-letter-${i}`)
    const letter = inputFild.value.toLowerCase();
    const actualLetter = wordGuess[i - 1];

    if (letter === actualLetter && letter !== "") {
      inputFild.classList.add("in-place");
    } else if (wordGuess.includes(letter) && letter !== "") {
      inputFild.classList.add("not-place");
      successGuess = false;
    }
    else if (letter !== "") {
      inputFild.classList.add("no");
      successGuess = false;
    }
    else if (letter == "") {
      successGuess = false;
    }
  }


  if (successGuess) {
    let msg = document.querySelector(".message");
    let divTry = document.querySelector(`.try-${currentTry}`);
    divTry.classList.add("disable-input");
    tryInput = document.querySelectorAll(`.try-${currentTry} input`);
    document.querySelector(".check").disabled = true;
    tryInput.forEach((input) => {
      // console.log(input);
      input.disabled = true;

    });
    const popWin = setTimeout(() => {
      msg.style.display = "flex";
      msg.innerHTML = `You Win After ${currentTry} Try <p>Congratulation</p>`;
      document.body.style.backgroundColor = "#EEE"
    }, 1000);
    setTimeout(() => {
      msg.style.display = "none";
      window.location.reload();
    }, 9000);
    msg.addEventListener("click", () => {
      msg.style.display = "none";
      // console.log("Message");
    })
  } else {
    let divTry = document.querySelector(`.try-${currentTry}`);
    divTry.classList.add("disable-input");
    tryInput = document.querySelectorAll(`.try-${currentTry} input`);

    tryInput.forEach((input) => {
      // console.log(input);
      input.disabled = true;

    });
    currentTry += 1;
    if (currentTry <= numberTry) {
      divTry = document.querySelector(`.try-${currentTry}`);
      divTry.classList.remove("disable-input");
      tryInput = document.querySelectorAll(`.try-${currentTry} input`);

      tryInput.forEach((input) => {
        input.disabled = false;

      });
      tryInput[0].focus();
    }
  }
  if (currentTry >= 6 && successGuess == false) {
    let msg = document.querySelector(".message");
    document.querySelector(".check").disabled = true;
    const popWin = setTimeout(() => {
      msg.style.display = "flex";
      msg.innerHTML = `You Lose After ${currentTry} Try <p>Try Again</p>`;
      document.body.style.backgroundColor = "#EEE"
    }, 1000);
    setTimeout(() => {
      msg.style.display = "none";
      window.location.reload();
    }, 9000);
    msg.addEventListener("click", () => {
      msg.style.display = "none";
      // console.log("Message");
    })
  }
}

document.querySelector(".hints").addEventListener("click", () => {
  if (numberHints > 0) {
    numberHints -= 1;
    document.querySelector(".hints span").innerHTML = numberHints;
    let enableInput = document.querySelectorAll("input:not([disabled])");
    let emptyInput = Array.from(enableInput).filter((input) => input.value === "");
    let randomIndex = Math.floor(Math.random() * emptyInput.length);
    let randomInput = emptyInput[randomIndex];
    let indexToFill = Array.from(enableInput).indexOf(randomInput);
    if (indexToFill != 0) {

      randomInput.value = wordGuess[indexToFill].toUpperCase();
      // randomInput.disabled = true;
    }
  }
})
window.onload = () => {
  generateInput();
};