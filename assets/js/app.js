// Google Sheet से डेटा फ़ेच करें
const sheetURL = 'YOUR_PUBLISHED_CSV_LINK';

let currentQuestion = 0;
let userAnswers = [];

async function loadQuestions() {
    const response = await fetch(sheetURL);
    const data = await response.text();
    const questions = Papa.parse(data, {header: true}).data;
    
    renderQuestion(questions[currentQuestion]);
    setupNavigation(questions);
}

function renderQuestion(q) {
    document.getElementById('question').textContent = q.Question;
    const optionsDiv = document.getElementById('options');
    
    optionsDiv.innerHTML = `
        <div class="option-item">${q.Option1}</div>
        <div class="option-item">${q.Option2}</div>
        <div class="option-item">${q.Option3}</div>
        <div class="option-item">${q.Option4}</div>
    `;
}

// पूरा JavaScript कोड और लॉजिक GitHub repo में उपलब्ध है:
// https://github.com/your-repo/quiz-app


// Quiz Submit करने पर
function submitQuiz() {
    // Calculate score
    const score = userAnswers.filter((ans, index) => 
        ans === questions[index].correctAnswer
    ).length;

    // Store results in localStorage
    localStorage.setItem('quizResults', JSON.stringify({
        score: score,
        answers: userAnswers
    }));

    window.location.href = 'result.html';
}

// Result Page पर
function loadResults() {
    const results = JSON.parse(localStorage.getItem('quizResults'));
    const answersContainer = document.getElementById('answersContainer');
    
    document.getElementById('totalScore').textContent = results.score;

    questions.forEach((q, index) => {
        const userAnswer = results.answers[index];
        const isCorrect = userAnswer === q.correctAnswer;
        
        const answerDiv = document.createElement('div');
        answerDiv.className = `answer-item ${isCorrect ? 'correct-answer' : 'wrong-answer'}`;
        answerDiv.innerHTML = `
            <h3>प्रश्न ${index + 1}: ${q.Question}</h3>
            <p>आपका उत्तर: ${q[userAnswer]} ${!isCorrect ? `<span class="correct-answer-text">(सही उत्तर: ${q[q.correctAnswer]})</span>` : ''}</p>
            ${q.explanation ? `<div class="explanation">📝 व्याख्या: ${q.explanation}</div>` : ''}
        `;
        
        answersContainer.appendChild(answerDiv);
    });
}

// Result Page लोड होने पर
if(window.location.pathname.includes('result.html')) {
    loadResults();
}