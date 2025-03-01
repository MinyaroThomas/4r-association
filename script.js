document.addEventListener('DOMContentLoaded', function() {
    // Enhanced ScrollReveal configurations
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '30px',
        duration: 1200,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: true
    });

    // More detailed reveal animations
    sr.reveal('.service-item', { 
        interval: 200,
        origin: 'bottom'
    });
    sr.reveal('.banner-content', { 
        origin: 'top',
        delay: 400,
        distance: '50px'
    });
    sr.reveal('.contact-container', {
        origin: 'right',
        delay: 300
    });

    // Enhanced form validation and submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const submitBtn = this.querySelector('.submit-btn');
            
            clearErrors();
            
            // Validation checks
            let isValid = true;
            
            if (name.length < 2) {
                showError('name', 'Name must be at least 2 characters');
                isValid = false;
            }
            
            if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (message.length < 10) {
                showError('message', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            if (isValid) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Send email using EmailJS
                emailjs.send(
                    'service_rwxz1cl', // Replace with your EmailJS service ID
                    'template_cjbrmrl', // Replace with your EmailJS template ID
                    {
                        from_name: name,
                        reply_to: email,
                        message: message
                    }
                ).then(
                    function() {
                        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                        submitBtn.classList.add('success');
                        showSuccessMessage('Thank you! We\'ll get back to you soon.');
                        contactForm.reset();
                        
                        setTimeout(() => {
                            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                            submitBtn.disabled = false;
                            submitBtn.classList.remove('success');
                        }, 2000);
                    },
                    function(error) {
                        submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to send';
                        submitBtn.classList.add('error');
                        showError('submit', 'Failed to send message. Please try again.');
                        
                        setTimeout(() => {
                            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                            submitBtn.disabled = false;
                            submitBtn.classList.remove('error');
                        }, 2000);
                    }
                );
            }
        });
    }

    // Enhanced service item animations
    document.querySelectorAll('.service-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    // Helper functions
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = message;
        field.classList.add('error');
        field.parentNode.appendChild(errorDiv);
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(error => error.remove());
        document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
    }

    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = message;
        contactForm.insertAdjacentElement('beforebegin', successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
});
