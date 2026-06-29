// Login functionality
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    const errorMessage = document.getElementById('errorMessage');
    
    // Hide error message
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
    
    // Static credentials (you can change these)
    const validUsername = 'admin';
    const validPassword = 'admin123';
    
    // Validate credentials
    if (username === validUsername && password === validPassword) {
        // Store login session
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', username);
        
        if (rememberMe) {
            // Store in localStorage for persistent login
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
        }
        
        // Redirect to dashboard
        window.location.href = 'index.html';
    } else {
        // Show error message
        errorMessage.textContent = 'Invalid username or password. Please try again.';
        errorMessage.classList.add('show');
        
        // Clear password field
        document.getElementById('password').value = '';
        
        // Shake animation is handled by CSS
    }
}

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') || localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn === 'true') {
        // User is already logged in, redirect to dashboard
        window.location.href = 'index.html';
    }
    
    // Focus on username field
    document.getElementById('username').focus();
});

