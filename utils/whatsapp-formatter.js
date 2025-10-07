// WhatsApp Message Formatter Utility
// This utility handles the formatting of cart data for WhatsApp messages

class WhatsAppFormatter {
    constructor(shopConfig) {
        this.shopConfig = shopConfig || {
            name: "Kek Afrina",
            phone: "60196233479",
            businessHours: "9 AM - 8 PM Daily",
            services: "Custom Cakes & Delivery Available"
        };
    }

    // Format complete order message for WhatsApp
    formatOrderMessage(cartItems, customerInfo = null) {
        if (!cartItems || cartItems.length === 0) {
            throw new Error('No items in cart to format');
        }

        let message = this.generateHeader();
        message += this.generateOrderSummary(cartItems);
        message += this.generateItemDetails(cartItems);
        message += this.generateTotal(cartItems);
        message += this.generateCustomerRequest(customerInfo);
        message += this.generateShopInfo();

        return message;
    }

    // Generate message header with timestamp
    generateHeader() {
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

        return `🍰 *CAKE ORDER - KEK AFRINA* 🍰\\n\\n` +
               `📅 Order Date: ${currentDate}\\n` +
               `⏰ Order Time: ${currentTime}\\n` +
               `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n\\n`;
    }

    // Generate order summary section
    generateOrderSummary(cartItems) {
        const totalItems = cartItems.reduce((sum, item) => sum + parseInt(item.quantity), 0);
        
        return `📋 *ORDER SUMMARY*\\n` +
               `Total Items: ${totalItems}\\n` +
               `Different Cakes: ${cartItems.length}\\n\\n`;
    }

    // Generate detailed item information
    generateItemDetails(cartItems) {
        let itemsText = '';
        
        cartItems.forEach((item, index) => {
            itemsText += `${index + 1}. 🎂 *${item.type}*\\n`;
            itemsText += `   📏 Size: ${item.size}\\n`;
            itemsText += `   🧁 Flavor: ${item.flavor}\\n`;
            itemsText += `   🚚 Delivery: ${item.delivery}\\n`;
            itemsText += `   📅 Date: ${this.formatDeliveryDate(item.date)}\\n`;
            itemsText += `   ⏰ Time: ${item.time}\\n`;
            itemsText += `   #️⃣ Quantity: ${item.quantity}\\n`;
            itemsText += `   💰 Price: *${item.price}*\\n`;
            
            if (item.orderNotes && item.orderNotes.trim()) {
                itemsText += `   📝 Notes: ${item.orderNotes}\\n`;
            }
            
            itemsText += `\\n`;
        });

        return itemsText;
    }

    // Generate total amount section
    generateTotal(cartItems) {
        const totalAmount = cartItems.reduce((sum, item) => {
            const price = parseFloat(item.price.replace('Rm', '').replace('RM', ''));
            return sum + price;
        }, 0);

        return `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n` +
               `💰 *TOTAL AMOUNT: RM${totalAmount.toFixed(2)}* 💰\\n` +
               `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n\\n`;
    }

    // Generate customer request message
    generateCustomerRequest(customerInfo = null) {
        let request = `✨ *Dear Kek Afrina Team,*\\n\\n`;
        request += `I would like to place this cake order. Please confirm the availability and provide payment details.\\n\\n`;
        
        if (customerInfo) {
            request += `📞 *Customer Details:*\\n`;
            if (customerInfo.name) request += `Name: ${customerInfo.name}\\n`;
            if (customerInfo.phone) request += `Phone: ${customerInfo.phone}\\n`;
            if (customerInfo.email) request += `Email: ${customerInfo.email}\\n`;
            if (customerInfo.address) request += `Address: ${customerInfo.address}\\n`;
            request += `\\n`;
        }
        
        request += `Thank you! 🙏\\n\\n`;
        return request;
    }

    // Generate shop information
    generateShopInfo() {
        return `🏪 *Shop Details:*\\n` +
               `${this.shopConfig.name}\\n` +
               `📞 ${this.shopConfig.phone}\\n` +
               `🕒 ${this.shopConfig.businessHours}\\n` +
               `🎂 ${this.shopConfig.services}`;
    }

