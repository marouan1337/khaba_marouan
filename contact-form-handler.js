// Contact Form Handler
// This file handles the contact form submission and integrates with EmailJS

document.addEventListener('DOMContentLoaded', async function() {
    // Initialize EmailJS with proper error handling
    try {
        await window.emailService.init();
    } catch (error) {
        console.error('Failed to initialize EmailJS:', error);
        // Show initialization error message to user
        const feedbackContainer = document.createElement('div');
        feedbackContainer.className = 'form-feedback';
        feedbackContainer.style.display = 'block';
        feedbackContainer.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
        feedbackContainer.style.color = '#ff5555';
        feedbackContainer.style.border = '1px solid #ff5555';
        feedbackContainer.style.padding = '10px';
        feedbackContainer.style.marginTop = '15px';
        feedbackContainer.style.borderRadius = 'var(--border-radius)';
        feedbackContainer.style.textAlign = 'center';
        feedbackContainer.innerHTML = '<i class="fas fa-exclamation-circle"></i> Email service initialization failed. Please try again later.';
        
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.appendChild(feedbackContainer);
        }
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;
    
    // Create feedback elements
    const feedbackContainer = document.createElement('div');
    feedbackContainer.className = 'form-feedback';
    feedbackContainer.style.display = 'none';
    feedbackContainer.style.marginTop = '15px';
    feedbackContainer.style.padding = '10px';
    feedbackContainer.style.borderRadius = 'var(--border-radius)';
    feedbackContainer.style.textAlign = 'center';
    
    // Add feedback container after the form
    if (contactForm) {
        contactForm.appendChild(feedbackContainer);
        
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Prepare form data for email service
            const formData = {
                name,
                email,
                subject,
                message
            };
            
            try {
                // Send email using EmailJS
                const result = await window.emailService.sendEmail(formData);
                
                // Show success or error message
                feedbackContainer.style.display = 'block';
                
                if (result.success) {
                    feedbackContainer.style.backgroundColor = 'rgba(0, 255, 157, 0.1)';
                    feedbackContainer.style.color = 'var(--success-color)';
                    feedbackContainer.style.border = '1px solid var(--success-color)';
                    feedbackContainer.innerHTML = '<i class="fas fa-check-circle"></i> ' + result.message;
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    feedbackContainer.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                    feedbackContainer.style.color = '#ff5555';
                    feedbackContainer.style.border = '1px solid #ff5555';
                    feedbackContainer.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + result.message;
                }
            } catch (error) {
                // Show error message
                feedbackContainer.style.display = 'block';
                feedbackContainer.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                feedbackContainer.style.color = '#ff5555';
                feedbackContainer.style.border = '1px solid #ff5555';
                feedbackContainer.innerHTML = '<i class="fas fa-exclamation-circle"></i> An error occurred. Please try again later.';
                console.error('Form submission error:', error);
            } finally {
                // Reset button state
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Send Message';
                }
                
                // Scroll to feedback message
                feedbackContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Hide feedback after 5 seconds
                setTimeout(() => {
                    feedbackContainer.style.display = 'none';
                }, 5000);
            }
        });
    }
});