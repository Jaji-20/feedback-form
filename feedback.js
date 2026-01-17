// ============================================
// EMAILJS CONFIGURATION
// ============================================
// Replace these values with your EmailJS credentials
// Get them from: https://www.emailjs.com/
// See EMAIL_SETUP.md for detailed instructions

const EMAILJS_CONFIG = {
    PUBLIC_KEY: "30K9rEKUHHy93L6pu",      // Replace with your EmailJS Public Key
    SERVICE_ID: "service_2ju743b",      // Replace with your EmailJS Service ID
    TEMPLATE_ID: "template_u8pqiyl"     // Replace with your EmailJS Template ID
};

// Recipient email address
const RECIPIENT_EMAIL = "jajichandrakala@gmail.com";

// ============================================
// DOM Elements
// ============================================
const form = document.getElementById('feedbackForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const resetBtn = document.getElementById('resetBtn');
const charCount = document.getElementById('charCount');
const messageTextarea = document.getElementById('message');

// Initialize EmailJS when page loads
window.addEventListener('DOMContentLoaded', () => {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log('EmailJS initialized with Public Key:', EMAILJS_CONFIG.PUBLIC_KEY);
    } else {
        console.error('EmailJS library not loaded!');
    }
});

// Form validation and submission
form.addEventListener('submit', handleSubmit);
resetBtn.addEventListener('click', resetForm);
messageTextarea.addEventListener('input', updateCharCount);

// Character counter (no limit)
function updateCharCount() {
    const count = messageTextarea.value.length;
    charCount.textContent = count;
    charCount.style.color = '#6b7280';
}

// Form submission handler
async function handleSubmit(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS library not loaded. Please refresh the page.');
        }
        
        // Get form data
        const formData = getFormData();
        
        // Check if EmailJS is configured
        if (EMAILJS_CONFIG.PUBLIC_KEY === "YOUR_PUBLIC_KEY" || 
            EMAILJS_CONFIG.SERVICE_ID === "YOUR_SERVICE_ID" || 
            EMAILJS_CONFIG.TEMPLATE_ID === "YOUR_TEMPLATE_ID") {
            throw new Error('EmailJS is not configured. Please set up your credentials in feedback.js');
        }
        
        // Ensure EmailJS is initialized
        if (!emailjs.init) {
            emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        }
        
        // Prepare email template parameters
        // IMPORTANT: These variable names must match your EmailJS template variables
        const templateParams = {
            to_email: RECIPIENT_EMAIL,
            from_name: formData.name,
            from_email: formData.email,
            category: formData.category,
            rating: formData.rating,
            message: formData.message,
            timestamp: new Date().toLocaleString(),
            reply_to: formData.email
        };
        
        console.log('Sending email with params:', templateParams);
        console.log('Using Service ID:', EMAILJS_CONFIG.SERVICE_ID);
        console.log('Using Template ID:', EMAILJS_CONFIG.TEMPLATE_ID);
        
        // Send email using EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams
        );
        
        console.log('EmailJS Response:', response);
        
        // Success - hide form and show success message
        form.classList.add('hidden');
        successMessage.classList.add('show');
        
        console.log('Email sent successfully!');
        
    } catch (error) {
        console.error('Error sending email:', error);
        
        // Get detailed error message
        let errorMessage = 'Unknown error occurred';
        
        if (error.text) {
            errorMessage = error.text;
        } else if (error.message) {
            errorMessage = error.message;
        } else if (error.status) {
            errorMessage = `HTTP ${error.status}: ${error.text || 'Request failed'}`;
        } else if (typeof error === 'string') {
            errorMessage = error;
        }
        
        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            errorMessage = 'EmailJS library not loaded. Please check if the script is included in feedback.html';
        }
        
        // Check if it's a configuration error
        if (errorMessage.includes('not configured')) {
            alert('EmailJS is not configured yet. Please check EMAIL_SETUP.md for setup instructions.\n\nFor now, your feedback data:\n' + JSON.stringify(getFormData(), null, 2));
        } else {
            // Show detailed error message to user
            alert('Sorry, there was an error submitting your feedback.\n\nError Details: ' + errorMessage + '\n\nPlease check:\n1. EmailJS Service is connected\n2. Template variables match\n3. Browser console (F12) for more details');
        }
        
        // Log full error for debugging
        console.error('Full error object:', error);
    } finally {
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

// Get form data
function getFormData() {
    return {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        category: document.getElementById('category').value,
        rating: document.querySelector('input[name="rating"]:checked')?.value,
        message: document.getElementById('message').value.trim(),
        timestamp: new Date().toISOString()
    };
}

// Validate form
function validateForm() {
    let isValid = true;
    
    // Name validation
    const name = document.getElementById('name').value.trim();
    const nameError = document.getElementById('nameError');
    if (name === '') {
        showError('name', 'Name is required');
        isValid = false;
    } else if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        showError('name', 'Name can only contain letters and spaces');
        isValid = false;
    }
    
    // Email validation
    const email = document.getElementById('email').value.trim();
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Category validation
    const category = document.getElementById('category').value;
    if (category === '') {
        showError('category', 'Please select a category');
        isValid = false;
    }
    
    // Rating validation
    const rating = document.querySelector('input[name="rating"]:checked');
    if (!rating) {
        showError('rating', 'Please select a rating');
        isValid = false;
    }
    
    // Message validation (no character limit, only check if not empty)
    const message = document.getElementById('message').value.trim();
    if (message === '') {
        showError('message', 'Please enter your feedback');
        isValid = false;
    }
    
    return isValid;
}

// Show error
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field) {
        field.classList.add('error');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Clear all errors
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const errorFields = document.querySelectorAll('.error');
    
    errorElements.forEach(el => {
        el.textContent = '';
    });
    
    errorFields.forEach(field => {
        field.classList.remove('error');
    });
}

// Reset form
function resetForm() {
    form.reset();
    clearErrors();
    form.classList.remove('hidden');
    successMessage.classList.remove('show');
    updateCharCount();
    
    // Remove checked state from radio buttons
    const radioButtons = document.querySelectorAll('input[name="rating"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
}

// Real-time validation on blur
const formFields = ['name', 'email', 'category', 'message'];
formFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
        field.addEventListener('blur', () => {
            validateField(fieldId);
        });
    }
});

// Validate individual field
function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();
    
    switch(fieldId) {
        case 'name':
            if (value === '') {
                showError(fieldId, 'Name is required');
            } else if (value.length < 2) {
                showError(fieldId, 'Name must be at least 2 characters');
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                showError(fieldId, 'Name can only contain letters and spaces');
            } else {
                clearFieldError(fieldId);
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value === '') {
                showError(fieldId, 'Email is required');
            } else if (!emailRegex.test(value)) {
                showError(fieldId, 'Please enter a valid email address');
            } else {
                clearFieldError(fieldId);
            }
            break;
            
        case 'category':
            if (value === '') {
                showError(fieldId, 'Please select a category');
            } else {
                clearFieldError(fieldId);
            }
            break;
            
        case 'message':
            if (value === '') {
                showError(fieldId, 'Please enter your feedback');
            } else {
                clearFieldError(fieldId);
            }
            break;
    }
}

// Clear field error
function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field) {
        field.classList.remove('error');
    }
    
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// Rating selection validation
const ratingInputs = document.querySelectorAll('input[name="rating"]');
ratingInputs.forEach(radio => {
    radio.addEventListener('change', () => {
        clearFieldError('rating');
    });
});

// Initialize character count
updateCharCount();
