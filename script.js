let flashcards = [];
let currentCardIndex = 0;
let isAnswerShown = false;

const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const toggleButton = document.getElementById('toggle');
const prevButton = document.getElementById('prev');
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
        questionElement.innerHTML = `<strong>Q:</strong> ${card.question}`;
        answerElement.innerHTML = `<strong>A:</strong> ${card.answer}`;
        isAnswerShown = false;
        answerElement.classList.add('hidden');  // Ensure answer is hidden initially
        updateToggleButton();
    }
}

function toggleAnswer() {
    if (isAnswerShown) {
        answerElement.classList.add('hidden');
        isAnswerShown = false;
    } else {
        answerElement.classList.remove('hidden');
        isAnswerShown = true;
    }
    updateToggleButton();
}

function showAnswer() {
    answerElement.classList.remove('hidden');
    isAnswerShown = true;
}

function hideAnswer() {
    answerElement.classList.add('hidden');
    isAnswerShown = false;
}

function updateToggleButton() {
    toggleButton.textContent = isAnswerShown ? 'Hide Answer' : 'Show Answer';
}

function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    showCard();
}

function prevCard() {
    currentCardIndex = (currentCardIndex - 1 + flashcards.length) % flashcards.length;
    showCard();
}

toggleButton.addEventListener('click', toggleAnswer);
prevButton.addEventListener('click', prevCard);
nextButton.addEventListener('click', nextCard);

loadCSV();