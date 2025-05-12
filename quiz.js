let questions = [];
let currentIndex = 0;
let userAnswers = [];

// Fetch questions from Google Sheets CSV using PapaParse
// Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vRYYI39qzZkx-ovaTDoWTTrX5hS5hyoGPyUPYhaCUWar2pva55tISp1wMG-dCW7DnawJrK9sjdI1F3F/pub?output=csv', {
Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vRYYI39qzZkx-ovaTDoWTTrX5hS5hyoGPyUPYhaCUWar2pva55tISp1wMG-dCW7DnawJrK9sjdI1F3F/pub?output=csv', {
  download: true,
  header: true,
  complete: function(results) {
    questions = results.data;
    showQuestion(currentIndex);
  }
});

function showQuestion(index) {
  const quizDiv = document.getElementById('quiz');
  const q = questions[index];
  // Build question HTML
  let html = `<div class="question-text">Q${index+1}: ${q.Question}</div><ul class="options">`;
  ['Option1','Option2','Option3','Option4'].forEach((opt, i) => {
    let checked = userAnswers[index] === i ? 'checked' : '';
    html += `<li><label><input type="radio" name="answer" value="${i}" ${checked}>
             ${q[opt]}</label></li>`;
  });
  html += '</ul>';
  quizDiv.innerHTML = html;
  // Update buttons
  document.getElementById('prevBtn').disabled = (index === 0);
  document.getElementById('nextBtn').style.display = (index < questions.length-1) ? 'inline-block' : 'none';
  document.getElementById('submitBtn').style.display = (index === questions.length-1) ? 'inline-block' : 'none';
}

function recordAnswer() {
  const selected = document.querySelector('input[name="answer"]:checked');
  userAnswers[currentIndex] = selected ? parseInt(selected.value) : null;
}

// Button handlers
document.getElementById('prevBtn').addEventListener('click', () => {
  recordAnswer();
  if (currentIndex > 0) {
    currentIndex--;
    showQuestion(currentIndex);
  }
});
document.getElementById('nextBtn').addEventListener('click', () => {
  recordAnswer();
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    showQuestion(currentIndex);
  }
});
document.getElementById('submitBtn').addEventListener('click', () => {
  recordAnswer();
  // Calculate score
  let score = 0;
  let resultsHTML = '<div class="results"><h3>Your Score: ';
  questions.forEach((q, i) => {
    let correctIndex = ['a','b','c','d'].indexOf(q.CorrectAnswer.toLowerCase());
    if (userAnswers[i] === correctIndex) score++;
  });
  resultsHTML += `${score} / ${questions.length}</h3><ul>`;
  // List questions with correct answers
  questions.forEach((q, i) => {
    let opts = [q.Option1, q.Option2, q.Option3, q.Option4];
    let correctIdx = ['a','b','c','d'].indexOf(q.CorrectAnswer.toLowerCase());
    resultsHTML += `<li>${q.Question}<br><strong>Correct:</strong> ${opts[correctIdx]}</li>`;
  });
  resultsHTML += '</ul></div>';
  document.querySelector('.quiz-container').innerHTML = resultsHTML;
});
