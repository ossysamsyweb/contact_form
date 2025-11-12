const form = document.getElementById('contactForm');
const fnameInput = document.getElementById('fname');
const lnameInput = document.getElementById('lname');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const successMsg = document.getElementById('successMsg');

// My Google Apps Sheet Web App URL
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbz-UZqL-hrppQS89nTvvc3g7ulxw5JK86rkNTqJmtdXXN03nPiBDkETvYrcPlZtkheB/exec";

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  let isValid = true;

  
  document.querySelectorAll('.error').forEach(el => el.textContent = '');

  // Validate first name
  if (fnameInput.value.trim() === '') {
    document.getElementById('fnameError').textContent = 'First name is required';
    isValid = false;
  }

  // Validate last name
  if (lnameInput.value.trim() === '') {
    document.getElementById('lnameError').textContent = 'Last name is required';
    isValid = false;
  }

  // Validate email
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
  if (!emailInput.value.match(emailPattern)) {
    document.getElementById('emailError').textContent = 'Enter a valid email address';
    isValid = false;
  }

  // Validate message length (10–100 chars)
  const messageLength = messageInput.value.trim().length;
  if (messageLength < 10 || messageLength > 100) {
    document.getElementById('messageError').textContent = 'Message must be between 10 and 100 characters';
    isValid = false;
  }

  // Stop if validation failed
  if (!isValid) return;

  const data = {
  firstName: fnameInput.value.trim(),
  lastName: lnameInput.value.trim(),
  email: emailInput.value.trim(),
  message: messageInput.value.trim()
};

  // Submit to Google Sheets via Apps Script
  try {
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    // Show success message
    successMsg.style.display = 'block';
    form.reset();
    setTimeout(() => { successMsg.style.display = 'none'; }, 3000);

  } catch (error) {
    alert("Error submitting form. Please try again later.");
    console.error(error);
  }
});
