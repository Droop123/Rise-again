// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    mobileMenu.classList.toggle('active');
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Chatbot Functionality
const chatbotToggle = document.querySelector('.chatbot-toggle');
const chatbotContent = document.querySelector('.chatbot-content');
const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('#chat-input');
const sendButton = document.querySelector('#send-message');

// Simple responses for the chatbot
const botResponses = {
    'hello': 'Hi there! How can I help you today?',
    'hi': 'Hello! How can I assist you?',
    'help': 'If you need immediate help, please call 988 for the Suicide & Crisis Lifeline, available 24/7.',
    'depression': 'Depression is a serious but treatable condition. Would you like to learn more about symptoms or treatment options?',
    'symptoms': 'Common symptoms of depression include persistent sadness, loss of interest in activities, changes in sleep patterns, and difficulty concentrating. Please consult a mental health professional for a proper diagnosis.',
    'treatment': 'Depression can be treated through various methods including therapy, medication, and lifestyle changes. A mental health professional can help determine the best treatment plan for you.',
    'suicide': 'If you\'re having thoughts of suicide, please call 988 immediately. You\'re not alone, and help is available 24/7.',
    'therapy': 'Therapy can be very helpful in treating depression. Would you like information about finding a therapist?',
    'default': 'I\'m here to provide basic information about depression. For immediate help, call 988. For medical advice, please consult a healthcare professional.'
};

// Toggle chatbot visibility
chatbotToggle.addEventListener('click', () => {
    chatbotContent.style.display = chatbotContent.style.display === 'block' ? 'none' : 'block';
});

// Send message function
function sendMessage() {
    const message = chatInput.value.trim().toLowerCase();
    if (message) {
        // Add user message
        addMessage('user', chatInput.value);
        
        // Get bot response
        let response = botResponses.default;
        for (const [key, value] of Object.entries(botResponses)) {
            if (message.includes(key)) {
                response = value;
                break;
            }
        }
        
        // Add bot response with delay
        setTimeout(() => {
            addMessage('bot', response);
        }, 500);
        
        // Clear input
        chatInput.value = '';
    }
}

// Add message to chat
function addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.innerHTML = `
        <div class="message-content">
            ${text}
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message on button click or enter key
sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Form Validation
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();
    
    if (name && email && message) {
        // Here you would typically send the form data to a server
        alert('Thank you for reaching out. We will get back to you soon.');
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.style.display = '';
        }
    });
});

// Add some basic animations
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to sections as they become visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
});

// Add styles for chat messages
const style = document.createElement('style');
style.textContent = `
    .message {
        margin-bottom: 1rem;
        padding: 0.5rem;
    }
    .message.user {
        text-align: right;
    }
    .message.bot {
        text-align: left;
    }
    .message-content {
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        max-width: 80%;
    }
    .user .message-content {
        background: var(--primary-color);
        color: white;
    }
    .bot .message-content {
        background: var(--background-light);
        color: var(--text-color);
    }
`;
document.head.appendChild(style);

// Progress Tracker and Goal Setting Functionality
function openProgressTracker() {
    const trackerHTML = `
        <div class="modal" id="progress-tracker-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Progress Tracker</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="progress-form">
                        <div class="form-group">
                            <label>How are you feeling today? (1-10)</label>
                            <input type="range" min="1" max="10" value="5" id="mood-slider">
                            <span id="mood-value">5</span>
                        </div>
                        <div class="form-group">
                            <label>What activities did you do today?</label>
                            <div class="activity-checkboxes">
                                <label><input type="checkbox" value="exercise"> Exercise</label>
                                <label><input type="checkbox" value="meditation"> Meditation</label>
                                <label><input type="checkbox" value="therapy"> Therapy</label>
                                <label><input type="checkbox" value="socializing"> Socializing</label>
                                <label><input type="checkbox" value="hobbies"> Hobbies</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Notes about your day:</label>
                            <textarea id="progress-notes" rows="4"></textarea>
                        </div>
                        <button class="save-progress">Save Progress</button>
                    </div>
                    <div class="progress-history">
                        <h4>Recent Progress</h4>
                        <div id="progress-chart"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', trackerHTML);
    initializeProgressTracker();
}

