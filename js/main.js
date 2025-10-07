// Loader Management
function initLoader() {
    const loader = document.getElementById('loader');
    
    if (!loader) {
        console.warn('Loader element not found');
        return;
    }
    
    // Minimum loading time for smooth experience (0.8 seconds)
    const minLoadTime = 800;
    const startTime = Date.now();
    
    function hideLoader() {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsedTime);
        
        setTimeout(() => {
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    document.body.classList.add('loaded');
                }, 500); // Wait for fade out transition
            }
        }, remainingTime);
    }
    
    // Hide loader when everything is ready
    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }
    
    // Fallback: ensure loader is hidden after 3 seconds regardless
    setTimeout(() => {
        if (loader && loader.style.display !== 'none') {
            console.log('Loader fallback triggered');
            hideLoader();
        }
    }, 3000);
}

// Initialize loader immediately
document.addEventListener('DOMContentLoaded', initLoader);

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) Library
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out-sine',
        once: true,
        offset: 100
    });
    
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initButtons();
    initContactForm();
    initSearchFunctionality(); // Re-enabled with simple implementation
    initCounterAnimation();
});

// Navigation Functionality
function initNavigation() {
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
            navbar.classList.remove('navbar-scrolled', 'bg-white/98', 'shadow-2xl');
            navbar.classList.add('bg-white/95');
        }
    });

    // Smooth scrolling for internal anchor links only
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only apply smooth scrolling to internal anchor links (starting with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            // For external links (catalogue.html, about.html, etc.), let browser handle normally
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    const backToTopBtn = document.getElementById('backToTop');
    
    // Back to top button
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Parallax effect for floating elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Button Interactions
function initButtons() {
    const orderBtn = document.getElementById('orderBtn');

    // Order Now button
    if (orderBtn) {
        orderBtn.addEventListener('click', function() {
            // Add ripple effect
            createRippleEffect(this, event);
            
            // Scroll to catalogue section
            const catalogueSection = document.getElementById('catalogue');
            if (catalogueSection) {
                const offsetTop = catalogueSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Add ripple effect to Order Now button if it exists
    const orderButton = document.getElementById('orderBtn');
    if (orderButton) {
        orderButton.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
    }

    // Initialize buttons with ripple effects
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!this.closest('form')) { // Don't add ripples to form buttons
                createRippleEffect(this, e);
            }
        });
    });
}

// Create Ripple Effect
function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Placeholder for future homepage-specific functionality



