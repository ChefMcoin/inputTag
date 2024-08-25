const input = document.getElementById('email-input');
const tagListContainer = document.querySelector('.tag-list');
const inviteGuestBtn = document.getElementById('invite-guest-btn');
const tagCountText = document.getElementById('tag-count');

let emails = [];

// Function to update tag count display
function updateTagCount() {
  if (emails.length === 0) {
    tagCountText.style.display = 'none';
  } else {
    tagCountText.style.display = 'block';
    tagCountText.textContent = `Invite ${emails.length} guest to this retrospective`;
  }
}

// Function to render the tags inside the input field
function renderEmails() {
  tagListContainer.innerHTML = ''; // Clear current tags

  emails.forEach((email, index) => {
    const emailElement = document.createElement('span');
    emailElement.classList.add('tag');
    emailElement.innerHTML = `${email} <span class="remove-tag" data-index="${index}">&times;</span>`;
    tagListContainer.appendChild(emailElement);
  });

  // Add the input element back after the tags
  tagListContainer.appendChild(input);

  // Update the tag count
  updateTagCount();
}

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Function to add a tag
function addEmails(emailsToAdd) {
  emailsToAdd.forEach(email => {
    if (isValidEmail(email) && !emails.includes(email)) {
      emails.push(email);
    }
  });
  renderEmails();
}

// Function to remove a tag
function removeEmail(index) {
  emails.splice(index, 1);
  renderEmails();
}

// Event listener for adding a tag when pressing "Enter"
input.addEventListener('keyup', event => {
  if (event.key === 'Enter' || event.key === '') {
    const inputValue = input.value.trim();
    if (inputValue) {
      const emailsToAdd = inputValue.split(/[\s,]+/).filter(email => email);
      addEmails(emailsToAdd);
      input.value = '';
      input.focus();
    }
  }
});

// Event listener for removing a tag
tagListContainer.addEventListener('click', event => {
  if (event.target.classList.contains('remove-tag')) {
    const index = event.target.getAttribute('data-index');
    removeEmail(index);
  }
});

// Event listener for the "Invite Guest" button
inviteGuestBtn.addEventListener('click', () => {
  if (emails.length > 0) {
    alert(`Inviting guests: ${emails.join(', ')}`);
  } else {
    alert('No emails added.');
  }
});
