// Catalogue JavaScript

// Loader Management
function initLoader() {
    const loader = document.getElementById('loader');
    const progressBar = document.getElementById('progress-bar');
    
    // Minimum loading time for smooth experience (0.6 seconds for catalogue)
    const minLoadTime = 600;
    const startTime = Date.now();
    let progress = 0;
    
    // Simulate progress
    function updateProgress() {
        if (progress < 90) {
            progress += Math.random() * 15;
            if (progress > 90) progress = 90;
            
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }
            
            setTimeout(updateProgress, 100 + Math.random() * 200);
        }
    }
    
    // Start progress animation
    updateProgress();
    
    function hideLoader() {
        // Complete the progress bar
        if (progressBar) {
            progressBar.style.width = '100%';
        }
        
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
}

// Initialize loader immediately
initLoader();

// Lazy Loading for Images
function initLazyLoading() {
    // Create placeholder image for lazy loading
    const createPlaceholder = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');
        
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, 400, 300);
        gradient.addColorStop(0, '#f7fafc');
        gradient.addColorStop(1, '#edf2f7');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 300);
        
        // Add loading text
        ctx.fillStyle = '#a0aec0';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Loading...', 200, 150);
        
        return canvas.toDataURL();
    };

    const placeholderSrc = createPlaceholder();
    
    // Set placeholder for all lazy images
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => {
        img.src = placeholderSrc;
        img.style.filter = 'blur(2px)';
    });

    // Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const actualSrc = img.getAttribute('data-src');
                
                if (actualSrc) {
                    // Create new image to preload
                    const newImg = new Image();
                    newImg.onload = () => {
                        img.src = actualSrc;
                        img.style.filter = 'none';
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                    };
                    newImg.onerror = () => {
                        img.src = placeholderSrc;
                        img.style.filter = 'none';
                        console.warn('Failed to load image:', actualSrc);
                    };
                    newImg.src = actualSrc;
                }
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '100px 0px', // Start loading 100px before entering viewport
        threshold: 0.01
    });

    // Preload first 3 images immediately for better perceived performance
    const firstImages = Array.from(lazyImages).slice(0, 3);
    firstImages.forEach(img => {
        const actualSrc = img.getAttribute('data-src');
        if (actualSrc) {
            const preloader = new Image();
            preloader.onload = () => {
                img.src = actualSrc;
                img.style.filter = 'none';
                img.classList.remove('lazy');
                img.classList.add('loaded');
            };
            preloader.src = actualSrc;
        }
    });
    
    // Observe remaining lazy images
    const remainingImages = Array.from(lazyImages).slice(3);
    remainingImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance monitoring
function trackPerformance() {
    if (performance && performance.mark) {
        performance.mark('catalogue-start');
        
        window.addEventListener('load', () => {
            performance.mark('catalogue-loaded');
            performance.measure('catalogue-load-time', 'catalogue-start', 'catalogue-loaded');
            
            const loadTime = performance.getEntriesByName('catalogue-load-time')[0];
            console.log(`Catalogue load time: ${Math.round(loadTime.duration)}ms`);
            
            // Track when first images are loaded
            setTimeout(() => {
                const loadedImages = document.querySelectorAll('img.loaded').length;
                console.log(`Images loaded immediately: ${loadedImages}`);
            }, 1000);
        });
    }
}

// Initialize performance tracking
trackPerformance();

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Cart Management with JSON data structure
class CartManager {
    constructor() {
        this.cartItems = this.loadCartFromStorage();
        this.cartCount = this.cartItems.length;
        this.updateCartDisplay();
    }

    loadCartFromStorage() {
        try {
            const cartData = localStorage.getItem('akaApricusCart');
            return cartData ? JSON.parse(cartData) : [];
        } catch (error) {
            console.error('Error loading cart from storage:', error);
            return [];
        }
    }

    saveCartToStorage() {
        try {
            localStorage.setItem('akaApricusCart', JSON.stringify(this.cartItems));
            this.saveCartToJSON();
        } catch (error) {
            console.error('Error saving cart to storage:', error);
        }
    }

