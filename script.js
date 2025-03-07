document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const toggle = document.getElementById('theme-toggle');

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        toggle.checked = true;
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (checkInputs() && checkPassword()) {
                console.log('Form submitted successfully');
            } else {
                console.log('Form validation failed');
            }
        });

        const inputs = form.querySelectorAll('.input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const inputForm = input.closest('.inputForm');
                const warningText = inputForm.querySelector('.warning-text:not(.password-mismatch)');

                if (warningText) {
                    if (input.value.trim() === '') {
                        inputForm.style.border = '1.5px solid red';
                        warningText.style.display = 'block';
                    } else {
                        inputForm.style.border = '1.5px solid var(--input-border)';
                        warningText.style.display = 'none';
                    }
                }

                if (input.id === 'password' || input.id === 'confirm-password') {
                    checkPassword();
                }
            });
        });
    }

    if (toggle) {
        toggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
});

function checkInputs() {
    const inputForms = document.querySelectorAll('.inputForm');
    let allFilled = true;

    inputForms.forEach(inputForm => {
        const input = inputForm.querySelector('.input');
        let warningText = inputForm.querySelector('.warning-text:not(.password-mismatch)');

        if (!warningText) {
            warningText = document.createElement('span');
            warningText.classList.add('warning-text');
            warningText.textContent = 'Required';
            warningText.style.display = 'none';
            inputForm.appendChild(warningText);
        }

        if (input.value.trim() === '') {
            inputForm.style.border = '1.5px solid red';
            warningText.style.display = 'block';
            allFilled = false;
        } else {
            inputForm.style.border = '1.5px solid var(--input-border)';
            warningText.style.display = 'none';
        }
    });

    return allFilled;
}

function checkPassword() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const confirmPasswordForm = confirmPasswordInput?.closest('.inputForm');
    const mismatchWarning = confirmPasswordForm?.querySelector('.password-mismatch');

    if (passwordInput && confirmPasswordInput && mismatchWarning) {
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();

        if (passwordValue !== '' && confirmPasswordValue !== '' && passwordValue !== confirmPasswordValue) {
            confirmPasswordForm.style.border = '1.5px solid red';
            mismatchWarning.style.display = 'block';
            return false;
        } else {
            mismatchWarning.style.display = 'none';
            if (confirmPasswordValue !== '') {
                confirmPasswordForm.style.border = '1.5px solid var(--input-border)';
            }
            return true;
        }
    }
    return true;
}