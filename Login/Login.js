// Get the form and input fields
let form = document.getElementById('authForm');
const signUp = document.getElementById('sign_up');
let isSignUpMode = false; // Track whether we are in sign-up or sign-in mode

// Email validation regex
const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;

// Password validation regex: Minimum 8 characters, at least 1 uppercase letter, 1 digit, and 1 special character
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

// Function to attach event listeners (call after form mode change)
function attachEventListeners() {
    const emailInput = document.getElementById('email') || document.getElementById('signup-email');
    const passwordInput = document.getElementById('password') || document.getElementById('create-password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const togglePassword = document.getElementById('togglePassword');

    // Unhide the 👁 when someone is typing the password
    passwordInput?.addEventListener('input', () => {
        if (passwordInput.value.length > 0) togglePassword.classList.remove('hidden');
        else togglePassword.classList.add('hidden');
    });

    // Toggle password visibility
    togglePassword?.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.textContent = type === 'password' ? '👁' : '👁️‍🗨️';
    });

    // Form submit event
    form.addEventListener('submit', (event) => {
        // Prevent form submission if validation fails
        let valid = true;

        // Check if email is valid
        if (!emailInput.value.match(emailPattern)) {
            emailError.classList.remove('hidden');
            valid = false;
        } else emailError.classList.add('hidden');

        // Check if password meets the minimum requirements
        if (!passwordInput.value.match(passwordPattern)) {
            passwordError.classList.remove('hidden');
            valid = false;
        } else passwordError.classList.add('hidden');

        // If the form is not valid, prevent submission
        if (!valid) event.preventDefault();

        // Additional check for sign-up mode (password match)
        if (isSignUpMode) {
            const createPasswordInput = document.getElementById('create-password');
            const confirmPasswordInput = document.getElementById('confirm-password');
            const passwordMatchError = document.getElementById('passwordMatchError');

            if (createPasswordInput.value !== confirmPasswordInput.value) {
                passwordMatchError.classList.remove('hidden');
                event.preventDefault();
            } else {
                passwordMatchError.classList.add('hidden');
            }
        }
    });
}

// Toggle between Sign In and Sign Up forms when the user clicks "Sign up" or "Sign in"
signUp.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default anchor behavior

    if (!isSignUpMode) {
        // Switch to Sign Up form
        document.querySelector('h2').textContent = 'Sign up';
        signUp.textContent = 'Sign in';

        // Change form fields to "Sign up" version
        form.innerHTML = `
            <!-- Email Input -->
            <div class="mb-4">
                <label for="signup-email" class="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" id="signup-email" name="email" required
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <p id="emailError" class="text-red-500 text-sm hidden">Please enter a valid email address</p>
            </div>
            <!-- Email Input -->

            <div class="mb-4">
                <label for="signup-email" class="block text-sm font-medium text-gray-700">User Name</label>
                <input type="text" id="name" name="First Name" required
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">

            </div>

            <!-- Create Password Input -->
            <div class="mb-4 relative">
                <label for="create-password" class="block text-sm font-medium text-gray-700">Create Password</label>
                <input type="password" id="create-password" name="password" required minlength="8"
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span id="togglePassword" class="absolute right-3 top-7 cursor-pointer hidden">👁️</span>
                <p id="passwordError" class="text-red-500 text-sm hidden">Password must be 8 characters, contain an uppercase, number, and special character</p>
            </div>

            <!-- Confirm Password Input -->
            <div class="mb-6">
                <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input type="password" id="confirm-password" name="confirm-password" required
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <p id="passwordMatchError" class="text-red-500 text-sm hidden">Passwords do not match</p>
            </div>

            <div>
                <button id="submitButton" 
                        class="w-full bg-orange-600 text-white px-4 py-2 rounded-md shadow hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                    Sign up
                </button>
            </div>
        `;

        isSignUpMode = true; // Now in sign-up mode
    } else {
        // Switch back to Sign In form
        document.querySelector('h2').textContent = 'Login';
        signUp.textContent = "Sign up";

        // Restore the Sign In form fields
        form.innerHTML = `
            <!-- Email Input -->
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" id="email" name="email" required
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <p id="emailError" class="text-red-500 text-sm hidden">Please enter a valid email address</p>
            </div>

            <!-- Password Input -->
            <div class="mb-6 relative">
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" name="password" required minlength="8" 
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                       focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span id="togglePassword" class="absolute right-3 top-7 cursor-pointer hidden">👁️</span>
                <p id="passwordError" class="text-red-500 text-sm hidden">Password must be 8 characters, contain an uppercase, number, and special character</p>
            </div>

            <!-- Remember Me -->
            <div class="flex items-center justify-between mb-6">
             <div class="flex items-center">
               <input id="remember_me" name="remember_me" type="checkbox"
               class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded">
               <label for="remember_me" class="ml-2 block text-sm text-gray-900">
            Remember me
               </label>

            </div>
             <div class="text-sm">
             <a href="#" class="font-medium text-orange-600 hover:text-orange-500">Forgot your password?</a>
             </div>
            </div>

            <!-- Submit Button -->
            <div class="mb-6">
              <button type="submit" id="submitBtn"
             class="w-full bg-orange-600 text-white px-4 py-2 rounded-md shadow hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
            Sign in
              </button>
            </div>
        `;

        isSignUpMode = false; // Back to sign-in mode
    }

    // Re-attach event listeners after the form switch
    attachEventListeners();
});

// Initial call to attach event listeners
attachEventListeners();