    async saveCartToJSON() {
        // In a real application, this would send data to a server
        // For now, we'll simulate it by creating a downloadable JSON structure
        const cartData = {
            cartId: `cart_${Date.now()}`,
            timestamp: new Date().toISOString(),
            items: this.cartItems,
            totalItems: this.cartCount,
            totalAmount: this.calculateTotal(),
            currency: 'RM'
        };

        // Store in localStorage as JSON structure for demonstration
        localStorage.setItem('akaApricusCartData', JSON.stringify(cartData, null, 2));
        
        console.log('Cart data saved:', cartData);
    }

    addItem(orderData) {
        const cartItem = {
            id: `item_${Date.now()}`,
            ...orderData,
            addedAt: new Date().toISOString()
        };
        
        this.cartItems.push(cartItem);
        this.cartCount = this.cartItems.length;
        this.saveCartToStorage();
        this.updateCartDisplay();
        
        return cartItem;
    }

    removeItem(itemId) {
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
        this.cartCount = this.cartItems.length;
        this.saveCartToStorage();
        this.updateCartDisplay();
    }

    clearCart() {
        this.cartItems = [];
        this.cartCount = 0;
        this.saveCartToStorage();
        this.updateCartDisplay();
    }

    calculateTotal() {
        return this.cartItems.reduce((total, item) => {
            const priceStr = item.price ? item.price.toString() : '0';
            const price = parseFloat(priceStr.replace(/[^\d.]/g, '')) || 0;
            const quantity = parseInt(item.quantity) || 1;
            return total + (price * quantity);
        }, 0);
    }

    updateCartDisplay() {
        const cartIcon = document.getElementById('cart-icon');
        if (cartIcon) {
            let badge = cartIcon.querySelector('.cart-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'cart-badge';
                cartIcon.classList.add('relative');
                cartIcon.appendChild(badge);
            }
            badge.textContent = this.cartCount;
            badge.style.display = this.cartCount > 0 ? 'flex' : 'none';
        }
    }

    viewCart() {
        if (this.cartItems.length === 0) {
            showNotification('Your cart is empty!', 'info');
            return;
        }
        
        this.createCartModal();
    }

    createCartModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4';
        
        let cartHTML = `
            <div class="bg-white rounded-2xl sm:rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div class="p-4 sm:p-8">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="font-playfair text-xl sm:text-3xl font-bold text-brown-800">Your Cart</h2>
                        <button class="close-cart-modal w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-300">
                            <i class="fas fa-times text-gray-600"></i>
                        </button>
                    </div>
                    
                    <div class="space-y-4 mb-6">
        `;
        
        let totalAmount = this.calculateTotal();
        
        this.cartItems.forEach((item, index) => {
            cartHTML += `
                <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                    <img src="${item.image}" alt="${item.type}" class="w-20 h-20 object-cover rounded-xl">
                    <div class="flex-1">
                        <h3 class="font-semibold text-brown-800">${item.type}</h3>
                        <p class="text-sm text-gray-600">Size: ${item.size} | Flavor: ${item.flavor}</p>
                        <p class="text-sm text-gray-600">Delivery: ${item.delivery} | Date: ${item.date} ${item.time}</p>
                        <p class="text-sm text-gray-600">Quantity: ${item.quantity}</p>
                        <p class="text-xs text-gray-500">Added: ${new Date(item.addedAt).toLocaleString()}</p>
                    </div>
                    <div class="text-right">
                        <div class="text-lg font-bold text-green-500">${item.price}</div>
                        <button class="remove-item text-red-500 hover:text-red-700 transition-colors duration-300 mt-2" data-item-id="${item.id}">
                            <i class="fas fa-trash text-sm"></i> Remove
                        </button>
                    </div>
                </div>
            `;
        });
        
