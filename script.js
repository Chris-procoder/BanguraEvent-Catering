// Bangura Event & Catering - JavaScript Functionality
// Adapted from Mett-Apperals design

// Price Calculator Variables
let currentStep = 'step-1';
let selectedService = '';
let calculatedPrice = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const sliderDots = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;

    // Create dots for slider
    if (sliderDots && slides.length > 0) {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            sliderDots.appendChild(dot);
        });
    }

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        document.querySelectorAll('.dot')[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        slides[currentSlide].classList.add('active');
        document.querySelectorAll('.dot')[currentSlide].classList.add('active');
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Auto-advance slides
    if (slides.length > 0) {
        setInterval(nextSlide, 5000);
    }

    // Gallery Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img && lightbox && lightboxImg) {
                lightboxImg.src = img.src;
                lightbox.style.display = 'block';
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', function() {
            lightbox.style.display = 'none';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialDots = document.querySelector('.testimonial-dots');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;

    // Create dots for testimonials
    if (testimonialDots && testimonials.length > 0) {
        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestimonial(index));
            testimonialDots.appendChild(dot);
        });
    }

    function goToTestimonial(index) {
        if (testimonials.length === 0) return;
        
        testimonials[currentTestimonial].classList.remove('active');
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        if (dots[currentTestimonial]) {
            dots[currentTestimonial].classList.remove('active');
        }
        
        currentTestimonial = index;
        
        testimonials[currentTestimonial].classList.add('active');
        if (dots[currentTestimonial]) {
            dots[currentTestimonial].classList.add('active');
        }
    }

    function nextTestimonial() {
        const next = (currentTestimonial + 1) % testimonials.length;
        goToTestimonial(next);
    }

    function prevTestimonial() {
        const prev = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        goToTestimonial(prev);
    }

    if (testimonialNext) testimonialNext.addEventListener('click', nextTestimonial);
    if (testimonialPrev) testimonialPrev.addEventListener('click', prevTestimonial);

    // Auto-advance testimonials
    if (testimonials.length > 0) {
        setInterval(nextTestimonial, 4000);
    }

    // Booking Form Toggle
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const bookingForms = document.querySelectorAll('.booking-form');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetForm = this.getAttribute('data-form');
            
            // Remove active class from all buttons and forms
            toggleBtns.forEach(b => b.classList.remove('active'));
            bookingForms.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked button and corresponding form
            this.classList.add('active');
            const form = document.getElementById(targetForm);
            if (form) {
                form.classList.add('active');
            }
        });
    });

    // Form Submissions with Formspree
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                } else {
                    field.style.borderColor = '#ecf0f1';
                }
            });
            
            if (isValid) {
                // Submit to Formspree
                const formData = new FormData(this);
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                // Show loading state
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        showNotification('Thank you! Your request has been submitted successfully. We will contact you soon.', 'success');
                        this.reset();
                    } else {
                        throw new Error('Form submission failed');
                    }
                })
                .catch(error => {
                    showNotification('There was an error submitting your request. Please try again or contact us directly.', 'error');
                })
                .finally(() => {
                    // Reset button state
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                });
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });

    // Smooth Scrolling
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // Chatbot Functionality
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChatBtn = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendMessageBtn = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');

    // Chatbot responses
    const botResponses = {
        'hello': 'Hello! Welcome to Bangura Event & Catering. How can I help you today?',
        'hi': 'Hi there! I\'m here to help you with our catering and hair styling services.',
        'catering': 'We offer full-service catering for weddings, corporate events, and private parties. Our menus are customized to your preferences and dietary needs. Would you like to know more about our catering packages?',
        'hair': 'Our hair styling services include braiding, updos, and special occasion styling. We specialize in natural hair care and protective styles. What type of styling are you interested in?',
        'booking': 'You can book our services using the contact forms on this page. We have separate booking forms for catering and hair styling services. Which service would you like to book?',
        'price': 'Our pricing varies based on the specific service and requirements. For catering, it depends on the number of guests and menu selection. For hair styling, it depends on the complexity and length of your hair. Please fill out our booking form for a personalized quote.',
        'menu': 'We offer a variety of cuisines including American, Italian, Mediterranean, and fusion dishes. All our meals are prepared fresh with high-quality ingredients. We can accommodate dietary restrictions and preferences.',
        'location': 'We are located at 456 Culinary Avenue, Food District, CA 90210. We also provide mobile services for catering and can travel to your location for hair styling.',
        'hours': 'We are open Monday through Saturday from 9:00 AM to 8:00 PM. We are closed on Sundays, but we can accommodate special requests for events.',
        'contact': 'You can reach us at +1 (555) 123-4567 or email us at info@banguraevent.com. You can also use the booking forms on this website.',
        'default': 'I\'m here to help you with questions about our catering and hair styling services. You can ask me about our services, pricing, booking, or contact information. How can I assist you?'
    };

    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        for (const keyword in botResponses) {
            if (lowerMessage.includes(keyword)) {
                return botResponses[keyword];
            }
        }
        
        return botResponses.default;
    }

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'user-message' : 'bot-message';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = message;
        
        messageContent.appendChild(messageParagraph);
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            
            // Simulate typing delay
            setTimeout(() => {
                const response = getBotResponse(message);
                addMessage(response);
            }, 1000);
        }
    }

    if (chatbotButton) {
        chatbotButton.addEventListener('click', function() {
            chatbotWindow.style.display = chatbotWindow.style.display === 'block' ? 'none' : 'block';
        });
    }

    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', function() {
            chatbotWindow.style.display = 'none';
        });
    }

    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', sendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            max-width: 300px;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Add CSS animations for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Cash App Payment Modal
    const cashappModal = document.getElementById('cashapp-modal');
    const depositBtnCatering = document.getElementById('deposit-btn-catering');
    const depositBtnHair = document.getElementById('deposit-btn-hair');
    const paymentClose = document.querySelector('.payment-close');
    const paymentDone = document.getElementById('payment-done');
    const depositAmount = document.getElementById('deposit-amount');
    const serviceType = document.getElementById('service-type');
    const amountReminder = document.getElementById('amount-reminder');

    // Payment amounts for different services
    const paymentAmounts = {
        catering: '$100.00',
        hair: '$50.00'
    };

    function openPaymentModal(service) {
        const amount = paymentAmounts[service];
        const serviceName = service === 'catering' ? 'Catering Service' : 'Hair Styling Service';
        
        depositAmount.textContent = amount;
        serviceType.textContent = serviceName;
        amountReminder.textContent = amount;
        
        cashappModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closePaymentModal() {
        cashappModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (depositBtnCatering) {
        depositBtnCatering.addEventListener('click', function() {
            openPaymentModal('catering');
        });
    }

    if (depositBtnHair) {
        depositBtnHair.addEventListener('click', function() {
            openPaymentModal('hair');
        });
    }

    if (paymentClose) {
        paymentClose.addEventListener('click', closePaymentModal);
    }

    if (paymentDone) {
        paymentDone.addEventListener('click', function() {
            showNotification('Thank you! We\'ll confirm your payment and booking within 24 hours.', 'success');
            closePaymentModal();
        });
    }

    // Close modal when clicking outside
    if (cashappModal) {
        cashappModal.addEventListener('click', function(e) {
            if (e.target === cashappModal) {
                closePaymentModal();
            }
        });
    }

    // Header scroll behavior
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add transition to header
    if (header) {
        header.style.transition = 'transform 0.3s ease';
    }

    // Initialize price calculator
    initializePriceCalculator();

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .gallery-item, .testimonial');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 360 Photo Viewer functionality
    let currentRotation = 0;
    let isDragging = false;
    let startX = 0;
    let currentImage = '';

    window.open360Viewer = function() {
        const lightboxImg = document.getElementById('lightbox-img');
        currentImage = lightboxImg.src;
        
        document.getElementById('photo-360-image').src = currentImage;
        document.getElementById('photo-360-modal').style.display = 'block';
        currentRotation = 0;
        updateRotationDisplay();
    };

    window.close360Viewer = function() {
        document.getElementById('photo-360-modal').style.display = 'none';
        currentRotation = 0;
    };

    function updateRotationDisplay() {
        const image = document.getElementById('photo-360-image');
        const angleDisplay = document.getElementById('rotation-angle');
        
        if (image && angleDisplay) {
            image.style.transform = `rotate(${currentRotation}deg)`;
            angleDisplay.textContent = `${currentRotation}°`;
        }
    }

    function rotatePhoto(degrees) {
        currentRotation = (currentRotation + degrees) % 360;
        if (currentRotation < 0) currentRotation += 360;
        updateRotationDisplay();
    }

    // Initialize 360 viewer controls after DOM loads
    const photo360Viewer = document.getElementById('photo-360-viewer');
    if (photo360Viewer) {
        // Mouse events for desktop
        photo360Viewer.addEventListener('mousedown', function(e) {
            isDragging = true;
            startX = e.clientX;
            this.classList.add('dragging');
            e.preventDefault();
        });

        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const rotationSpeed = 0.5;
            const newRotation = currentRotation + (deltaX * rotationSpeed);
            
            currentRotation = newRotation % 360;
            if (currentRotation < 0) currentRotation += 360;
            
            updateRotationDisplay();
            startX = e.clientX;
        });

        document.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                const viewer = document.getElementById('photo-360-viewer');
                if (viewer) viewer.classList.remove('dragging');
            }
        });

        // Touch events for mobile
        photo360Viewer.addEventListener('touchstart', function(e) {
            isDragging = true;
            startX = e.touches[0].clientX;
            e.preventDefault();
        });

        document.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            
            const deltaX = e.touches[0].clientX - startX;
            const rotationSpeed = 0.5;
            const newRotation = currentRotation + (deltaX * rotationSpeed);
            
            currentRotation = newRotation % 360;
            if (currentRotation < 0) currentRotation += 360;
            
            updateRotationDisplay();
            startX = e.touches[0].clientX;
            e.preventDefault();
        });

        document.addEventListener('touchend', function() {
            if (isDragging) {
                isDragging = false;
                const viewer = document.getElementById('photo-360-viewer');
                if (viewer) viewer.classList.remove('dragging');
            }
        });
    }

    // Rotation button controls
    const rotateLeftBtn = document.getElementById('rotate-left');
    const rotateRightBtn = document.getElementById('rotate-right');
    
    if (rotateLeftBtn) {
        rotateLeftBtn.addEventListener('click', function() {
            rotatePhoto(-15);
        });
    }
    
    if (rotateRightBtn) {
        rotateRightBtn.addEventListener('click', function() {
            rotatePhoto(15);
        });
    }

    // Close modal when clicking outside
    const photo360Modal = document.getElementById('photo-360-modal');
    if (photo360Modal) {
        photo360Modal.addEventListener('click', function(e) {
            if (e.target === this) {
                close360Viewer();
            }
        });
    }

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Update current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
});

