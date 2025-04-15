// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Testimonial Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }

    // Initialize testimonial slider
    if (testimonialCards.length > 0) {
        showTestimonial(0);
        setInterval(nextTestimonial, 5000); // Auto-slide every 5 seconds
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Initialize EmailJS
    (function() {
        emailjs.init("_nue8nEf1ZCHCQaX7"); // Your EmailJS public key
    })();

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }
            
            try {
                // Get form data
                const formData = {
                    from_name: document.getElementById('name').value,
                    from_email: document.getElementById('email').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value,
                    to_email: 'khabamarwan1@gmail.com'
                };
                
                // Send email using EmailJS
                const result = await emailjs.send(
                    'service_wjblzfc', // Your EmailJS service ID
                    'template_4ied90b', // Your EmailJS template ID
                    formData
                );
                
                // Show success message
                alert('Message sent successfully!');
                
                // Reset form
                contactForm.reset();
            } catch (error) {
                console.error('Form submission error:', error);
                alert('Failed to send message. Please try again later.');
            } finally {
                // Reset button state
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Send Message';
                }
            }
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.padding = '1rem 0';
                navbar.style.background = 'rgba(5, 5, 16, 0.95)';
            } else {
                navbar.style.padding = '1.5rem 0';
                navbar.style.background = 'rgba(5, 5, 16, 0.9)';
            }
        });
    }

    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navLinkItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Typing effect for hero section
    const heroText = document.querySelector('.hero h1');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        typeWriter();
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .service-card, .skill-item, .project-card, .testimonial-card').forEach(el => {
        el.classList.add('fade-out');
        observer.observe(el);
    });

    // Particle background effect
    function createParticles() {
        const canvas = document.createElement('canvas');
        canvas.classList.add('particles');
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            
            draw() {
                ctx.fillStyle = 'rgba(0, 240, 255, 0.1)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        function init() {
            particles = [];
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle());
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animate);
        }
        
        window.addEventListener('resize', resize);
        resize();
        init();
        animate();
    }

    // Initialize particles
    createParticles();

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-out {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .particles {
            position: fixed;
            top: 0;
            left: 0;
            z-index: -1;
            pointer-events: none;
        }
        
        .nav-links a.active {
            color: var(--primary);
        }
        
        .nav-links a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
});