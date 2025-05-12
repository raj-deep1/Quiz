
function login() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const message = document.getElementById('message');

    if (email === "rajdeep" && password === "87654321") {
        message.style.color = "green";
        message.innerText = "लॉगिन सफल! ✅";
        // Redirect if needed
        // window.location.href = "dashboard.html"; 
    } else {
        message.style.color = "red";
        message.innerText = "गलत ईमेल या पासवर्ड ❌";
    }
}





// Google Sheet से डेटा फ़ेच करें
const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRYYI39qzZkx-ovaTDoWTTrX5hS5hyoGPyUPYhaCUWar2pva55tISp1wMG-dCW7DnawJrK9sjdI1F3F/pub?output=csv';

let currentQuestion = 0;
let userAnswers = [];

async function loadQuestions() {
    const response = await fetch(https://docs.google.com/spreadsheets/d/1ym1RQBP6VoCdRPSDqs51F3Tb-Y2whpoQ9cmEVlpalVk/edit?gid=0#gid=0);
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

// CORS Proxy के साथ URL
const proxy = 'https://cors-anywhere.herokuapp.com/';
const sheetURL = `${proxy}https://docs.google.com/.../pub?output=csv`;