        cartHTML += `
                    </div>
                    
                    <div class="border-t pt-6">
                        <div class="flex justify-between items-center mb-6">
                            <span class="text-xl font-bold text-brown-800">Total Amount:</span>
                            <span class="text-2xl font-bold text-green-500">RM${totalAmount.toFixed(2)}</span>
                        </div>
                        
                        <div class="flex gap-4">
                            <button class="export-cart flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-colors duration-300">
                                Export Cart Data
                            </button>
                            <button class="clear-cart flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-colors duration-300">
                                Clear Cart
                            </button>
                            <button class="checkout flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.innerHTML = cartHTML;
        document.body.appendChild(modal);
        
        // Event listeners
        modal.querySelector('.close-cart-modal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Remove item functionality
        modal.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const itemId = btn.getAttribute('data-item-id');
                this.removeItem(itemId);
                modal.remove();
                
                if (this.cartItems.length > 0) {
                    this.createCartModal();
                }
                
                showNotification('Item removed from cart', 'info');
            });
        });
        
        // Export cart functionality
        modal.querySelector('.export-cart').addEventListener('click', () => {
            this.exportCartData();
        });
        
        // Clear cart functionality
        modal.querySelector('.clear-cart').addEventListener('click', () => {
            this.clearCart();
            modal.remove();
            showNotification('Cart cleared successfully', 'info');
        });
        
        // Checkout functionality
        modal.querySelector('.checkout').addEventListener('click', () => {
            showNotification('Redirecting to checkout...', 'success');
            modal.remove();
            // Redirect to checkout page
            setTimeout(() => {
                window.location.href = 'checkout.html';
            }, 1000);
        });
    }

    exportCartData() {
        const cartData = {
            cartId: `cart_${Date.now()}`,
            timestamp: new Date().toISOString(),
            items: this.cartItems,
            totalItems: this.cartCount,
            totalAmount: this.calculateTotal(),
            currency: 'RM',
            exportedAt: new Date().toISOString()
        };

        const dataStr = JSON.stringify(cartData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `aka-apricus-cart-${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showNotification('Cart data exported successfully!', 'success');
    }
}

// Initialize cart manager
const cartManager = new CartManager();

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) Library
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out-sine',
        once: true,
        offset: 100
    });
    
    initNavigation();
    initScrollEffects();
    initButtons();
    initCategoryFilters();
    initPriceFilter();
    initCustomOrderModal();
    initProductInteractions();
    // handleSearchResults(); // Temporarily disabled
    
    // Performance optimization - Lazy loading for images
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
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
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
}

// Scroll Effects
function initScrollEffects() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
                backToTopBtn.classList.remove('opacity-0', 'invisible');
                backToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                backToTopBtn.classList.remove('show', 'opacity-100', 'visible');
                backToTopBtn.classList.add('opacity-0', 'invisible');
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
    // Cart icon click handler
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            cartManager.viewCart();
        });
    }

    // Buy Now buttons with ripple effects
    const buyNowBtns = document.querySelectorAll('.buy-now-btn');
    buyNowBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
    });
}

// Category Filter Functionality
function initCategoryFilters() {
    const categoryCards = document.querySelectorAll('.category-card');
    const productItems = document.querySelectorAll('.product-item');
    
    // Initialize default category (birthday) on page load
    const defaultCategory = document.querySelector('.category-card[data-category="birthday"]');
    if (defaultCategory) {
        // Show birthday cards by default and hide others
        productItems.forEach(item => {
            if (item.getAttribute('data-category') === 'birthday') {
                item.classList.remove('hidden');
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            } else {
                item.classList.add('hidden');
            }
        });
    }
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Update active category visual state
            categoryCards.forEach(c => {
                c.classList.remove('active-category', 'bg-gold-500');
                c.classList.add('bg-brown-600');
            });
            this.classList.remove('bg-brown-600');
            this.classList.add('active-category', 'bg-gold-500');
            
            // Filter products with smooth transition
            const selectedCategory = this.getAttribute('data-category');
            
            // Hide all products immediately
            productItems.forEach(item => {
                item.classList.add('hidden');
            });
            
            // Smooth scroll to products section
            const productsContainer = document.getElementById('products-container');
            if (productsContainer) {
                productsContainer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start',
                    inline: 'nearest' 
                });
            }
            
            // Show matching products with staggered animation
            setTimeout(() => {
                let delay = 0;
                const matchingItems = Array.from(productItems).filter(item => 
                    item.getAttribute('data-category') === selectedCategory
                );
                
                matchingItems.forEach((item, index) => {
                    setTimeout(() => {
                        // Show the element and let CSS handle the animation
                        item.classList.remove('hidden');
                    }, delay);
                    
                    delay += 80; // Reduced delay for smoother experience
                });
            }, 100); // Small delay to ensure DOM updates and smooth scroll
        });
    });
}

