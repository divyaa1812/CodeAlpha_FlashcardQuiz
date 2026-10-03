let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [
    {
        question: "What is Python?",
        answer: "Python is a programming language."
    },
    {
        question: "What is HTML?",
        answer: "HTML is used to structure web pages."
    },
    {
        question: "What is CSS?",
        answer: "CSS is used to style web pages."
    }
];

let currentIndex = 0;
function saveFlashcards() {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const answerBox = document.getElementById("answerBox");
const cardNumber = document.getElementById("cardNumber");

const showAnswerBtn = document.getElementById("showAnswerBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const addBtn = document.getElementById("addBtn");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");


// Display current flashcard
function displayCard() {

    const card = flashcards[currentIndex];

    questionElement.textContent = card.question;
    answerElement.textContent = card.answer;

    cardNumber.textContent =
        `Card ${currentIndex + 1} of ${flashcards.length}`;

    answerBox.classList.add("hidden");

    showAnswerBtn.textContent = "Show Answer";
}


// Show / Hide Answer
showAnswerBtn.addEventListener("click", function () {

    answerBox.classList.toggle("hidden");

    if (answerBox.classList.contains("hidden")) {
        showAnswerBtn.textContent = "Show Answer";
    } else {
        showAnswerBtn.textContent = "Hide Answer";
    }
});


// Next button
nextBtn.addEventListener("click", function () {

    if (currentIndex < flashcards.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }

    displayCard();
});


// Previous button
previousBtn.addEventListener("click", function () {

    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = flashcards.length - 1;
    }

    displayCard();
});


// Add flashcard
addBtn.addEventListener("click", function () {

    const question = prompt("Enter the question:");

    if (!question) {
        return;
    }

    const answer = prompt("Enter the answer:");

    if (!answer) {
        return;
    }

    flashcards.push({
        question: question,
        answer: answer
    });
    saveFlashcards();

    currentIndex = flashcards.length - 1;

    displayCard();
});


// Edit flashcard
editBtn.addEventListener("click", function () {

    const currentCard = flashcards[currentIndex];

    const newQuestion = prompt(
        "Edit question:",
        currentCard.question
    );

    if (!newQuestion) {
        return;
    }

    const newAnswer = prompt(
        "Edit answer:",
        currentCard.answer
    );

    if (!newAnswer) {
        return;
    }

    currentCard.question = newQuestion;
    currentCard.answer = newAnswer;
    saveFlashcards();

    displayCard();
});


// Delete flashcard
deleteBtn.addEventListener("click", function () {

    if (flashcards.length === 1) {
        alert("You must have at least one flashcard.");
        return;
    }

    const confirmDelete = confirm(
        "Are you sure you want to delete this flashcard?"
    );

    if (confirmDelete) {

        flashcards.splice(currentIndex, 1);
        saveFlashcards();

        if (currentIndex >= flashcards.length) {
            currentIndex = flashcards.length - 1;
        }

        displayCard();
    }
});


// Display first card
displayCard();