function openGoalSetter() {
    const goalSetterHTML = `
        <div class="modal" id="goal-setter-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Goal Setting</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="goals-form">
                        <div class="form-group">
                            <label>New Goal</label>
                            <input type="text" id="goal-input" placeholder="Enter your goal">
                        </div>
                        <div class="form-group">
                            <label>Target Date</label>
                            <input type="date" id="goal-date">
                        </div>
                        <div class="form-group">
                            <label>Steps to achieve this goal:</label>
                            <div id="goal-steps">
                                <div class="step-input">
                                    <input type="text" placeholder="Enter a step">
                                    <button class="add-step">+</button>
                                </div>
                            </div>
                        </div>
                        <button class="save-goal">Save Goal</button>
                    </div>
                    <div class="goals-list">
                        <h4>Your Goals</h4>
                        <div id="goals-container"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', goalSetterHTML);
    initializeGoalSetter();
}

// Initialize Progress Tracker
function initializeProgressTracker() {
    const modal = document.getElementById('progress-tracker-modal');
    const closeBtn = modal.querySelector('.close-modal');
    const moodSlider = document.getElementById('mood-slider');
    const moodValue = document.getElementById('mood-value');
    const saveBtn = modal.querySelector('.save-progress');

    // Update mood value display
    moodSlider.addEventListener('input', () => {
        moodValue.textContent = moodSlider.value;
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    // Save progress
    saveBtn.addEventListener('click', () => {
        const progress = {
            date: new Date().toISOString(),
            mood: moodSlider.value,
            activities: Array.from(modal.querySelectorAll('.activity-checkboxes input:checked')).map(cb => cb.value),
            notes: document.getElementById('progress-notes').value
        };

        // Save to localStorage
        const savedProgress = JSON.parse(localStorage.getItem('progressData') || '[]');
        savedProgress.push(progress);
        localStorage.setItem('progressData', JSON.stringify(savedProgress));

        // Show success message
        alert('Progress saved successfully!');
        updateProgressChart();
    });

    updateProgressChart();
}

// Initialize Goal Setter
function initializeGoalSetter() {
    const modal = document.getElementById('goal-setter-modal');
    const closeBtn = modal.querySelector('.close-modal');
    const addStepBtn = modal.querySelector('.add-step');
    const saveBtn = modal.querySelector('.save-goal');

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    // Add new step input
    addStepBtn.addEventListener('click', () => {
        const stepInput = document.createElement('div');
        stepInput.className = 'step-input';
        stepInput.innerHTML = `
            <input type="text" placeholder="Enter a step">
            <button class="remove-step">&times;</button>
        `;
        document.getElementById('goal-steps').appendChild(stepInput);
    });

    // Save goal
    saveBtn.addEventListener('click', () => {
        const goal = {
            title: document.getElementById('goal-input').value,
            targetDate: document.getElementById('goal-date').value,
            steps: Array.from(modal.querySelectorAll('.step-input input')).map(input => input.value).filter(Boolean),
            completed: false,
            dateCreated: new Date().toISOString()
        };

        // Save to localStorage
        const savedGoals = JSON.parse(localStorage.getItem('goals') || '[]');
        savedGoals.push(goal);
        localStorage.setItem('goals', JSON.stringify(savedGoals));

        // Show success message
        alert('Goal saved successfully!');
        updateGoalsList();
    });

    // Remove step
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-step')) {
            e.target.parentElement.remove();
        }
    });

    updateGoalsList();
}

// Update Progress Chart
function updateProgressChart() {
    const progressData = JSON.parse(localStorage.getItem('progressData') || '[]');
    const chartContainer = document.getElementById('progress-chart');
    
    if (progressData.length === 0) {
        chartContainer.innerHTML = '<p>No progress data yet. Start tracking to see your progress!</p>';
        return;
    }

    // Create simple bar chart
    const chartHTML = progressData.slice(-7).map(entry => {
        const date = new Date(entry.date).toLocaleDateString();
        const height = (entry.mood * 10) + '%';
        return `
            <div class="chart-bar">
                <div class="bar-fill" style="height: ${height}"></div>
                <div class="bar-label">${date}</div>
            </div>
        `;
    }).join('');

    chartContainer.innerHTML = `
        <div class="chart-container">
            ${chartHTML}
        </div>
    `;
}

// Update Goals List
function updateGoalsList() {
    const goalsData = JSON.parse(localStorage.getItem('goals') || '[]');
    const goalsContainer = document.getElementById('goals-container');
    
    if (goalsData.length === 0) {
        goalsContainer.innerHTML = '<p>No goals set yet. Start by adding a goal!</p>';
        return;
    }

    goalsContainer.innerHTML = goalsData.map((goal, index) => `
        <div class="goal-item ${goal.completed ? 'completed' : ''}">
            <h5>${goal.title}</h5>
            <p>Target Date: ${new Date(goal.targetDate).toLocaleDateString()}</p>
            <div class="goal-steps">
                ${goal.steps.map(step => `
                    <div class="goal-step">
                        <input type="checkbox" ${goal.completed ? 'checked' : ''}>
                        <span>${step}</span>
                    </div>
                `).join('')}
            </div>
            <button class="toggle-goal" data-index="${index}">
                ${goal.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
        </div>
    `).join('');

    // Add event listeners for toggling goals
    document.querySelectorAll('.toggle-goal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            const goals = JSON.parse(localStorage.getItem('goals') || '[]');
            goals[index].completed = !goals[index].completed;
            localStorage.setItem('goals', JSON.stringify(goals));
            updateGoalsList();
        });
    });
}

// Add styles for modals and interactive tools
const toolStyles = document.createElement('style');
toolStyles.textContent = `
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1100;
    }

    .modal-content {
        background: var(--white);
        border-radius: var(--border-radius);
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
    }

    .modal-header {
        padding: 1rem;
        border-bottom: 1px solid var(--background-light);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .modal-body {
        padding: 2rem;
    }

    .close-modal {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--light-text);
    }

    .activity-checkboxes {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
        margin-top: 0.5rem;
    }

    .chart-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        height: 200px;
        margin-top: 1rem;
    }

    .chart-bar {
        flex: 1;
        margin: 0 2px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .bar-fill {
        width: 20px;
        background: var(--primary-color);
        transition: height 0.3s ease;
    }

    .bar-label {
        margin-top: 0.5rem;
        font-size: 0.8rem;
        transform: rotate(-45deg);
    }

    .goal-item {
        background: var(--background-light);
        padding: 1rem;
        border-radius: var(--border-radius);
        margin-bottom: 1rem;
    }

    .goal-item.completed {
        opacity: 0.7;
    }

    .goal-steps {
        margin: 1rem 0;
    }

    .goal-step {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .goal-step input {
        margin-right: 0.5rem;
    }

    .step-input {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .step-input input {
        flex: 1;
    }
`;
document.head.appendChild(toolStyles);

// Function to toggle Learn More content
function toggleLearnMore(button) {
    const content = button.nextElementSibling;
    const isExpanded = content.classList.contains('active');
    
    // Close all other open learn more sections
    document.querySelectorAll('.learn-more-content.active').forEach(elem => {
        if (elem !== content) {
            elem.classList.remove('active');
            elem.previousElementSibling.textContent = 'Learn More';
        }
    });

    // Toggle current section
    content.classList.toggle('active');
    button.textContent = isExpanded ? 'Learn More' : 'Show Less';
} 