// Price Filter Functionality
function initPriceFilter() {
    const minPriceSlider = document.getElementById('minPriceSlider');
    const maxPriceSlider = document.getElementById('maxPriceSlider');
    const minPriceDisplay = document.getElementById('minPriceDisplay');
    const maxPriceDisplay = document.getElementById('maxPriceDisplay');
    const priceFilterButtons = document.querySelectorAll('.price-filter-btn');
    const searchInput = document.getElementById('cakeSearch');
    const sortSelect = document.getElementById('sortSelect');
    const filterResults = document.getElementById('resultsCount');
    const productItems = document.querySelectorAll('.product-item');

    // Initialize price display
    function updatePriceDisplay() {
        const minValue = parseInt(minPriceSlider.value);
        const maxValue = parseInt(maxPriceSlider.value);
        
        // Ensure min is not greater than max
        if (minValue > maxValue) {
            minPriceSlider.value = maxValue;
        }
        if (maxValue < minValue) {
            maxPriceSlider.value = minValue;
        }
        
        minPriceDisplay.textContent = `RM${minPriceSlider.value}`;
        maxPriceDisplay.textContent = `RM${maxPriceSlider.value}`;
        
        filterProducts();
    }

    // Filter products based on all criteria
    function filterProducts() {
        const minPrice = parseInt(minPriceSlider.value);
        const maxPrice = parseInt(maxPriceSlider.value);
        const searchTerm = searchInput.value.toLowerCase();
        const sortOption = sortSelect.value;
        
        let visibleProducts = [];
        
        productItems.forEach(item => {
            const itemPrice = parseInt(item.getAttribute('data-price'));
            const itemTitle = item.querySelector('.product-title').textContent.toLowerCase();
            const itemDescription = item.querySelector('.product-description').textContent.toLowerCase();
            
            // Check price range
            const isPriceMatch = itemPrice >= minPrice && itemPrice <= maxPrice;
            
            // Check search term
            const isSearchMatch = searchTerm === '' || 
                itemTitle.includes(searchTerm) || 
                itemDescription.includes(searchTerm);
            
            // Show/hide based on filters
            if (isPriceMatch && isSearchMatch) {
                item.style.display = 'block';
                visibleProducts.push({
                    element: item,
                    price: itemPrice,
                    title: itemTitle
                });
            } else {
                item.style.display = 'none';
            }
        });
        
        // Sort visible products
        if (sortOption !== 'default') {
            visibleProducts.sort((a, b) => {
                switch (sortOption) {
                    case 'price-low':
                        return a.price - b.price;
                    case 'price-high':
                        return b.price - a.price;
                    case 'name-asc':
                        return a.title.localeCompare(b.title);
                    case 'name-desc':
                        return b.title.localeCompare(a.title);
                    default:
                        return 0;
                }
            });
            
            // Reorder DOM elements
            const productGrid = document.querySelector('.grid[data-aos="fade-up"]');
            visibleProducts.forEach(product => {
                productGrid.appendChild(product.element);
            });
        }
        
        // Update results count
        updateResultsCount(visibleProducts.length);
    }

    // Update filter results count
    function updateResultsCount(count) {
        if (filterResults) {
            filterResults.textContent = count;
        }
    }

    // Quick price filter buttons
    priceFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const priceRange = this.getAttribute('data-price-range');
            
            // Update active button
            priceFilterButtons.forEach(btn => {
                btn.classList.remove('active-price-filter', 'bg-gold-500', 'text-brown-800');
                btn.classList.add('bg-brown-100', 'text-brown-700');
            });
            this.classList.remove('bg-brown-100', 'text-brown-700');
            this.classList.add('active-price-filter', 'bg-gold-500', 'text-brown-800');
            
            // Set slider values based on range
            switch (priceRange) {
                case 'under-50':
                    minPriceSlider.value = 0;
                    maxPriceSlider.value = 50;
                    break;
                case '50-100':
                    minPriceSlider.value = 50;
                    maxPriceSlider.value = 100;
                    break;
                case '100-200':
                    minPriceSlider.value = 100;
                    maxPriceSlider.value = 200;
                    break;
                case 'above-200':
                    minPriceSlider.value = 200;
                    maxPriceSlider.value = 500;
                    break;
                case 'all':
                    minPriceSlider.value = 0;
                    maxPriceSlider.value = 500;
                    break;
            }
            
            updatePriceDisplay();
        });
    });

    // Reset filters functionality
    const resetFiltersBtn = document.getElementById('resetFilters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            // Reset sliders
            minPriceSlider.value = 0;
            maxPriceSlider.value = 500;
            
            // Reset search
            if (searchInput) searchInput.value = '';
            
            // Reset sort
            if (sortSelect) sortSelect.value = 'default';
            
            // Reset active price filter button
            priceFilterButtons.forEach(btn => {
                btn.classList.remove('active-price-filter', 'bg-gold-500', 'text-brown-800');
                btn.classList.add('bg-brown-100', 'text-brown-700');
            });
            
            // Set "All Prices" as active
            const allPricesBtn = document.querySelector('.price-filter-btn[data-price-range="all"]');
            if (allPricesBtn) {
                allPricesBtn.classList.remove('bg-brown-100', 'text-brown-700');
                allPricesBtn.classList.add('active-price-filter', 'bg-gold-500', 'text-brown-800');
            }
            
            // Update display and filter
            updatePriceDisplay();
        });
    }

    // Event listeners
    minPriceSlider.addEventListener('input', updatePriceDisplay);
    maxPriceSlider.addEventListener('input', updatePriceDisplay);
    
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', filterProducts);
    }

    // Initialize
    updatePriceDisplay();
}

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
            
            // Show modal with animation
            modal.classList.remove('hidden');
            modal.classList.add('flex', 'modal-enter');
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.classList.add('hidden');
        modal.classList.remove('flex', 'modal-enter');
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex', 'modal-enter');
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
    const sizeOptions = document.querySelectorAll('input[name=\"size\"]');
    const flavorOptions = document.querySelectorAll('input[name=\"flavor\"]');
    const deliveryOptions = document.querySelectorAll('input[name=\"delivery\"]');
    
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
    
    // Notes character counter
    const specialNotes = document.getElementById('specialNotes');
    const notesCount = document.getElementById('notesCount');
    
    if (specialNotes && notesCount) {
        specialNotes.addEventListener('input', function() {
            const currentLength = this.value.length;
            notesCount.textContent = `${currentLength}/500`;
            
            // Change color when approaching limit
            if (currentLength > 450) {
                notesCount.classList.add('text-red-500');
            } else if (currentLength > 350) {
                notesCount.classList.add('text-yellow-600');
                notesCount.classList.remove('text-red-500');
            } else {
                notesCount.classList.remove('text-red-500', 'text-yellow-600');
            }
        });
    }
    
    // Calculate price function
    function calculatePrice() {
        const selectedSize = document.querySelector('input[name=\"size\"]:checked');
        const selectedDelivery = document.querySelector('input[name=\"delivery\"]:checked');
        
        const sizeMultiplier = selectedSize ? parseFloat(selectedSize.getAttribute('data-multiplier')) : 1.5;
        const deliveryFee = selectedDelivery ? parseInt(selectedDelivery.getAttribute('data-fee')) : 10;
        
        const totalPrice = (currentCakeData.basePrice * sizeMultiplier * quantity) + deliveryFee;
        document.getElementById('modalPrice').textContent = `RM${totalPrice}`;
    }
    
    // Form submission
    customOrderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const selectedSize = document.querySelector('input[name=\"size\"]:checked');
        const selectedFlavor = document.querySelector('input[name=\"flavor\"]:checked');
        const selectedDelivery = document.querySelector('input[name=\"delivery\"]:checked');
        
        const cakeWriting = formData.get('cakeWriting') || '';
        const specialNotes = formData.get('notes') || '';
        
        // Validate required cake writing field
        if (!cakeWriting.trim()) {
            showNotification('Please specify what to write on the cake', 'error');
            const cakeWritingField = document.getElementById('cakeWriting');
            if (cakeWritingField) cakeWritingField.focus();
            return;
        }
        
        const orderData = {
            type: currentCakeData.type,
            image: currentCakeData.image,
            size: selectedSize.value,
            sizeMultiplier: selectedSize.getAttribute('data-multiplier'),
            flavor: selectedFlavor.value,
            delivery: selectedDelivery.value,
            deliveryFee: selectedDelivery.getAttribute('data-fee'),
            date: formData.get('date'),
            time: formData.get('time'),
            quantity: quantity,
            basePrice: currentCakeData.basePrice,
            price: document.getElementById('modalPrice').textContent,
            orderNotes: `${currentCakeData.type} - ${selectedSize.value} size, ${selectedFlavor.value} flavor, ${selectedDelivery.value}`,
            cakeWriting: cakeWriting,
            specialRequests: specialNotes
        };
        
        // Add to cart using cart manager
        const cartItem = cartManager.addItem(orderData);
        
        // Show success notification
        showNotification(`${orderData.type} added to cart successfully!`, 'success');
        
        // Close modal
        modal.classList.add('hidden');
        modal.classList.remove('flex', 'modal-enter');
    });
}

