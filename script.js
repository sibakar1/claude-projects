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

// ============================================
// AI CHAT FUNCTIONALITY
// ============================================

// Chat state
let chatHistory = [];
let isAIResponding = false;

// DOM elements
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const modelSelect = document.getElementById('modelSelect');
const newChatBtn = document.getElementById('newChatBtn');
const clearChatBtn = document.getElementById('clearChatBtn');
const welcomeMessage = document.getElementById('welcomeMessage');

// ============================================
// API-READY FUNCTION - Future Integration Point
// ============================================
async function sendMessageToAI(message, model) {
    /*
     * TODO: Connect to real API endpoint
     *
     * Future implementation:
     * 1. Send request to backend proxy (not direct to AI API)
     * 2. Backend handles API keys securely
     * 3. Backend routes to appropriate model (Claude, DeepSeek, MiniMax)
     * 4. Stream response back to frontend
     * 5. Handle errors and timeouts
     *
     * Example structure:
     * const response = await fetch('/api/chat', {
     *     method: 'POST',
     *     headers: { 'Content-Type': 'application/json' },
     *     body: JSON.stringify({ message, model, history: chatHistory })
     * });
     * return await response.json();
     */

    // For now, use demo response system
    return await generateDemoResponse(message, model);
}

// ============================================
// DEMO RESPONSE GENERATOR
// ============================================
async function generateDemoResponse(message, model) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    const lowerMessage = message.toLowerCase();

    // Check for code-related keywords
    const hasCode = lowerMessage.includes('code') || lowerMessage.includes('function') ||
                   lowerMessage.includes('debug') || lowerMessage.includes('error') ||
                   lowerMessage.includes('python') || lowerMessage.includes('javascript');

    let response = '';

    if (hasCode) {
        response = `Great question! Here's how I can help with that:

${getCodeExample(lowerMessage)}

This approach should work well for your use case. Let me know if you'd like me to explain any part in more detail!`;
    } else {
        response = getDemoTextResponse(lowerMessage, model);
    }

    return { text: response, model: model };
}

function getCodeExample(message) {
    if (message.includes('python')) {
        return `\`\`\`python
def greet(name):
    """A simple greeting function"""
    return f"Hello, {name}!"

# Usage
result = greet("Developer")
print(result)
\`\`\``;
    } else if (message.includes('javascript') || message.includes('js')) {
        return `\`\`\`javascript
function fetchData(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Data received:', data);
            return data;
        })
        .catch(error => console.error('Error:', error));
}
\`\`\``;
    } else {
        return `\`\`\`javascript
// Example implementation
function solution(input) {
    // Your code here
    return processedResult;
}
\`\`\``;
    }
}

function getDemoTextResponse(message, model) {
    const responses = [
        `I'm here to help with your coding questions! As ${model}, I can assist with debugging, architecture decisions, best practices, and more.`,
        `That's an interesting question! Based on my training, I'd recommend considering the trade-offs between performance, maintainability, and scalability.`,
        `Let me break this down for you. The key concepts to understand here are abstraction, encapsulation, and separation of concerns.`,
        `Great question! The best approach depends on your specific requirements, team size, and project timeline. Let's explore the options.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// ============================================
// MESSAGE RENDERING
// ============================================
function addUserMessage(text) {
    if (welcomeMessage) {
        welcomeMessage.style.display = 'none';
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="message-text">${escapeHtml(text)}</div>
        </div>
        <div class="message-avatar">👤</div>
    `;

    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function addAIMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai';

    const content = processMessageContent(text);

    messageDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            ${content}
            <button class="copy-btn" onclick="copyMessage(this)">Copy</button>
        </div>
    `;

    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function processMessageContent(text) {
    // Process code blocks
    const codeBlockRegex = /```(\w+)?\n([\s\S]+?)```/g;
    let processed = text;

    processed = processed.replace(codeBlockRegex, (match, language, code) => {
        const lang = language || 'code';
        return `
            <div class="code-block">
                <div class="code-header">
                    <span class="code-language">${lang}</span>
                    <button class="copy-btn" onclick="copyCode(this)">Copy Code</button>
                </div>
                <div class="code-content">
                    <pre>${escapeHtml(code.trim())}</pre>
                </div>
            </div>
        `;
    });

    // Convert remaining text
    processed = processed.replace(/\n/g, '<br>');

    return `<div class="message-text">${processed}</div>`;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;

    chatMessages.appendChild(typingDiv);
    scrollToBottom();
}

function removeTypingIndicator() {
    const typing = document.getElementById('typingIndicator');
    if (typing) {
        typing.remove();
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function copyMessage(button) {
    const messageContent = button.parentElement.querySelector('.message-text');
    const text = messageContent.innerText;

    navigator.clipboard.writeText(text).then(() => {
        button.textContent = 'Copied!';
        setTimeout(() => {
            button.textContent = 'Copy';
        }, 2000);
    });
}

function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('pre').innerText;

    navigator.clipboard.writeText(code).then(() => {
        button.textContent = 'Copied!';
        setTimeout(() => {
            button.textContent = 'Copy Code';
        }, 2000);
    });
}

// ============================================
// EVENT HANDLERS
// ============================================
async function handleSendMessage() {
    const message = chatInput.value.trim();
    if (!message || isAIResponding) return;

    isAIResponding = true;
    sendBtn.disabled = true;

    // Add user message
    addUserMessage(message);
    chatHistory.push({ role: 'user', content: message });

    // Clear input
    chatInput.value = '';
    chatInput.style.height = 'auto';
    updateSendButton();

    // Show typing indicator
    showTypingIndicator();

    try {
        // Get AI response
        const selectedModel = modelSelect.value;
        const response = await sendMessageToAI(message, selectedModel);

        // Remove typing indicator
        removeTypingIndicator();

        // Add AI message
        addAIMessage(response.text);
        chatHistory.push({ role: 'assistant', content: response.text });

    } catch (error) {
        removeTypingIndicator();
        addAIMessage('Sorry, I encountered an error. Please try again.');
    }

    isAIResponding = false;
    chatInput.focus();
}

function updateSendButton() {
    sendBtn.disabled = !chatInput.value.trim() || isAIResponding;
}

function handleNewChat() {
    if (confirm('Start a new chat? This will clear the current conversation.')) {
        clearChat();
    }
}

function handleClearChat() {
    if (confirm('Clear all messages?')) {
        clearChat();
    }
}

function clearChat() {
    chatHistory = [];
    chatMessages.innerHTML = `
        <div class="welcome-message" id="welcomeMessage">
            <div class="welcome-icon">🤖</div>
            <h3>Welcome to Adamkhor AI Coding Assistant</h3>
            <p>Ask me anything about coding, debugging, architecture, or best practices.</p>
        </div>
    `;
}

// ============================================
// EVENT LISTENERS
// ============================================
if (sendBtn) {
    sendBtn.addEventListener('click', handleSendMessage);
}

if (chatInput) {
    chatInput.addEventListener('input', () => {
        updateSendButton();

        // Auto-resize textarea
        chatInput.style.height = 'auto';
        chatInput.style.height = Math.min(chatInput.scrollHeight, 150) + 'px';
    });

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });
}

if (newChatBtn) {
    newChatBtn.addEventListener('click', handleNewChat);
}

if (clearChatBtn) {
    clearChatBtn.addEventListener('click', handleClearChat);
}

// Initial state
if (sendBtn) {
    updateSendButton();
}
