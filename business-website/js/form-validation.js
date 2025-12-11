// ========================================
// FORM VALIDATION - CONTACT FORM
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    const contactForm = document.getElementById('contactForm');

    if (!contactForm) {
        return; // Exit if form doesn't exist on this page
    }

    // Form fields
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');

    // Error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    // Success message
    const formSuccess = document.getElementById('formSuccess');

    // ========================================
    // VALIDATION RULES
    // ========================================

    // Email regex pattern (RFC 5322 simplified)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    // Phone regex pattern (flexible format)
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;

    // ========================================
    // VALIDATION FUNCTIONS
    // ========================================

    function validateName() {
        const value = nameField.value.trim();

        if (value === '') {
            showError(nameField, nameError, 'Please enter your name');
            return false;
        }

        if (value.length < 2) {
            showError(nameField, nameError, 'Name must be at least 2 characters');
            return false;
        }

        if (value.length > 50) {
            showError(nameField, nameError, 'Name must be less than 50 characters');
            return false;
        }

        showSuccess(nameField, nameError);
        return true;
    }

    function validateEmail() {
        const value = emailField.value.trim();

        if (value === '') {
            showError(emailField, emailError, 'Please enter your email address');
            return false;
        }

        if (!emailRegex.test(value)) {
            showError(emailField, emailError, 'Please enter a valid email address');
            return false;
        }

        showSuccess(emailField, emailError);
        return true;
    }

    function validatePhone() {
        const value = phoneField.value.trim();

        // Phone is optional, so only validate if provided
        if (value === '') {
            clearError(phoneField, phoneError);
            return true;
        }

        if (!phoneRegex.test(value)) {
            showError(phoneField, phoneError, 'Please enter a valid phone number');
            return false;
        }

        showSuccess(phoneField, phoneError);
        return true;
    }

    function validateSubject() {
        const value = subjectField.value;

        if (value === '' || value === null) {
            showError(subjectField, subjectError, 'Please select a subject');
            return false;
        }

        showSuccess(subjectField, subjectError);
        return true;
    }

    function validateMessage() {
        const value = messageField.value.trim();

        if (value === '') {
            showError(messageField, messageError, 'Please enter your message');
            return false;
        }

        if (value.length < 10) {
            showError(messageField, messageError, 'Message must be at least 10 characters');
            return false;
        }

        if (value.length > 1000) {
            showError(messageField, messageError, 'Message must be less than 1000 characters');
            return false;
        }

        showSuccess(messageField, messageError);
        return true;
    }

    // ========================================
    // UI FEEDBACK FUNCTIONS
    // ========================================

    function showError(field, errorElement, message) {
        field.classList.add('error');
        field.classList.remove('success');
        errorElement.textContent = message;
        errorElement.classList.add('show');
        field.setAttribute('aria-invalid', 'true');
    }

    function showSuccess(field, errorElement) {
        field.classList.remove('error');
        field.classList.add('success');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        field.setAttribute('aria-invalid', 'false');
    }

    function clearError(field, errorElement) {
        field.classList.remove('error');
        field.classList.remove('success');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        field.removeAttribute('aria-invalid');
    }

    function showFormSuccess() {
        formSuccess.classList.add('show');

        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Focus on success message for screen readers
        formSuccess.setAttribute('tabindex', '-1');
        formSuccess.focus();

        // Hide after 5 seconds
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
    }

    function hideFormSuccess() {
        formSuccess.classList.remove('show');
    }

    // ========================================
    // REAL-TIME VALIDATION (on blur)
    // ========================================

    nameField.addEventListener('blur', validateName);
    emailField.addEventListener('blur', validateEmail);
    phoneField.addEventListener('blur', validatePhone);
    subjectField.addEventListener('blur', validateSubject);
    messageField.addEventListener('blur', validateMessage);

    // ========================================
    // CLEAR ERROR ON INPUT
    // ========================================

    nameField.addEventListener('input', function () {
        if (this.classList.contains('error')) {
            clearError(this, nameError);
        }
    });

    emailField.addEventListener('input', function () {
        if (this.classList.contains('error')) {
            clearError(this, emailError);
        }
    });

    phoneField.addEventListener('input', function () {
        if (this.classList.contains('error')) {
            clearError(this, phoneError);
        }
    });

    subjectField.addEventListener('change', function () {
        if (this.classList.contains('error')) {
            clearError(this, subjectError);
        }
    });

    messageField.addEventListener('input', function () {
        if (this.classList.contains('error')) {
            clearError(this, messageError);
        }
    });

    // ========================================
    // FORM SUBMISSION
    // ========================================

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Hide any previous success message
        hideFormSuccess();

        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();

        // Check if all validations passed
        const isFormValid = isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMessageValid;

        if (isFormValid) {
            // Form is valid - proceed with submission
            handleFormSubmission();
        } else {
            // Form has errors - focus on first error field
            const firstErrorField = contactForm.querySelector('.error');
            if (firstErrorField) {
                firstErrorField.focus();
            }
        }
    });

    // ========================================
    // HANDLE FORM SUBMISSION
    // ========================================

    function handleFormSubmission() {
        // Get form data
        const formData = {
            name: nameField.value.trim(),
            email: emailField.value.trim(),
            phone: phoneField.value.trim(),
            subject: subjectField.value,
            message: messageField.value.trim(),
            timestamp: new Date().toISOString()
        };

        // Log form data (in production, this would be sent to a server)
        console.log('Form submitted successfully!');
        console.log('Form Data:', formData);

        // Simulate API call with setTimeout
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        setTimeout(() => {
            // Show success message
            showFormSuccess();

            // Reset form
            contactForm.reset();

            // Clear all success states
            clearError(nameField, nameError);
            clearError(emailField, emailError);
            clearError(phoneField, phoneError);
            clearError(subjectField, subjectError);
            clearError(messageField, messageError);

            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';

            // In production, you would send data to your backend:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                showFormSuccess();
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting the form. Please try again.');
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            });
            */

        }, 1500); // Simulate network delay
    }

    // ========================================
    // ACCESSIBILITY: FORM FIELD HINTS
    // ========================================

    // Add character counter for message field
    const messageCounter = document.createElement('div');
    messageCounter.style.cssText = 'font-size: 0.875rem; color: #666; margin-top: 4px; text-align: right;';
    messageCounter.setAttribute('aria-live', 'polite');
    messageField.parentNode.appendChild(messageCounter);

    messageField.addEventListener('input', function () {
        const currentLength = this.value.length;
        const maxLength = 1000;
        const remaining = maxLength - currentLength;

        messageCounter.textContent = `${currentLength} / ${maxLength} characters`;

        if (remaining < 100) {
            messageCounter.style.color = '#e67e22';
        } else {
            messageCounter.style.color = '#666';
        }
    });

    // Initialize counter
    messageCounter.textContent = '0 / 1000 characters';

    // ========================================
    // CONSOLE MESSAGE
    // ========================================

    console.log('%c✓ Form validation initialized', 'color: #2ecc71; font-weight: bold;');

});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Sanitize input to prevent XSS (basic implementation)
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Format phone number (optional enhancement)
function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
}