    // Format delivery date for better readability
    formatDeliveryDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-MY', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
        } catch (error) {
            return dateString; // Return original if formatting fails
        }
    }

    // Generate WhatsApp URL with encoded message
    generateWhatsAppUrl(message) {
        const cleanPhone = this.shopConfig.phone.replace(/[\s\-\+]/g, '');
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    }

    // Format simple inquiry message
    formatInquiryMessage(subject = "General Inquiry") {
        const currentDate = new Date().toLocaleDateString('en-MY');
        const currentTime = new Date().toLocaleTimeString('en-MY', {
            hour: '2-digit',
            minute: '2-digit'
        });

        return `🍰 *INQUIRY - AKA APRICUS* 🍰\\n\\n` +
               `📅 Date: ${currentDate}\\n` +
               `⏰ Time: ${currentTime}\\n` +
               `📝 Subject: ${subject}\\n\\n` +
               `Hello! I would like to inquire about your cake services.\\n\\n` +
               `Please provide more information.\\n\\n` +
               `Thank you! 🙏`;
    }

    // Validate cart data before formatting
    validateCartData(cartItems) {
        if (!Array.isArray(cartItems)) {
            throw new Error('Cart items must be an array');
        }

        if (cartItems.length === 0) {
            throw new Error('Cart is empty');
        }

        const requiredFields = ['type', 'size', 'flavor', 'delivery', 'date', 'time', 'quantity', 'price'];
        
        for (let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i];
            for (let field of requiredFields) {
                if (!item[field]) {
                    throw new Error(`Missing required field '${field}' in cart item ${i + 1}`);
                }
            }
        }

        return true;
    }

    // Format price for consistency
    formatPrice(price) {
        if (typeof price === 'string') {
            const numericPrice = parseFloat(price.replace(/[^\d.]/g, ''));
            return `RM${numericPrice.toFixed(2)}`;
        }
        return `RM${parseFloat(price).toFixed(2)}`;
    }

    // Generate order ID
    generateOrderId() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `AKA${timestamp}${random}`;
    }

    // Format message for order confirmation (shorter version)
    formatConfirmationMessage(orderId, cartItems) {
        const totalAmount = cartItems.reduce((sum, item) => {
            const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
            return sum + price;
        }, 0);

        const totalItems = cartItems.reduce((sum, item) => sum + parseInt(item.quantity), 0);

        return `🍰 *ORDER CONFIRMATION* 🍰\\n\\n` +
               `Order ID: *${orderId}*\\n` +
               `Items: ${totalItems} cake(s)\\n` +
               `Total: *RM${totalAmount.toFixed(2)}*\\n\\n` +
               `Your order has been received and is being processed.\\n\\n` +
               `We will contact you shortly for confirmation and payment details.\\n\\n` +
               `Thank you for choosing Aka Apricus! 🎂`;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WhatsAppFormatter;
} else {
    window.WhatsAppFormatter = WhatsAppFormatter;
}

// Example usage and configuration
const EXAMPLE_SHOP_CONFIG = {
    name: "Aka Apricus Cake Shop",
    phone: "+60123456789", // Replace with actual number
    businessHours: "9 AM - 8 PM Daily",
    services: "Custom Cakes & Delivery Available",
    website: "www.akapricus.com",
    address: "Kuala Lumpur, Malaysia"
};

// Sample cart data for testing
const SAMPLE_CART_DATA = [
    {
        id: "item_1703764801000",
        type: "Chocolate Birthday Cake",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13",
        size: "Medium",
        sizeMultiplier: "2.0",
        flavor: "Dark Chocolate",
        delivery: "Home Delivery",
        deliveryFee: "10",
        date: "2025-10-01",
        time: "14:00",
        quantity: "1",
        basePrice: 80,
        price: "RM170",
        orderNotes: "Happy Birthday message on top",
        addedAt: "2025-09-28T12:00:01.000Z"
    }
];

console.log('WhatsApp Formatter utility loaded successfully!');