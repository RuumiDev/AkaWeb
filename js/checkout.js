// Checkout Page JavaScript
// Initialize page functionality
document.addEventListener('DOMContentLoaded', function() {
    initCheckoutPage();
    loadCartData();
    initNavigation();
    initScrollEffects();
    initWhatsAppIntegration();
    setCurrentDate();
});

// Shop configuration
const SHOP_CONFIG = {
    name: "Afrina's Cake",
    phone: "60196233479", 
    businessHours: "9 AM - 8 PM Daily",
    services: "Custom Cakes & Delivery Available"
};

// Initialize checkout page
function initCheckoutPage() {
    console.log('Checkout page initialized');
    
    // Add page load animations
    const elements = document.querySelectorAll('[class*="animate-"]');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

// Load and display cart data
function loadCartData() {
    try {
        const cartData = localStorage.getItem('akaApricusCart');
        const cartItems = cartData ? JSON.parse(cartData) : [];
        
        displayCartItems(cartItems);
        calculateAndDisplayTotal(cartItems);
        
        if (cartItems.length === 0) {
            showEmptyCartMessage();
        } else {
            showCartSummary();
        }
    } catch (error) {
        console.error('Error loading cart data:', error);
        showEmptyCartMessage();
    }
}

// Display cart items in the summary
function displayCartItems(cartItems) {
    const container = document.getElementById('cart-items-container');
    
    if (!container) return;
    
    if (cartItems.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = cartItems.map((item, index) => `
        <div class="cart-item-card bg-gradient-to-r from-white to-brown-50 rounded-2xl p-6 border border-brown-200 shadow-sm hover:shadow-md transition-all duration-300" style="animation-delay: ${index * 0.1}s">
            <div class="flex items-start gap-4">
                <!-- Cake Image -->
                <div class="flex-shrink-0">
                    <img src="${item.image}" alt="${item.type}" class="w-20 h-20 rounded-xl object-cover shadow-md">
                </div>
                
                <!-- Item Details -->
                <div class="flex-1 min-w-0">
                    <h3 class="font-playfair text-xl font-semibold text-brown-900 mb-2">${item.type}</h3>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-brown-600 mb-3">
                        <div class="flex items-center">
                            <i class="fas fa-expand-arrows-alt text-gold-500 w-4 mr-2"></i>
                            <span>Size: <strong class="text-brown-800">${item.size}</strong></span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-birthday-cake text-gold-500 w-4 mr-2"></i>
                            <span>Flavor: <strong class="text-brown-800">${item.flavor}</strong></span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-truck text-gold-500 w-4 mr-2"></i>
                            <span>Delivery: <strong class="text-brown-800">${item.delivery}</strong></span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-sort-numeric-up text-gold-500 w-4 mr-2"></i>
                            <span>Quantity: <strong class="text-brown-800">${item.quantity}</strong></span>
                        </div>
                    </div>
                    
                    <!-- Delivery Details -->
                    <div class="bg-brown-100 rounded-lg p-3 mb-3">
                        <div class="flex items-center text-sm text-brown-700">
                            <i class="fas fa-calendar-alt text-gold-500 mr-2"></i>
                            <span>Delivery Date: <strong>${formatDate(item.date)}</strong></span>
                            <span class="mx-2">•</span>
                            <i class="fas fa-clock text-gold-500 mr-2"></i>
                            <span>Time: <strong>${item.time}</strong></span>
                        </div>
                    </div>
                    
                    <!-- Order Notes -->
                    ${item.orderNotes ? `
                        <div class="text-xs text-brown-500 bg-brown-50 rounded-lg p-2 italic mb-2">
                            <i class="fas fa-sticky-note mr-1"></i>
                            ${item.orderNotes}
                        </div>
                    ` : ''}
                    
                    <!-- Special Requests -->
                    ${item.specialRequests && item.specialRequests.trim() ? `
                        <div class="text-xs text-brown-600 bg-gold-50 rounded-lg p-3 border border-gold-200">
                            <div class="font-semibold text-brown-800 mb-1">
                                <i class="fas fa-comment-dots text-gold-500 mr-1"></i>
                                Special Requests:
                            </div>
                            <div class="text-brown-700 leading-relaxed">
                                "${item.specialRequests}"
                            </div>
                        </div>
                    ` : ''}
                </div>
                
                <!-- Price -->
                <div class="flex-shrink-0 text-right">
                    <div class="text-2xl font-bold price-highlight">${item.price}</div>
                    <div class="text-xs text-brown-500 mt-1">
                        Added: ${formatTimestamp(item.addedAt)}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Calculate and display total amount
function calculateAndDisplayTotal(cartItems) {
    const totalElement = document.getElementById('total-amount');
    
    if (!totalElement) return;
    
    const total = cartItems.reduce((sum, item) => {
        // Handle different price formats (RM, Rm, or plain numbers)
        const priceStr = item.price ? item.price.toString() : '0';
        const cleanedPrice = priceStr.replace(/[^\d.]/g, ''); // Remove all non-digits except decimal
        const price = parseFloat(cleanedPrice) || 0;
        const quantity = parseInt(item.quantity) || 1;
        return sum + (price * quantity);
    }, 0);
    
    totalElement.textContent = `RM${total.toFixed(2)}`;
    totalElement.className += ' animate-pulse-gold';
}

// Show empty cart message
function showEmptyCartMessage() {
    const emptyMessage = document.getElementById('empty-cart-message');
    const whatsappSection = document.getElementById('whatsapp-section');
    
    if (emptyMessage) {
        emptyMessage.classList.remove('hidden');
        emptyMessage.classList.add('empty-cart');
    }
    
    if (whatsappSection) {
        whatsappSection.style.display = 'none';
    }
}

// Show cart summary
function showCartSummary() {
    const emptyMessage = document.getElementById('empty-cart-message');
    const whatsappSection = document.getElementById('whatsapp-section');
    
    if (emptyMessage) {
        emptyMessage.classList.add('hidden');
    }
    
    if (whatsappSection) {
        whatsappSection.style.display = 'block';
    }
}

// Initialize WhatsApp integration
function initWhatsAppIntegration() {
    const whatsappBtn = document.getElementById('whatsapp-btn');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            sendWhatsAppMessage();
        });
    }
}

// Generate and send WhatsApp message
function sendWhatsAppMessage() {
    console.log('Starting WhatsApp message generation...');
    try {
        const cartData = localStorage.getItem('akaApricusCart');
        console.log('Raw cart data:', cartData);
        const cartItems = cartData ? JSON.parse(cartData) : [];
        console.log('Parsed cart items:', cartItems);
        
        if (cartItems.length === 0) {
            showNotification('Your cart is empty!', 'warning');
            return;
        }
        
        console.log('Formatting WhatsApp message...');
        const formattedMessage = formatWhatsAppMessage(cartItems);
        console.log('Message formatted successfully:', formattedMessage.substring(0, 100) + '...');
        
        // Clean phone number and ensure proper encoding
        const cleanPhone = SHOP_CONFIG.phone.replace(/[\s\-\+\(\)]/g, '');
        
        // Double encode to handle special characters properly
        const encodedMessage = encodeURIComponent(formattedMessage)
            .replace(/'/g, '%27')
            .replace(/"/g, '%22');
            
        const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
        
        // Show loading state
        const btn = document.getElementById('whatsapp-btn');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-3"></i>Preparing Message...';
        btn.disabled = true;
        
        // Simulate processing time
        setTimeout(() => {
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Reset button
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            
            // Show success message
            showNotification('WhatsApp opened! Your message is ready to send.', 'success');
            
            // Optional: Clear cart after successful order
            // localStorage.removeItem('akaApricusCart');
            
        }, 1500);
        
    } catch (error) {
        console.error('Error generating WhatsApp message:', error);
        
        // Reset button state
        const btn = document.getElementById('whatsapp-btn');
        if (btn) {
            btn.innerHTML = '<i class="fab fa-whatsapp text-2xl sm:text-3xl mr-3 sm:mr-4 animate-bounce"></i><span class="flex flex-col items-center sm:items-start"><span class="text-lg sm:text-xl font-bold">Send Order via WhatsApp</span><span class="text-green-100 text-xs sm:text-sm font-normal">Instant & Easy</span></span>';
            btn.disabled = false;
        }
        
        // Show specific error message
        let errorMessage = 'Error preparing message. Please try again.';
        if (error.message.includes('missing required information')) {
            errorMessage = 'Some cart items are incomplete. Please refresh and try again.';
        } else if (error.message.includes('No cart items')) {
            errorMessage = 'Your cart appears to be empty. Please add items first.';
        }
        
        showNotification(errorMessage, 'error');
    }
}

// Format message for WhatsApp with clean formatting
function formatWhatsAppMessage(cartItems) {
    console.log('formatWhatsAppMessage called with:', cartItems);
    
    if (!cartItems || cartItems.length === 0) {
        throw new Error('No cart items provided to format message');
    }
    
    const currentDate = new Date().toLocaleDateString('en-MY', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const currentTime = new Date().toLocaleTimeString('en-MY', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Clean message formatting with proper WhatsApp syntax using Unicode escapes
    let message = `\uD83C\uDF70 *CAKE ORDER - KEK AFRINA* \uD83C\uDF70\n\n`;
    message += `\uD83D\uDCC5 *Order Date:* ${currentDate}\n`;
    message += `\u23F0 *Order Time:* ${currentTime}\n`;
    message += `▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n`;
    
    // Order summary header
    message += `\uD83D\uDCCB *ORDER DETAILS*\n`;
    message += `Total Items: *${cartItems.length}*\n\n`;
    
    // Add each item with clean formatting
    cartItems.forEach((item, index) => {
        // Validate item has required fields
        if (!item.type || !item.size || !item.flavor || !item.price) {
            console.warn('Cart item missing required fields:', item);
            throw new Error(`Cart item ${index + 1} is missing required information`);
        }
        
        message += `*${index + 1}. ${cleanText(item.type)}*\n`;
        message += `   \uD83D\uDCCF Size: ${cleanText(item.size)}\n`;
        message += `   \uD83E\uDDC1 Flavor: ${cleanText(item.flavor)}\n`;
        message += `   \uD83D\uDE9A Delivery: ${cleanText(item.delivery || 'Not specified')}\n`;
        message += `   \uD83D\uDCC5 Date: ${item.date ? formatDate(item.date) : 'Not specified'}\n`;
        message += `   \u23F0 Time: ${cleanText(item.time || 'Not specified')}\n`;
        message += `   \u0023\uFE0F\u20E3 Quantity: ${item.quantity || 1}\n`;
        message += `   \uD83D\uDCB0 Price: *${cleanPrice(item.price)}*\n`;
        
        // Add cake writing if available
        if (item.cakeWriting && item.cakeWriting.trim()) {
            message += `   \u270F\uFE0F Cake Writing: "${cleanText(item.cakeWriting)}"\n`;
        }
        
        // Add notes if available
        if (item.orderNotes && item.orderNotes.trim()) {
            message += `   \uD83D\uDCDD Notes: ${cleanText(item.orderNotes)}\n`;
        }
        
        // Add special requests if available
        if (item.specialRequests && item.specialRequests.trim()) {
            message += `   \uD83D\uDCAC Special: ${cleanText(item.specialRequests)}\n`;
        }
        
        message += `\n`;
    });
    
    // Calculate and add total
    const totalAmount = calculateTotal(cartItems);
    
    message += `▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n`;
    message += `\uD83D\uDCB0 *TOTAL AMOUNT: RM${totalAmount.toFixed(2)}*\n`;
    message += `▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n`;
    
    // Professional customer message
    message += `\u2728 *Dear Kek Afrina Team,*\n\n`;
    message += `I would like to place this cake order.\n\n`;
    message += `Please confirm:\n`;
    message += `• Order availability\n`;
    message += `• Payment details\n`;
    message += `• Delivery confirmation\n\n`;
    message += `Thank you for your excellent service! \uD83D\uDE4F\n\n`;
    
    // Clean shop information
    message += `\uD83C\uDFEA *Contact Information:*\n`;
    message += `${SHOP_CONFIG.name}\n`;
    message += `\uD83D\uDCDE ${SHOP_CONFIG.phone}\n`;
    message += `\uD83D\uDD52 ${SHOP_CONFIG.businessHours}\n`;
    message += `\uD83C\uDF82 ${SHOP_CONFIG.services}`;
    
    return message;
}

// Helper function to clean text and remove problematic characters
function cleanText(text) {
    if (!text) return '';
    return text
        .toString()
        .replace(/[^\w\s\-.,!@#$%^&*()+=]/g, '') // Remove special chars that cause ?
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
}

// Helper function to clean and format price
function cleanPrice(price) {
    if (!price) return 'RM0.00';
    const cleanPrice = price.toString().replace(/[^\d.]/g, '');
    const numPrice = parseFloat(cleanPrice) || 0;
    return `RM${numPrice.toFixed(2)}`;
}

// Helper function to calculate total amount safely
function calculateTotal(cartItems) {
    return cartItems.reduce((sum, item) => {
        const priceStr = item.price ? item.price.toString() : '0';
        const numPrice = parseFloat(priceStr.replace(/[^\d.]/g, '')) || 0;
        const quantity = parseInt(item.quantity) || 1;
        return sum + (numPrice * quantity);
    }, 0);
}

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Scroll effects
function initScrollEffects() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.remove('opacity-0', 'invisible');
                backToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                backToTopBtn.classList.add('opacity-0', 'invisible');
                backToTopBtn.classList.remove('opacity-100', 'visible');
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

// Set current date
function setCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-MY', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        dateElement.textContent = formattedDate;
    }
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-MY', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('en-MY', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.checkout-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `checkout-notification fixed top-24 right-5 px-6 py-4 rounded-xl shadow-lg z-50 max-w-sm font-medium text-white ${getNotificationClasses(type)} animate-[slideInRight_0.3s_ease]`;
    
    // Add icon based on type
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-triangle',
        warning: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="${icons[type]} mr-3"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.classList.remove('animate-[slideInRight_0.3s_ease]');
        notification.classList.add('animate-[slideOutRight_0.3s_ease]');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
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

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to go back
    if (e.key === 'Escape') {
        window.history.back();
    }
    
    // Enter key to send WhatsApp (when focused on WhatsApp button)
    if (e.key === 'Enter' && document.activeElement.id === 'whatsapp-btn') {
        sendWhatsAppMessage();
    }
});

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

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Refresh cart data when page becomes visible
        loadCartData();
    }
});

// Export function for other scripts to use
window.CheckoutManager = {
    loadCartData,
    sendWhatsAppMessage,
    formatWhatsAppMessage,
    showNotification
};

console.log('Checkout page loaded successfully!');