// Custom Order Modal Functionality
function initCustomOrderModal() {
    const modal = document.getElementById('customOrderModal');
    const closeModal = document.getElementById('closeModal');
    const buyNowBtns = document.querySelectorAll('.buy-now-btn');
    const customOrderForm = document.getElementById('customOrderForm');
    const increaseQty = document.getElementById('increaseQty');
    const decreaseQty = document.getElementById('decreaseQty');
    const quantityDisplay = document.getElementById('quantity');
    
    let currentCakeData = {};
    let quantity = 1;
    
    // Open modal when Buy Now is clicked
    buyNowBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cakeType = this.getAttribute('data-cake-type');
            const basePrice = parseInt(this.getAttribute('data-base-price'));
            const cakeImage = this.closest('.product-item').querySelector('img').src;
            
            currentCakeData = {
                type: cakeType,
                basePrice: basePrice,
                image: cakeImage
            };
            
            // Update modal content
            document.getElementById('modalCakeImage').src = cakeImage;
            document.getElementById('modalCakeName').textContent = cakeType;
            document.getElementById('modalCakeType').textContent = 'Cake type';
            
            // Set minimum date to tomorrow
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            document.getElementById('deliveryDate').min = tomorrow.toISOString().split('T')[0];
            
            // Reset form and calculate initial price
            quantity = 1;
            quantityDisplay.textContent = quantity;
            calculatePrice();
            
            // Show modal
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    });
    
    // Quantity controls
    increaseQty.addEventListener('click', function() {
        quantity++;
        quantityDisplay.textContent = quantity;
        calculatePrice();
    });
    
    decreaseQty.addEventListener('click', function() {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
            calculatePrice();
        }
    });
    
    // Size, flavor, and delivery option changes
    const sizeOptions = document.querySelectorAll('input[name="size"]');
    const flavorOptions = document.querySelectorAll('input[name="flavor"]');
    const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
    
    [...sizeOptions, ...flavorOptions, ...deliveryOptions].forEach(option => {
        option.addEventListener('change', function() {
            // Update visual selection
            const parent = this.closest('.size-option, .flavor-option, .delivery-option');
            const siblings = parent.parentNode.children;
            
            Array.from(siblings).forEach(sibling => {
                const card = sibling.querySelector('.size-card, .flavor-card, .delivery-card');
                card.classList.remove('border-gold-500', 'bg-gold-50');
                card.classList.add('border-gray-200');
            });
            
            const currentCard = this.closest('.size-option, .flavor-option, .delivery-option').querySelector('.size-card, .flavor-card, .delivery-card');
            currentCard.classList.remove('border-gray-200');
            currentCard.classList.add('border-gold-500', 'bg-gold-50');
            
            calculatePrice();
        });
    });
    
    // Calculate price function
    function calculatePrice() {
        const selectedSize = document.querySelector('input[name="size"]:checked');
        const selectedDelivery = document.querySelector('input[name="delivery"]:checked');
        
        const sizeMultiplier = selectedSize ? parseFloat(selectedSize.getAttribute('data-multiplier')) : 1.5;
        const deliveryFee = selectedDelivery ? parseInt(selectedDelivery.getAttribute('data-fee')) : 10;
        
        const totalPrice = (currentCakeData.basePrice * sizeMultiplier * quantity) + deliveryFee;
        document.getElementById('modalPrice').textContent = `RM${totalPrice}`;
    }
    
    // Form submission
    customOrderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const selectedSize = document.querySelector('input[name="size"]:checked');
        const selectedFlavor = document.querySelector('input[name="flavor"]:checked');
        const selectedDelivery = document.querySelector('input[name="delivery"]:checked');
        
        const orderData = {
            id: Date.now(),
            type: currentCakeData.type,
            image: currentCakeData.image,
            size: selectedSize.value,
            flavor: selectedFlavor.value,
            delivery: selectedDelivery.value,
            date: formData.get('date'),
            time: formData.get('time'),
            quantity: quantity,
            price: document.getElementById('modalPrice').textContent,
            timestamp: new Date().toISOString()
        };
        
        // Show success notification  
        showNotification(`Order details saved! Redirecting to catalogue...`, 'success');
        
        // Close modal and redirect to catalogue
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        
        // Redirect to catalogue page after brief delay
        setTimeout(() => {
            window.location.href = 'catalogue.html';
        }, 1500);
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.submit-btn');
            
            // Button loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showNotification('Message sent successfully!', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Search Functionality
function initSearchFunctionality() {
    const searchIcon = document.getElementById('search-icon');
    
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            createSearchModal();
        });
    }
}

function createSearchModal() {
    // Create search modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-fade-in';
    
    const searchBox = document.createElement('div');
    searchBox.className = 'bg-white p-8 rounded-3xl w-11/12 max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto';
    
    searchBox.innerHTML = `
        <h3 class="font-playfair text-2xl font-semibold text-amber-900 mb-6 text-center">Search Products</h3>
        <div class="relative mb-6">
            <input type="text" id="search-input" placeholder="Search for cakes, categories, prices..." 
                   class="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors duration-300 pr-12">
            <i class="fas fa-search absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
        
        <!-- Quick Filters -->
        <div class="mb-6">
            <p class="text-sm text-gray-600 mb-2">Browse by Category:</p>
            <div class="flex flex-wrap gap-2">
                <button class="filter-btn px-4 py-2 bg-gray-100 hover:bg-yellow-100 border border-gray-300 hover:border-yellow-400 rounded-full text-sm transition-all duration-300" data-category="all">All Categories</button>
                <button class="filter-btn px-4 py-2 bg-gray-100 hover:bg-yellow-100 border border-gray-300 hover:border-yellow-400 rounded-full text-sm transition-all duration-300" data-category="birthday">Birthday Cakes</button>
                <button class="filter-btn px-4 py-2 bg-gray-100 hover:bg-yellow-100 border border-gray-300 hover:border-yellow-400 rounded-full text-sm transition-all duration-300" data-category="wedding">Wedding Cakes</button>
                <button class="filter-btn px-4 py-2 bg-gray-100 hover:bg-yellow-100 border border-gray-300 hover:border-yellow-400 rounded-full text-sm transition-all duration-300" data-category="event">Event Cakes</button>
                <button class="filter-btn px-4 py-2 bg-gray-100 hover:bg-yellow-100 border border-gray-300 hover:border-yellow-400 rounded-full text-sm transition-all duration-300" data-category="custom">Custom Designs</button>
            </div>
        </div>
        
        <div class="flex gap-4 justify-center">
            <button class="search-btn bg-gradient-to-r from-amber-800 to-amber-700 hover:from-yellow-500 hover:to-yellow-600 text-white hover:text-amber-800 px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                Go to Catalogue
            </button>
            <button class="close-search bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">Close</button>
        </div>
    `;
    
    modal.appendChild(searchBox);
    document.body.appendChild(modal);
    
    // Initialize search functionality
    initializeSearchModal(modal, searchBox);
}

