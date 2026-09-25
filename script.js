// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Header scroll effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#" or external link handler
        if (href === '#' || this.hasAttribute('onclick')) {
            return;
        }

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form validation and submission
const contactForm = document.getElementById('contactForm');
const formInputs = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    subject: document.getElementById('subject'),
    message: document.getElementById('message')
};

const formErrors = {
    name: document.getElementById('nameError'),
    email: document.getElementById('emailError'),
    subject: document.getElementById('subjectError'),
    message: document.getElementById('messageError')
};

// Validation functions
function validateName(name) {
    if (name.trim().length < 2) {
        return 'Name must be at least 2 characters long';
    }
    return '';
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
}

function validateSubject(subject) {
    if (subject.trim().length < 3) {
        return 'Subject must be at least 3 characters long';
    }
    return '';
}

function validateMessage(message) {
    if (message.trim().length < 10) {
        return 'Message must be at least 10 characters long';
    }
    return '';
}

// Real-time validation
formInputs.name.addEventListener('blur', () => {
    const error = validateName(formInputs.name.value);
    formErrors.name.textContent = error;
    formInputs.name.classList.toggle('error', error !== '');
});

formInputs.email.addEventListener('blur', () => {
    const error = validateEmail(formInputs.email.value);
    formErrors.email.textContent = error;
    formInputs.email.classList.toggle('error', error !== '');
});

formInputs.subject.addEventListener('blur', () => {
    const error = validateSubject(formInputs.subject.value);
    formErrors.subject.textContent = error;
    formInputs.subject.classList.toggle('error', error !== '');
});

formInputs.message.addEventListener('blur', () => {
    const error = validateMessage(formInputs.message.value);
    formErrors.message.textContent = error;
    formInputs.message.classList.toggle('error', error !== '');
});

// Clear error on input
Object.keys(formInputs).forEach(key => {
    formInputs[key].addEventListener('input', () => {
        formErrors[key].textContent = '';
        formInputs[key].classList.remove('error');
    });
});

// Form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    const errors = {
        name: validateName(formInputs.name.value),
        email: validateEmail(formInputs.email.value),
        subject: validateSubject(formInputs.subject.value),
        message: validateMessage(formInputs.message.value)
    };

    // Display errors
    let hasErrors = false;
    Object.keys(errors).forEach(key => {
        if (errors[key]) {
            formErrors[key].textContent = errors[key];
            formInputs[key].classList.add('error');
            hasErrors = true;
        }
    });

    if (hasErrors) {
        return;
    }

    // Show loading state
    const submitButton = contactForm.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoader = submitButton.querySelector('.button-loader');

    submitButton.disabled = true;
    buttonText.style.display = 'none';
    buttonLoader.style.display = 'inline';

    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show success message
    const formSuccess = document.getElementById('formSuccess');
    formSuccess.style.display = 'block';

    // Reset form
    contactForm.reset();

    // Reset button state
    submitButton.disabled = false;
    buttonText.style.display = 'inline';
    buttonLoader.style.display = 'none';

    // Hide success message after 5 seconds
    setTimeout(() => {
        formSuccess.style.display = 'none';
    }, 5000);
});

// Pricing modal functionality
const modal = document.getElementById('pricingModal');
const modalClose = document.getElementById('modalClose');
const modalPlanInfo = document.getElementById('modalPlanInfo');
const pricingForm = document.getElementById('pricingForm');

// Open modal when pricing button is clicked
document.querySelectorAll('.pricing-card button').forEach(button => {
    button.addEventListener('click', () => {
        const plan = button.getAttribute('data-plan');
        const price = button.getAttribute('data-price');

        modalPlanInfo.textContent = `You've selected the ${plan} plan at ${price}. Fill out the form below to start your free trial.`;
        modal.classList.add('show');

        // Store selected plan
        pricingForm.setAttribute('data-selected-plan', plan);
    });
});

// Close modal
modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

// Pricing form submission
pricingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const selectedPlan = pricingForm.getAttribute('data-selected-plan');
    const email = document.getElementById('modalEmail').value;

    // Show success message
    alert(`Thank you for signing up for the ${selectedPlan} plan! We'll send you an email at ${email} with next steps.`);

    // Close modal and reset form
    modal.classList.remove('show');
    pricingForm.reset();
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Logo click to scroll to top
document.querySelector('.logo').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Prevent default on external link placeholders
document.querySelectorAll('a[href="#"]').forEach(link => {
    if (!link.classList.contains('nav-cta')) {
        link.addEventListener('click', (e) => {
            if (!link.hasAttribute('onclick')) {
                e.preventDefault();
            }
        });
    }
});

// Footer link handlers
document.getElementById('privacyLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Privacy Policy page');
});

document.getElementById('termsLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Terms of Service page');
});

document.getElementById('twitterLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Twitter profile');
});

document.getElementById('linkedinLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('LinkedIn profile');
});

document.getElementById('githubLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('GitHub profile');
});

document.getElementById('facebookLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Facebook profile');
});
