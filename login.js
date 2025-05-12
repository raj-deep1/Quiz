document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var username = document.getElementById('username').value.trim();
  var password = document.getElementById('password').value.trim();
  // Dummy validation: accept only a specific user for demo
  if (username === 'user' && password === 'pass') {
    // Redirect to quiz page on successful login
    window.location.href = 'quiz.html';
  } else {
    document.getElementById('errorMsg').textContent = 'Invalid credentials!';
  }
});
