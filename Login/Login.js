 // Get the form and input fields
 const form = document.getElementById('authForm');
 const emailInput = document.getElementById('email');
 const passwordInput = document.getElementById('password');
 const emailError = document.getElementById('emailError');
 const passwordError = document.getElementById('passwordError');

 // Email validation regex
 const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;

 // Form submit event
 form.addEventListener('submit', function(event) {
     // Prevent form submission if validation fails
     let valid = true;

     // Check if email is valid
     if (!emailInput.value.match(emailPattern)) {
         emailError.classList.remove('hidden');
         valid = false;
     } else {
         emailError.classList.add('hidden');
     }

     // Check if password is at least 6 characters
     if (passwordInput.value.length < 6) {
         passwordError.classList.remove('hidden');
         valid = false;
     } else {
         passwordError.classList.add('hidden');
     }

     // If the form is not valid, prevent submission
     if (!valid) {
         event.preventDefault();
     }
 });