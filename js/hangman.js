const wordEl = document.getElementById('word')
wrongLettersEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-button')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')
const figureParts = document.querySelectorAll('.figure-part')

const word = ['application', 'programming', 'interface', 'wizard']

let selectedIndex = Math.floor(word.length * Math.random())
let selectedWord = word[selectedIndex]
var ourword = selectedWord

const correctLetters = []
const wrongLetters = []

let gameGoing = true;

//Show hidden word
function displayWord() {
    if(gameGoing) {
        wordEl.innerHTML = `
            ${selectedWord
                .split('')
                .map(letter => `
                    <span class="letter">
                        ${correctLetters.includes(letter) ? letter : ''}
                    </span>
                ` ).join('')
            }
        `
        const innerWord = wordEl.innerText.replace(/\n/g, '')

        if (innerWord == selectedWord) {
            finalMessage.innerText = 'Congratulations! You Won!'
            popup.style.display = 'flex'
            gameGoing = false;
        }
        else {
            display(selectedWord)
        }
    }
}

// Update the wrong letters
function updateWrongLettersEl() {
    //Display wrong letters
    if(gameGoing) {
        wrongLettersEl.innerHTML = `
            ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
            ${wrongLetters.map(letter => `<span>${letter}</span>`)}
        `
    //Display Parts
        figureParts.forEach((part, index) => {
            const errors = wrongLetters.length

            if (index < errors) {
                part.style.display = 'block'
            }   else {
                part.style.display = 'none'
            }
    })

        //Check if lost
        if (wrongLetters.length == figureParts.length) {
            finalMessage.innerText = `Unfortunately you lost! The word was ${ourword}`;
            popup.style.display = 'flex'
            console.log("The word was" + ourword);
            gameGoing = false;

        }
    }
}

//Show Notification
function showNotification() {
    if(gameGoing) {
        notification.classList.add('show')

        setTimeout(() => {
            notification.classList.remove('show')
        }, 2000)
    }
}

//Keydown letter press
window.addEventListener('keydown', e => {
    if(gameGoing){
        if (e.keyCode >= 65 && e.keyCode <=90) {
            const letter = e.key

            if (selectedWord.includes(letter)) {
                if( !correctLetters.includes(letter)) {
                    correctLetters.push(letter)

                    displayWord()
                }   else {
                    showNotification()
                }
            }   else {
                if(!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter)

                    updateWrongLettersEl()
                }   else {
                    showNotification()
                }
            }

        }
    }
})


//Restart Game
 playAgainBtn.addEventListener('click', () => {
    gameGoing = true;
    correctLetters.length = 0
    wrongLetters.length = 0

    selectedIndex = Math.floor(word.length * Math.random())
    selectedWord = word[selectedIndex]

    displayWord()

    updateWrongLettersEl()

    popup.style.display = 'none'
 })

displayWord()
