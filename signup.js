document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const courseSelect = document.getElementById('course');
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const dobInput = document.getElementById('dob');
    const courseInput = document.getElementById('course');
    
    const nameValidation = document.getElementById('name-validation');
    const emailValidation = document.getElementById('email-validation');
    const passwordValidation = document.getElementById('password-validation');
    const confirmPasswordValidation = document.getElementById('confirm-password-validation');
    const dobValidation = document.getElementById('dob-validation');
    const courseValidation = document.getElementById('course-validation');

    async function fetchCourses() {
        try {
            const response = await fetch('https://api.example.com/courses'); // Replace with your API endpoint
            const courses = await response.json();
            courseSelect.innerHTML = courses.map(course => `
                <option value="${course.courseId}">${course.title}</option>
            `).join('');
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }

    function validateName() {
        const value = nameInput.value;
        if (/^[a-zA-Z\s]+$/.test(value)) {
            nameValidation.textContent = 'Name is valid';
            nameValidation.className = 'validation-message success';
        } else {
            nameValidation.textContent = 'Name must contain only letters and spaces.';
            nameValidation.className = 'validation-message error';
        }
    }

    function validateEmail() {
        const value = emailInput.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(value)) {
            emailValidation.textContent = 'Email is valid';
            emailValidation.className = 'validation-message success';
        } else {
            emailValidation.textContent = 'Invalid email format.';
            emailValidation.className = 'validation-message error';
        }
    }

    function validatePassword() {
        const value = passwordInput.value;
        if (value.length >= 8) {
            passwordValidation.textContent = 'Password is valid';
            passwordValidation.className = 'validation-message success';
        } else {
            passwordValidation.textContent = 'Password must be at least 8 characters long.';
            passwordValidation.className = 'validation-message error';
        }
    }

    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        if (confirmPassword === password) {
            confirmPasswordValidation.textContent = 'Passwords match';
            confirmPasswordValidation.className = 'validation-message success';
        } else {
            confirmPasswordValidation.textContent = 'Passwords do not match.';
            confirmPasswordValidation.className = 'validation-message error';
        }
    }

    function validateDob() {
        const value = dobInput.value;
        const dobPattern = /^\d{4}-\d{2}-\d{2}$/;
        if (dobPattern.test(value)) {
            dobValidation.textContent = 'Date of Birth is valid';
            dobValidation.className = 'validation-message success';
        } else {
            dobValidation.textContent = 'Invalid date format.';
            dobValidation.className = 'validation-message error';
        }
    }

    function validateCourse() {
        const value = courseSelect.value;
        if (value) {
            courseValidation.textContent = 'Course selected';
            courseValidation.className = 'validation-message success';
        } else {
            courseValidation.textContent = 'Please select a course.';
            courseValidation.className = 'validation-message error';
        }
    }

    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    dobInput.addEventListener('input', validateDob);
    courseSelect.addEventListener('change', validateCourse);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        if (nameValidation.classList.contains('error') ||
            emailValidation.classList.contains('error') ||
            passwordValidation.classList.contains('error') ||
            confirmPasswordValidation.classList.contains('error') ||
            dobValidation.classList.contains('error') ||
            courseValidation.classList.contains('error')) {
            alert('Please fix the errors before submitting.');
            return;
        }

        window.location.href = 'https://christuniversity.in/'; 
    });

    fetchCourses();
});
