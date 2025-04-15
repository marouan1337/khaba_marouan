// Email Service using EmailJS
// This file handles the email functionality for the contact form

// EmailJS configuration
const EMAILJS_USER_ID = "public_9hltz4f"; // Your EmailJS User ID (public key)
const EMAILJS_SERVICE_ID = "service_9hltz4f"; // Your Gmail service ID from EmailJS
const EMAILJS_TEMPLATE_ID = "template_contact"; // Your EmailJS Template ID

// Initialize EmailJS
function initEmailJS() {
    return new Promise((resolve, reject) => {
        try {
            if (typeof emailjs === 'undefined') {
                reject(new Error('EmailJS SDK not loaded. Please check your internet connection.'));
                return;
            }

            emailjs.init(EMAILJS_USER_ID);
            console.log('EmailJS initialized successfully');
            resolve();
        } catch (error) {
            console.error('Error initializing EmailJS:', error);
            reject(error);
        }
    });
}

// Send email using EmailJS
async function sendEmail(formData) {
    try {
        // Check if emailjs object exists before sending
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS SDK not loaded properly. Cannot send email.');
            return {
                success: false,
                message: "Email service not available. Please try again later."
            };
        }
        
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: "khabamarwan1@gmail.com" // The email where you want to receive messages
        };

        console.log('Sending email with EmailJS...', {
            service: EMAILJS_SERVICE_ID,
            template: EMAILJS_TEMPLATE_ID,
            params: templateParams
        });

        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );

        console.log('Email sent successfully:', response);
        return {
            success: true,
            message: "Your message has been sent successfully!"
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            success: false,
            message: "Failed to send message. Please try again later."
        };
    }
}

// Export functions
window.emailService = {
    init: initEmailJS,
    sendEmail: sendEmail
};