// Product Interactions
function initProductInteractions() {
    const productCards = document.querySelectorAll('.product-item');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-0.5rem) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
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

// Search Functionality
const searchIcon = document.getElementById('search-icon');
if (searchIcon) {
    searchIcon.addEventListener('click', function() {
        createSearchModal();
    });
}

function createSearchModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-fade-in';
    
    const searchBox = document.createElement('div');
    searchBox.className = 'bg-white p-8 rounded-3xl w-11/12 max-w-lg text-center shadow-2xl';
    
    searchBox.innerHTML = `
        <h3 class="font-playfair text-2xl font-semibold text-brown-800 mb-6">Search Cakes</h3>
        <input type="text" placeholder="Search for cakes..." class="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors duration-300 mb-6">
        <div class="flex gap-4 justify-center">
            <button class="search-btn bg-gradient-to-r from-brown-800 to-brown-700 hover:from-gold-500 hover:to-gold-900 text-white hover:text-brown-800 px-6 py-3 rounded-xl font-semibold transition-all duration-300">Search</button>
            <button class="close-search bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">Close</button>
        </div>
    `;
    
    modal.appendChild(searchBox);
    document.body.appendChild(modal);
    
    // Focus on input
    const searchInput = searchBox.querySelector('input');
    searchInput.focus();
    
    // Event listeners
    searchBox.querySelector('.close-search').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    searchBox.querySelector('.search-btn').addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            performSearch(query);
            modal.remove();
        }
    });

    // Enter key to search
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                performSearch(query);
                modal.remove();
            }
        }
    });
}