// Price Calculator Functions
function openPriceCalculator() {
    const modal = document.getElementById('price-calculator-modal');
    modal.style.display = 'block';
    resetCalculator();
}

function closePriceCalculator() {
    const modal = document.getElementById('price-calculator-modal');
    modal.style.display = 'none';
    resetCalculator();
}

function resetCalculator() {
    currentStep = 'step-1';
    selectedService = '';
    calculatedPrice = 0;
    
    // Hide all steps
    document.querySelectorAll('.calculator-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show first step
    document.getElementById('step-1').classList.add('active');
    
    // Reset buttons
    document.getElementById('calc-back-btn').style.display = 'none';
    document.getElementById('calc-next-btn').style.display = 'none';
    
    // Clear service selection
    document.querySelectorAll('.service-type-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Reset price display
    updatePriceDisplay(0, 0, 0);
}

function initializePriceCalculator() {
    // Service type selection
    document.querySelectorAll('.service-type-card').forEach(card => {
        card.addEventListener('click', function() {
            const service = this.dataset.service;
            selectServiceType(service);
        });
    });
    
    // Add event listeners for form inputs
    const culinaryInputs = document.querySelectorAll('#step-culinary select, #step-culinary input');
    culinaryInputs.forEach(input => {
        input.addEventListener('change', updateCulinaryPrice);
        input.addEventListener('input', updateCulinaryPrice);
    });
    
    const hairInputs = document.querySelectorAll('#step-hair select, #step-hair input');
    hairInputs.forEach(input => {
        input.addEventListener('change', updateHairPrice);
        input.addEventListener('input', updateHairPrice);
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('price-calculator-modal');
        if (event.target === modal) {
            closePriceCalculator();
        }
    });
}

function selectServiceType(service) {
    selectedService = service;
    
    // Update UI
    document.querySelectorAll('.service-type-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`[data-service="${service}"]`).classList.add('selected');
    
    // Show appropriate step
    setTimeout(() => {
        document.getElementById('step-1').classList.remove('active');
        document.getElementById(`step-${service}`).classList.add('active');
        currentStep = `step-${service}`;
        
        // Show navigation buttons
        document.getElementById('calc-back-btn').style.display = 'inline-block';
        document.getElementById('calc-next-btn').style.display = 'inline-block';
        
        // Initialize price calculation
        if (service === 'culinary') {
            updateCulinaryPrice();
        } else {
            updateHairPrice();
        }
    }, 300);
}

function goBackStep() {
    document.getElementById(currentStep).classList.remove('active');
    document.getElementById('step-1').classList.add('active');
    currentStep = 'step-1';
    
    document.getElementById('calc-back-btn').style.display = 'none';
    document.getElementById('calc-next-btn').style.display = 'none';
    
    // Clear selection
    document.querySelectorAll('.service-type-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    updatePriceDisplay(0, 0, 0);
}

function updateCulinaryPrice() {
    const serviceSelect = document.getElementById('culinary-service');
    const guestCount = parseInt(document.getElementById('guest-count').value) || 0;
    const duration = parseFloat(document.getElementById('event-duration').value) || 1;
    
    if (!serviceSelect.value) {
        updatePriceDisplay(0, 0, 0);
        return;
    }
    
    const basePrice = parseInt(serviceSelect.selectedOptions[0].dataset.base) || 0;
    const baseCost = basePrice * guestCount * duration;
    
    // Calculate additional services
    let additionalCost = 0;
    
    if (document.getElementById('setup-cleanup').checked) {
        additionalCost += 150;
    }
    
    if (document.getElementById('premium-menu').checked) {
        additionalCost += 15 * guestCount;
    }
    
    if (document.getElementById('serving-staff').checked) {
        const hours = duration <= 1 ? 4 : duration <= 1.3 ? 5 : duration <= 1.6 ? 7 : 8;
        additionalCost += 25 * hours * Math.ceil(guestCount / 20); // 1 staff per 20 guests
    }
    
    const totalCost = baseCost + additionalCost;
    calculatedPrice = totalCost;
    
    updatePriceDisplay(baseCost, additionalCost, totalCost);
}

function updateHairPrice() {
    const serviceSelect = document.getElementById('hair-service');
    const lengthMultiplier = parseFloat(document.getElementById('hair-length').value) || 1;
    const thicknessMultiplier = parseFloat(document.getElementById('hair-thickness').value) || 1;
    const complexityMultiplier = parseFloat(document.getElementById('hair-complexity').value) || 1;
    
    if (!serviceSelect.value) {
        updatePriceDisplay(0, 0, 0);
        return;
    }
    
    const basePrice = parseInt(serviceSelect.selectedOptions[0].dataset.base) || 0;
    const baseCost = basePrice * lengthMultiplier * thicknessMultiplier * complexityMultiplier;
    
    // Calculate additional services
    let additionalCost = 0;
    
    if (document.getElementById('hair-wash').checked) {
        additionalCost += 25;
    }
    
    if (document.getElementById('hair-treatment').checked) {
        additionalCost += 35;
    }
    
    if (document.getElementById('travel-service').checked) {
        additionalCost += 50;
    }
    
    const totalCost = baseCost + additionalCost;
    calculatedPrice = totalCost;
    
    updatePriceDisplay(baseCost, additionalCost, totalCost);
}

function updatePriceDisplay(base, additional, total) {
    document.getElementById('base-price').textContent = `$${base.toFixed(2)}`;
    document.getElementById('additional-price').textContent = `$${additional.toFixed(2)}`;
    document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
}

function proceedToBooking() {
    // Close calculator
    closePriceCalculator();
    
    // Scroll to contact section
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    
    // Pre-fill booking form based on selected service
    setTimeout(() => {
        if (selectedService === 'culinary') {
            // Switch to catering form
            document.getElementById('catering-booking').classList.add('active');
            document.getElementById('hair-booking').classList.remove('active');
            document.querySelectorAll('.toggle-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector('[data-form="catering-booking"]').classList.add('active');
            
            // Pre-fill service type if selected
            const culinaryService = document.getElementById('culinary-service').value;
            if (culinaryService) {
                const bookingSelect = document.querySelector('#catering-booking select[name="service"]');
                if (bookingSelect) {
                    bookingSelect.value = culinaryService;
                }
            }
            
            // Pre-fill guest count
            const guestCount = document.getElementById('guest-count').value;
            if (guestCount) {
                const guestInput = document.querySelector('#catering-booking input[name="guests"]');
                if (guestInput) {
                    guestInput.value = guestCount;
                }
            }
        } else if (selectedService === 'hair') {
            // Switch to hair form
            document.getElementById('hair-booking').classList.add('active');
            document.getElementById('catering-booking').classList.remove('active');
            document.querySelectorAll('.toggle-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector('[data-form="hair-booking"]').classList.add('active');
            
            // Pre-fill service type if selected
            const hairService = document.getElementById('hair-service').value;
            if (hairService) {
                const bookingSelect = document.querySelector('#hair-booking select[name="service"]');
                if (bookingSelect) {
                    bookingSelect.value = hairService;
                }
            }
            
            // Pre-fill hair length
            const hairLength = document.getElementById('hair-length');
            if (hairLength && hairLength.selectedIndex > 0) {
                const lengthSelect = document.querySelector('#hair-booking select[name="hair-length"]');
                if (lengthSelect) {
                    lengthSelect.selectedIndex = hairLength.selectedIndex;
                }
            }
        }
        
        // Add estimated price to message
        const messageField = document.querySelector('.booking-form.active textarea[name="message"]');
        if (messageField && calculatedPrice > 0) {
            const currentMessage = messageField.value;
            const priceNote = `\n\nEstimated Price: $${calculatedPrice.toFixed(2)} (from price calculator)`;
            messageField.value = currentMessage + priceNote;
        }
        
        // Highlight the form with a subtle animation
        const activeForm = document.querySelector('.booking-form.active');
        if (activeForm) {
            activeForm.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.3)';
            setTimeout(() => {
                activeForm.style.boxShadow = '';
            }, 3000);
        }
    }, 500);
}
