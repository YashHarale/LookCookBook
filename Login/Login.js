 // Get the form and input fields
 const form = document.getElementById('authForm');
 const emailInput = document.getElementById('email');
 const passwordInput = document.getElementById('password');
 const emailError = document.getElementById('emailError');
 const passwordError = document.getElementById('passwordError');
 const togglePassword = document.getElementById('togglePassword');
 const signUp = document.getElementById('sign_up');
 

 // Email validation regex
 const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;

 // Password validation regex: Minimum 8 characters, at least 1 uppercase letter, 1 digit, and 1 special character
 const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

 //Unhide the 👁 when someone is typing the password
 passwordInput.addEventListener('input', ()=> {
    if(passwordInput.value.length > 0) togglePassword.classList.remove('hidden');
    else togglePassword.classList.add('hidden');
 })

 // Toggle password visibility
 togglePassword.addEventListener('click', ()=>{
     const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
     passwordInput.setAttribute('type', type);
     togglePassword.textContent = type === 'password' ? '👁' : '👁️‍🗨️';
 });

 // Form submit event
 form.addEventListener('submit', (event)=> {
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
 });

 // Toggle to the sign-up form when the user clicks "Sign up"
signUp.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior

    // Change the form title and inputs for sign-up
    document.querySelector('h2').textContent = 'Sign up';
    signUp.textContent = 'Sign in';
    
    // Change the form fields to "Sign up" version (create and confirm password)
    const form = document.getElementById('authForm');
    form.innerHTML = `
        <!-- Email Input -->
        <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="signup-email" name="email" required
                   class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>

        <!-- Create Password Input -->
        <div class="mb-4">
            <label for="create-password" class="block text-sm font-medium text-gray-700">Create Password</label>
            <input type="password" id="create-password" name="password" required minlength="8"
                   class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>

        <!-- Confirm Password Input -->
        <div class="mb-6">
            <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password" required
                   class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>

        <div>
            <button type="submit"
                    class="w-full bg-orange-600 text-white px-4 py-2 rounded-md shadow hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                Sign up
            </button>
        </div>
    `;
});

// Adding password match check for the sign-up form
const signUpBtn = document.querySelector('button[type="submit"]');
const createPasswordInput = document.getElementById('create-password');
const confirmPasswordInput = document.getElementById('confirm-password');
const PasswordError = document.getElementById('passwordError');

signUpBtn.addEventListener('click', function(event) {
    console.log("hello")
    if (createPasswordInput.value !== confirmPasswordInput.value) {
        PasswordError.classList.remove('hidden');
        event.preventDefault(); // Prevent form submission if passwords do not match
    } else {
        PasswordError.classList.add('hidden');
    }
});