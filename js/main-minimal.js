// Initialize AOS (Animate On Scroll) Library
AOS.init({
    duration: 1000,
    easing: 'ease-in-out-sine',
    once: true,
    offset: 100
});

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded successfully');
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initButtons();
    initContactForm();
    initCounterAnimation();
});

// Navigation Functionality
function initNavigation() {
    console.log('Initializing navigation');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('mobile-nav');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('hidden');
        });
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (!navMenu.classList.contains('hidden')) {
                hamburger.classList.remove('active');
                navMenu.classList.add('hidden');
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
            navbar.classList.remove('bg-white/95');
            navbar.classList.add('bg-white/98', 'shadow-2xl');
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.classList.add('bg-white/95');
            navbar.classList.remove('bg-white/98', 'shadow-2xl');
        }
    });
}

// Scroll Effects
function initScrollEffects() {
    console.log('Initializing scroll effects');
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Button Interactions
function initButtons() {
    console.log('Initializing buttons');
    // Add hover effects and interactions for buttons
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Contact Form (placeholder)
function initContactForm() {
    console.log('Contact form initialized');
    // Placeholder for contact form functionality
}

// Counter Animation (placeholder)
function initCounterAnimation() {
    console.log('Counter animation initialized');
    // Placeholder for counter functionality
}