document.addEventListener('DOMContentLoaded', function () {
    const timerElement = document.getElementById('time');
    const submitButton = document.getElementById('submit-button');
    let timeLeft = 120; 

    const user = {
        name: '',
        score: 0,
    };

    function updateTimer() {
        timerElement.textContent = timeLeft;
        if (timeLeft === 0) {
            endQuiz();
        } else {
            timeLeft--;
            setTimeout(updateTimer, 1000);
        }
    }

    function endQuiz() {
        // Implement logic to handle quiz submission and show results
        
        const userAnswers = getUserAnswers();
        user.score = calculateScore(userAnswers);

        // Ask for the user's name
        user.name = prompt('Enter your name:');

        // Save the user's data to local storage
        saveUserData();

        // Display results (you can customize this part)
        alert(`Quiz submitted!\nName: ${user.name}\nScore: ${user.score}`);
    }

    function getUserAnswers() {
        const userAnswers = [];
        // Collect user answers from the form
        const formElements = document.querySelectorAll('input[type="radio"]:checked');
        formElements.forEach((input) => {
            const questionNumber = input.name.replace('q', ''); // Extract question number
            userAnswers[questionNumber - 1] = input.value; // Save the selected answer
        });
        return userAnswers;
    }

    function calculateScore(userAnswers) {
        // Implement your scoring logic based on correct answers
        // For simplicity, let's assume correct answers are known in advance
        const correctAnswers = ['array', 'developer tools', 'extensions'];
        let score = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === correctAnswers[index]) {
                score++;
            }
        });
        return score;
    }
    function saveUserData() {
        // Get existing user data from local storage (if any)
        const savedUserData = JSON.parse(localStorage.getItem('quizUserData')) || [];

        // Add the current user's data
        savedUserData.push(user);

        // Save the updated data back to local storage
        localStorage.setItem('quizUserData', JSON.stringify(savedUserData));
    }


    function saveUserData() {
        // Get existing user data from local storage (if any)
        const savedUserData = JSON.parse(localStorage.getItem('quizUserData')) || [];

        // Add the current user's data
        savedUserData.push(user);

        // Save the updated data back to local storage
        localStorage.setItem('quizUserData', JSON.stringify(savedUserData));
    }

  
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
        <div class="question">
            <p>1. Which of these is used to store data?</p>
            <label><input type="radio" name="q1" value="array"> Array</label>
            <label><input type="radio" name="q1" value="variable"> Variable</label>
            <label><input type="radio" name="q1" value="loop"> Loop</label>
        </div>
        <div class="question">
            <p>2. What can be used to edit code?</p>
            <label><input type="radio" name="q2" value="developer tools"> Developer Tools</label>
            <label><input type="radio" name="q2" value="bash"> Bash</label>
            <label><input type="radio" name="q2" value="git pull"> Git Pull</label>
        </div>
        <div class="question">
            <p>3. How can you add new features to your code editor?</p>
            <label><input type="radio" name="q3" value="mods"> Mods</label>
            <label><input type="radio" name="q3" value="extensions"> Extensions</label>
            <label><input type="radio" name="q3" value="peripherals"> Peripherals</label>
    `;
    updateTimer();

    
    submitButton.addEventListener('click', endQuiz);
});