function initializeSearchModal(modal, searchBox) {
    const searchInput = searchBox.querySelector('#search-input');
    const suggestionsContainer = searchBox.querySelector('#suggestions-container');
    const searchSuggestions = searchBox.querySelector('#search-suggestions');
    const searchResults = searchBox.querySelector('#search-results');
    const resultsContainer = searchBox.querySelector('#results-container');
    const filterButtons = searchBox.querySelectorAll('.filter-btn');
    
    let currentQuery = '';
    let currentCategory = 'all';
    let searchResultsData = [];
    
    // Focus on input
    searchInput.focus();
    
    // Initialize filter buttons with proper styling
    filterButtons.forEach(btn => {
        // Set default styling for all buttons
        btn.classList.add('text-gray-700', 'border-gray-300');
        // Set selected styling for "All Categories" button
        if (btn.dataset.category === 'all') {
            btn.classList.remove('bg-gray-100', 'text-gray-700', 'border-gray-300');
            btn.classList.add('bg-amber-700', 'text-white', 'border-amber-700');
        }
    });
    
    // Filter button handlers
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter - reset all buttons
            filterButtons.forEach(b => {
                b.classList.remove('bg-yellow-600', 'text-white', 'border-yellow-600', 'bg-amber-700');
                b.classList.add('bg-gray-100', 'text-gray-700', 'border-gray-300');
            });
            // Apply selected styling with good contrast
            btn.classList.remove('bg-gray-100', 'text-gray-700', 'border-gray-300');
            btn.classList.add('bg-amber-700', 'text-white', 'border-amber-700');
            
            currentCategory = btn.dataset.category;
        });
    });
    
    // Search input handler
    searchInput.addEventListener('input', (e) => {
        currentQuery = e.target.value.trim();
    });
    
    // Enter key to search
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            navigateToResults();
        }
    });
    
    // Search button handler
    const searchBtn = searchBox.querySelector('.search-btn');
    const closeBtn = searchBox.querySelector('.close-search');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            navigateToResults();
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    function navigateToResults() {
        // Store search parameters in session storage
        if (currentQuery) {
            sessionStorage.setItem('searchQuery', currentQuery);
        }
        if (currentCategory && currentCategory !== 'all') {
            sessionStorage.setItem('searchCategory', currentCategory);
        }
        
        // Navigate to catalogue page
        window.location.href = 'catalogue.html';
    }
    
    // Simplified search - no external dependencies needed
    // Focus on search input
    searchInput.focus();
}

// Enhanced Product Interactions


// Enhanced Product Category Filtering Animation
function animateProductFilter() {
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach((item, index) => {
        if (!item.classList.contains('hidden')) {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}

// Counter Animation for Statistics
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.7
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(number => {
        observer.observe(number);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
    }, 16);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-24 right-5 px-6 py-4 rounded-xl shadow-lg z-50 max-w-sm font-medium text-white ${getNotificationClasses(type)} animate-[slideInRight_0.3s_ease]`;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('animate-[slideInRight_0.3s_ease]');
        notification.classList.add('animate-[slideOutRight_0.3s_ease]');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function getNotificationClasses(type) {
    const classes = {
        success: 'bg-gradient-to-r from-green-500 to-emerald-500',
        error: 'bg-gradient-to-r from-red-500 to-red-600',
        info: 'bg-gradient-to-r from-blue-500 to-cyan-500',
        warning: 'bg-gradient-to-r from-yellow-500 to-orange-500'
    };
    return classes[type] || classes.info;
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 25px rgba(0, 0, 0, 0.15);
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);

// Smooth page loading
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Performance optimization - Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('[style*="position: fixed"]');
        modals.forEach(modal => {
            if (modal.style.zIndex >= '2000') {
                modal.remove();
            }
        });
    }
    
    // Enter key on focused buttons
    if (e.key === 'Enter' && document.activeElement.tagName === 'BUTTON') {
        document.activeElement.click();
    }
});