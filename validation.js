document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('join-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const dateInput = document.getElementById('date');
  const timeInput = document.getElementById('time');
  const levelSelect = document.getElementById('level');
  const termsCheckbox = document.getElementById('terms');
  const heightInput = document.getElementById('height');
  const successMessage = document.getElementById('form-success');

  const showError = (input, messageId, message) => {
    if (!input) return;
    const msgSpan = document.getElementById(messageId);
    input.classList.add('error');
    if (msgSpan) msgSpan.textContent = message;
  };

  const clearError = (input, messageId) => {
    if (!input) return;
    const msgSpan = document.getElementById(messageId);
    input.classList.remove('error');
    if (msgSpan) msgSpan.textContent = "";
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;
    successMessage.textContent = "";

    const nameVal = nameInput.value.trim();
    if (nameVal.length < 3) {
      showError(nameInput, 'name-error', 'Add meg a teljes neved, legalább 3 karakterrel.');
      valid = false;
    } else {
      clearError(nameInput, 'name-error');
    }

    const emailVal = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailVal)) {
      showError(emailInput, 'email-error', 'Adj meg egy érvényes email címet.');
      valid = false;
    } else {
      clearError(emailInput, 'email-error');
    }

    const phoneVal = phoneInput.value.trim();
    if (phoneVal.length < 8) {
      showError(phoneInput, 'phone-error', 'Adj meg egy elérhető telefonszámot (legalább 8 karakter).');
      valid = false;
    } else {
      clearError(phoneInput, 'phone-error');
    }

    const dateVal = dateInput.value;
    if (!dateVal) {
      showError(dateInput, 'date-error', 'Válassz egy dátumot.');
      valid = false;
    } else {
      const selected = new Date(dateVal);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        showError(dateInput, 'date-error', 'A dátum nem lehet a mai napnál korábbi.');
        valid = false;
      } else {
        clearError(dateInput, 'date-error');
      }
    }

    if (!timeInput.value) {
      showError(timeInput, 'time-error', 'Válassz egy időpontot.');
      valid = false;
    } else {
      clearError(timeInput, 'time-error');
    }

    if (!levelSelect.value) {
      showError(levelSelect, 'level-error', 'Válaszd ki a játékos szinted.');
      valid = false;
    } else {
      clearError(levelSelect, 'level-error');
    }

    if (heightInput.value) {
      const h = Number(heightInput.value);
      if (isNaN(h) || h < 140 || h > 230) {
        showError(heightInput, 'height-error', '140 és 230 cm közötti értéket adj meg.');
        valid = false;
      } else {
        clearError(heightInput, 'height-error');
      }
    } else {
      clearError(heightInput, 'height-error');
    }

    if (!termsCheckbox.checked) {
      showError(termsCheckbox, 'terms-error', 'A részvételhez el kell fogadnod a feltételeket.');
      valid = false;
    } else {
      clearError(termsCheckbox, 'terms-error');
    }

    if (valid) {
      successMessage.textContent = "Köszi, megkaptuk a jelentkezésed! Hamarosan keresünk emailben.";
      form.reset();
    }
  });
});