function performSearch(query) {
    const productItems = document.querySelectorAll('.product-item');
    let foundItems = 0;
    
    productItems.forEach(item => {
        const title = item.querySelector('.product-title').textContent.toLowerCase();
        const description = item.querySelector('.product-description').textContent.toLowerCase();
        const queryLower = query.toLowerCase();
        
        if (title.includes(queryLower) || description.includes(queryLower)) {
            item.classList.remove('hidden');
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            foundItems++;
        } else {
            item.classList.add('hidden');
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
        }
    });
    
    if (foundItems === 0) {
        showNotification(`No cakes found matching "${query}"`, 'info');
    } else {
        showNotification(`Found ${foundItems} cake(s) matching "${query}"`, 'success');
    }
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('[class*="fixed inset-0"]');
        modals.forEach(modal => {
            if (modal.classList.contains('z-50')) {
                modal.remove();
            }
        });
    }
});

// Duplicate removed - lazy loading now integrated into main DOMContentLoaded event

// Handle search results from search modal
function handleSearchResults() {
    const searchQuery = sessionStorage.getItem('searchQuery');
    const searchCategory = sessionStorage.getItem('searchCategory');
    const searchResults = sessionStorage.getItem('searchResults');
    
    if (searchQuery || (searchCategory && searchCategory !== 'all')) {
        // Parse search results
        let results = [];
        if (searchResults) {
            try {
                results = JSON.parse(searchResults);
            } catch (e) {
                console.error('Error parsing search results:', e);
            }
        }
        
        // Update page title and header
        const pageTitle = document.querySelector('h1');
        if (pageTitle) {
            if (searchQuery) {
                pageTitle.textContent = `Search Results for "${searchQuery}"`;
            } else if (searchCategory && searchCategory !== 'all') {
                pageTitle.textContent = `${searchCategory.charAt(0).toUpperCase() + searchCategory.slice(1)} Cakes`;
            }
        }
        
        // Show search info
        showSearchInfo(searchQuery, searchCategory, results.length);
        
        // Apply search filtering
        if (results.length > 0) {
            applySearchFilter(results);
        } else {
            showNoResults(searchQuery);
        }
        
        // Clear session storage after use
        sessionStorage.removeItem('searchQuery');
        sessionStorage.removeItem('searchCategory');
        sessionStorage.removeItem('searchResults');
    }
}

