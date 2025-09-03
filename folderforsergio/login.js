      const toggleLink = document.getElementById('toggle-link');
        const formTitle = document.getElementById('form-title');
        const signupForm = document.getElementById('signup-form');
        const loginForm = document.getElementById('login-form');

        toggleLink.addEventListener('click', () => {
            if (signupForm.style.display === 'none') {
                signupForm.style.display = 'block';
                loginForm.style.display = 'none';
                formTitle.textContent = 'Sign Up';
                toggleLink.textContent = 'Already have an account? Log In';
            } else {
                signupForm.style.display = 'none';
                loginForm.style.display = 'block';
                formTitle.textContent = 'Log In';
                toggleLink.textContent = "Don't have an account? Sign Up";
            }
        });
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Sign Up form submitted!');
        });
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Log In form submitted!');
        });

        document.querySelector('.google').addEventListener('click', () => {
            window.location.href = 'https://accounts.google.com/signin';
        });
        document.querySelector('.facebook').addEventListener('click', () => {
            window.location.href = 'https://www.facebook.com/login.php';
        });
        document.getElementById('forgot-link').addEventListener('click', function(e) {
            e.preventDefault();
            alert('Forgot password page (implement logic or redirect here)');
        });
