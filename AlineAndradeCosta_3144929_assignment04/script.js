document.addEventListener('DOMContentLoaded', () => {
    // Selecting necessary elements from the HTML
    const startQuizButton = document.getElementById('startQuiz');
    const nextQuestionButton = document.getElementById('nextQuestion');
    const usernameInput = document.getElementById('username');
    const introductionSection = document.getElementById('introduction');
    const quizSection = document.getElementById('quiz');
    const feedbackSection = document.getElementById('feedback');
    const questionContainer = document.getElementById('questionContainer');
    const feedbackMessage = document.getElementById('feedbackMessage');

    // Initializing variables to keep track of quiz state
    let userName = '';
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    // Array containing the quiz questions and their details
    const questionBank = [
        {
            type: 'radio',
            question: "Which movie won the Best Picture Oscar in 2020?",
            options: ["1917", "Parasite", "Joker", "Once Upon a Time in Hollywood"],
            answer: "Parasite"
        },
        {
            type: 'text',
            question: "Who directed the movie 'Inception'?",
            answer: ["Christopher Nolan", "nolan"]
        },
        {
            type: 'image',
            question: "Which of these actors played Iron Man?",
            options: ["images/actor1.jpg", "images/actor2.jpg", "images/actor3.jpg", "images/actor4.jpg"],
            answer: "images/actor2.jpg"
        },
        {
            type: 'radio',
            question: "Which movie features the quote 'I'll be back'?",
            options: ["Terminator", "Predator", "RoboCop", "Total Recall"],
            answer: "Terminator"
        },
        {
            type: 'text',
            question: "In which year was the first 'Harry Potter' movie released?",
            answer: ["2001", "two thousand and one"]
        },
        {
            type: 'image',
            question: "Which of these movies is directed by Steven Spielberg?",
            options: ["images/jaws.jpg", "images/inception.jpg", "images/avatar.jpg", "images/titanic.jpg"],
            answer: "images/jaws.jpg"
        },
        {
            type: 'radio',
            question: "Who played the role of Jack Dawson in 'Titanic'?",
            options: ["Leonardo DiCaprio", "Brad Pitt", "Johnny Depp", "Matt Damon"],
            answer: "Leonardo DiCaprio"
        },
        {
            type: 'text',
            question: "What is the name of the fictional African country in 'Black Panther'?",
            answer: ["Wakanda", "wakanda"]
        },
        {
            type: 'image',
            question: "Which movie features the character Neo?",
            options: ["images/matrix.jpg", "images/godfather.jpg", "images/starwars.jpg", "images/avengers.jpg"],
            answer: "images/matrix.jpg"
        },
        {
            type: 'radio',
            question: "Which actor voiced Woody in 'Toy Story'?",
            options: ["Tom Hanks", "Tim Allen", "Billy Crystal", "Robin Williams"],
            answer: "Tom Hanks"
        }
    ];

    // Function to start the quiz
    function startQuiz() {
        // Get the username from the input and validate it
        userName = usernameInput.value.trim();
        if (!userName) {
            alert('Please enter your name.');
            return;
        }
        // Hide the introduction section and show the quiz section
        introductionSection.classList.add('hidden');
        quizSection.classList.remove('hidden');
        // Load 5 random questions from the question bank
        loadQuestions();
        // Display the first question
        showQuestion();
    }

    // Function to load 5 random questions from the question bank
    function loadQuestions() {
        questions = questionBank.sort(() => 0.5 - Math.random()).slice(0, 5);
    }

    // Function to display the current question
    function showQuestion() {
        // Get the current question data
        const questionData = questions[currentQuestionIndex];
        // Clear previous question content
        questionContainer.innerHTML = '';

        // Create and display question number and title
        const questionNumber = document.createElement('h3');
        questionNumber.textContent = `Question ${currentQuestionIndex + 1}`;

        const questionTitle = document.createElement('h4');
        questionTitle.textContent = questionData.question;

        questionContainer.appendChild(questionNumber);
        questionContainer.appendChild(questionTitle);

        // Display options based on question type
        if (questionData.type === 'radio') {
            // For radio button type questions, create options as radio buttons
            const radioOptions = document.createElement('div');
            radioOptions.classList.add('radio-options');

            questionData.options.forEach(option => {
                const radioOption = document.createElement('div');
                radioOption.classList.add('radio-option');

                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'answer';
                input.value = option;

                const label = document.createElement('label');
                label.textContent = option;

                radioOption.appendChild(input);
                radioOption.appendChild(label);

                radioOptions.appendChild(radioOption);
            });

            questionContainer.appendChild(radioOptions);
        } else if (questionData.type === 'text') {
            // For text input type questions, created a text input field
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'textAnswer';
            questionContainer.appendChild(input);
        } else if (questionData.type === 'image') {
            // For image type questions, create image options
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');

            questionData.options.forEach(option => {
                const img = document.createElement('img');
                img.src = option;
                img.classList.add('image-option');
                // Add click event listener to check answer when an image is clicked
                img.addEventListener('click', () => checkAnswer(option));
                imageContainer.appendChild(img);
            });

            questionContainer.appendChild(imageContainer);
        }

        // Show next question button if question type is not image
        if (questionData.type !== 'image') {
            nextQuestionButton.classList.remove('hidden');
        } else {
            nextQuestionButton.classList.add('hidden');
        }
    }

    // Function to check the selected answer
    function checkAnswer(selectedAnswer) {
        const questionData = questions[currentQuestionIndex];
        let correct = false;

        if (questionData.type === 'radio' || questionData.type === 'image') {
            // For radio button and image type questions, check if selected answer is correct
            correct = selectedAnswer === questionData.answer;
        } else if (questionData.type === 'text') {
            // For text input type questions, check if entered answer is correct
            const userAnswer = document.getElementById('textAnswer').value.trim().toLowerCase();
            const correctAnswers = Array.isArray(questionData.answer) ? questionData.answer : [questionData.answer];
            correct = correctAnswers.map(ans => ans.toLowerCase()).includes(userAnswer);
        }

        // Increment score if answer is correct
        if (correct) {
            score++;
        }

        // Move to next question or show feedback if all questions are answered
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            showFeedback();
        }
    }

    // Function to show feedback after all questions are answered
    function showFeedback() {
        // Hide the quiz section and show the feedback section
        quizSection.classList.add('hidden');
        feedbackSection.classList.remove('hidden');
        // Display feedback message with user's score
        feedbackMessage.textContent = `Well done, ${userName}, you got ${((score / questions.length) * 100).toFixed(2)}%!`;
    }

    // Event listener for the start quiz button
    startQuizButton.addEventListener('click', startQuiz);

    // Event listener for the next question button
    nextQuestionButton.addEventListener('click', () => {
        // Check if an answer is selected (for radio button questions) or entered (for text input questions)
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        const textAnswer = document.getElementById('textAnswer');

        if (questions[currentQuestionIndex].type === 'text' && !textAnswer.value.trim()) {
            alert('Please enter your answer.');
            return;
        }

        if (!selectedOption && questions[currentQuestionIndex].type !== 'text') {
            alert('Please select an answer.');
            return;
        }

        // Check the selected answer and move to next question
        checkAnswer(selectedOption ? selectedOption.value : textAnswer.value.trim());
    });
});