function showSearchInfo(query, category, resultCount) {
    const pageSubtitle = document.querySelector('section p');
    if (pageSubtitle) {
        let infoText = '';
        if (query && category && category !== 'all') {
            infoText = `Found ${resultCount} results for "${query}" in ${category} cakes`;
        } else if (query) {
            infoText = `Found ${resultCount} results for "${query}"`;
        } else if (category && category !== 'all') {
            infoText = `Showing all ${category} cakes (${resultCount} results)`;
        }
        
        if (infoText) {
            pageSubtitle.textContent = infoText;
            
            // Add a "Clear Search" button
            const clearButton = document.createElement('button');
            clearButton.textContent = 'View All Cakes';
            clearButton.className = 'mt-4 px-4 py-2 bg-brown-600 hover:bg-brown-700 text-white rounded-lg transition-colors duration-300';
            clearButton.addEventListener('click', () => {
                window.location.reload(); // Reload to show all products
            });
            
            pageSubtitle.parentNode.appendChild(clearButton);
        }
    }
}

function applySearchFilter(searchResults) {
    const productItems = document.querySelectorAll('.product-item');
    const searchResultIds = new Set(searchResults.map(r => r.id));
    
    // Hide all products first
    productItems.forEach(item => {
        item.classList.add('hidden');
    });
    
    // Show matching products with animation
    let delay = 0;
    productItems.forEach(item => {
        // Get product data from HTML attributes
        const category = item.getAttribute('data-category');
        const price = item.getAttribute('data-price');
        
        // Try to match with search results
        const matches = searchResults.some(result => {
            return result.category === category && 
                   result.price == price; // Loose equality for price comparison
        });
        
        if (matches) {
            setTimeout(() => {
                item.classList.remove('hidden');
            }, delay);
            delay += 100;
        }
    });
    
    // Update category buttons to show "all" as active since we're showing search results
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.classList.remove('active-category', 'bg-gold-500');
        card.classList.add('bg-brown-600');
    });
}

function showNoResults(query) {
    const productsContainer = document.getElementById('products-container');
    if (productsContainer) {
        productsContainer.innerHTML = `
            <div class="col-span-full text-center py-16">
                <i class="fas fa-search text-6xl text-gray-300 mb-6"></i>
                <h3 class="text-2xl font-semibold text-brown-800 mb-4">No Results Found</h3>
                <p class="text-gray-600 mb-6">Sorry, we couldn't find any cakes matching "${query}".</p>
                <div class="space-y-4">
                    <p class="text-gray-500">Try searching for:</p>
                    <div class="flex flex-wrap justify-center gap-2">
                        <button class="suggestion-btn px-3 py-1 bg-brown-100 hover:bg-brown-200 text-brown-700 rounded-full text-sm transition-colors duration-200" onclick="searchSuggestion('birthday')">Birthday cakes</button>
                        <button class="suggestion-btn px-3 py-1 bg-brown-100 hover:bg-brown-200 text-brown-700 rounded-full text-sm transition-colors duration-200" onclick="searchSuggestion('chocolate')">Chocolate</button>
                        <button class="suggestion-btn px-3 py-1 bg-brown-100 hover:bg-brown-200 text-brown-700 rounded-full text-sm transition-colors duration-200" onclick="searchSuggestion('wedding')">Wedding cakes</button>
                        <button class="suggestion-btn px-3 py-1 bg-brown-100 hover:bg-brown-200 text-brown-700 rounded-full text-sm transition-colors duration-200" onclick="searchSuggestion('custom')">Custom cakes</button>
                    </div>
                    <button onclick="window.location.reload()" class="mt-4 px-6 py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-lg transition-colors duration-300">
                        View All Cakes
                    </button>
                </div>
            </div>
        `;
    }
}

function searchSuggestion(term) {
    // Trigger a new search with the suggested term
    if (typeof SearchUtils !== 'undefined') {
        const results = SearchUtils.search(term);
        sessionStorage.setItem('searchQuery', term);
        sessionStorage.setItem('searchResults', JSON.stringify(results));
        window.location.reload();
    }
}

console.log('Catalogue page loaded successfully!');