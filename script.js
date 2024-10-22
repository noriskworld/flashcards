let flashcards = [];
let currentCardIndex = 0;

const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const flipButton = document.getElementById('flip');
const nextButton = document.getElementById('next');

function loadCSV() {
    Papa.parse('flashcards.csv', {
        download: true,
        header: true,
        complete: function(results) {
            flashcards = results.data;
            showCard();
        }
    });
}

function showCard() {
    if (flashcards.length > 0) {
        const card = flashcards[currentCardIndex];
        questionElement.textContent = card.question;
        answerElement.textContent = card.answer;
        answerElement.classList.add('hidden');
    }
}

function flipCard() {
    answerElement.classList.toggle('hidden');
}

function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    showCard();
}

flipButton.addEventListener('click', flipCard);
nextButton.addEventListener('click', nextCard);

loadCSV();