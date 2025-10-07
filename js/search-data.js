// Searchable Product Database for Kek Afrina
const PRODUCT_DATABASE = [
    // Birthday Cakes
    {
        id: 'birthday-1',
        name: 'Chocolate Birthday Delight',
        category: 'birthday',
        price: 45,
        description: 'Rich chocolate cake with vanilla frosting, perfect for birthday celebrations',
        keywords: ['chocolate', 'vanilla', 'birthday', 'celebration', 'kids', 'party'],
        image: 'https://via.placeholder.com/400x300/8B4513/FFFFFF?text=Chocolate+Birthday'
    },
    {
        id: 'birthday-2',
        name: 'Rainbow Sprinkle Fantasy',
        category: 'birthday',
        price: 55,
        description: 'Colorful vanilla cake with rainbow sprinkles and buttercream frosting',
        keywords: ['rainbow', 'sprinkles', 'vanilla', 'colorful', 'kids', 'fun', 'birthday'],
        image: 'https://via.placeholder.com/400x300/FF69B4/FFFFFF?text=Rainbow+Cake'
    },
    {
        id: 'birthday-3',
        name: 'Strawberry Dream Cake',
        category: 'birthday',
        price: 60,
        description: 'Fresh strawberry cake with cream cheese frosting and berry topping',
        keywords: ['strawberry', 'fresh', 'cream cheese', 'berries', 'fruit', 'birthday'],
        image: 'https://via.placeholder.com/400x300/FFB6C1/FFFFFF?text=Strawberry+Dream'
    },
    {
        id: 'birthday-4',
        name: 'Funfetti Celebration',
        category: 'birthday',
        price: 65,
        description: 'Classic funfetti cake with colorful confetti and vanilla buttercream',
        keywords: ['funfetti', 'confetti', 'celebration', 'vanilla', 'colorful', 'birthday'],
        image: 'https://via.placeholder.com/400x300/FFFFE0/8B4513?text=Funfetti+Fun'
    },
    {
        id: 'birthday-5',
        name: 'Caramel Surprise Cake',
        category: 'birthday',
        price: 70,
        description: 'Moist caramel cake with salted caramel drizzle and pecans',
        keywords: ['caramel', 'salted', 'pecans', 'surprise', 'sweet', 'birthday'],
        image: 'https://via.placeholder.com/400x300/DEB887/FFFFFF?text=Caramel+Surprise'
    },
    {
        id: 'birthday-6',
        name: 'Red Velvet Classic',
        category: 'birthday',
        price: 75,
        description: 'Traditional red velvet cake with cream cheese frosting and elegant decoration',
        keywords: ['red velvet', 'classic', 'cream cheese', 'elegant', 'traditional', 'birthday'],
        image: 'https://via.placeholder.com/400x300/DC143C/FFFFFF?text=Red+Velvet'
    },

    // Wedding Cakes
    {
        id: 'wedding-1',
        name: 'Elegant Wedding Tower',
        category: 'wedding',
        price: 200,
        description: 'Three-tier elegant wedding cake with white fondant and pearl decorations',
        keywords: ['wedding', 'elegant', 'three-tier', 'fondant', 'pearl', 'white', 'bridal'],
        image: 'https://via.placeholder.com/400x300/FFF8DC/8B4513?text=Elegant+Wedding'
    },
    {
        id: 'wedding-2',
        name: 'Royal Rose Garden',
        category: 'wedding',
        price: 350,
        description: 'Luxury four-tier cake with handcrafted sugar roses and gold accents',
        keywords: ['royal', 'roses', 'luxury', 'four-tier', 'sugar flowers', 'gold', 'wedding'],
        image: 'https://via.placeholder.com/400x300/F0E68C/8B4513?text=Royal+Rose'
    },
    {
        id: 'wedding-3',
        name: 'Classic White Dream',
        category: 'wedding',
        price: 275,
        description: 'Traditional white wedding cake with intricate lace piping and flowers',
        keywords: ['classic', 'white', 'traditional', 'lace', 'piping', 'flowers', 'wedding'],
        image: 'https://via.placeholder.com/400x300/FFFAF0/8B4513?text=White+Dream'
    },
    {
        id: 'wedding-4',
        name: 'Vintage Romance',
        category: 'wedding',
        price: 300,
        description: 'Romantic vintage-style cake with cascading buttercream flowers',
        keywords: ['vintage', 'romance', 'buttercream', 'cascading', 'flowers', 'romantic', 'wedding'],
        image: 'https://via.placeholder.com/400x300/F5F5DC/8B4513?text=Vintage+Romance'
    },
    {
        id: 'wedding-5',
        name: 'Modern Minimalist',
        category: 'wedding',
        price: 280,
        description: 'Contemporary clean-line design with geometric patterns and gold leaf',
        keywords: ['modern', 'minimalist', 'contemporary', 'geometric', 'gold leaf', 'clean', 'wedding'],
        image: 'https://via.placeholder.com/400x300/F8F8FF/8B4513?text=Modern+Minimal'
    },
    {
        id: 'wedding-6',
        name: 'Floral Paradise',
        category: 'wedding',
        price: 320,
        description: 'Garden-inspired cake with fresh flowers and natural decoration elements',
        keywords: ['floral', 'paradise', 'fresh flowers', 'garden', 'natural', 'organic', 'wedding'],
        image: 'https://via.placeholder.com/400x300/F0FFF0/8B4513?text=Floral+Paradise'
    },

    // Event Cakes
    {
        id: 'event-1',
        name: 'Corporate Celebration',
        category: 'event',
        price: 120,
        description: 'Professional sheet cake perfect for office parties and corporate events',
        keywords: ['corporate', 'office', 'professional', 'sheet cake', 'business', 'celebration', 'event'],
        image: 'https://via.placeholder.com/400x300/4682B4/FFFFFF?text=Corporate+Cake'
    },
    {
        id: 'event-2',
        name: 'Graduation Success',
        category: 'event',
        price: 100,
        description: 'Congratulatory cake for graduation ceremonies with cap and diploma design',
        keywords: ['graduation', 'success', 'diploma', 'cap', 'congratulations', 'achievement', 'event'],
        image: 'https://via.placeholder.com/400x300/32CD32/FFFFFF?text=Graduation+Success'
    },
    {
        id: 'event-3',
        name: 'Anniversary Bliss',
        category: 'event',
        price: 85,
        description: 'Romantic anniversary cake with heart decorations and elegant script',
        keywords: ['anniversary', 'romantic', 'hearts', 'love', 'celebration', 'elegant', 'event'],
        image: 'https://via.placeholder.com/400x300/FF1493/FFFFFF?text=Anniversary+Bliss'
    },
    {
        id: 'event-4',
        name: 'Baby Shower Joy',
        category: 'event',
        price: 110,
        description: 'Adorable baby shower cake with pastel colors and baby-themed decorations',
        keywords: ['baby shower', 'pastel', 'adorable', 'baby', 'cute', 'celebration', 'event'],
        image: 'https://via.placeholder.com/400x300/FFB6C1/FFFFFF?text=Baby+Shower'
    },
    {
        id: 'event-5',
        name: 'Holiday Festival',
        category: 'event',
        price: 90,
        description: 'Seasonal holiday cake with festive decorations and warm spices',
        keywords: ['holiday', 'festival', 'seasonal', 'festive', 'spices', 'celebration', 'event'],
        image: 'https://via.placeholder.com/400x300/228B22/FFFFFF?text=Holiday+Festival'
    },
    {
        id: 'event-6',
        name: 'Sports Victory',
        category: 'event',
        price: 105,
        description: 'Championship celebration cake with sports themes and team colors',
        keywords: ['sports', 'victory', 'championship', 'team', 'celebration', 'achievement', 'event'],
        image: 'https://via.placeholder.com/400x300/FF4500/FFFFFF?text=Sports+Victory'
    },

    // Custom Cakes
    {
        id: 'custom-1',
        name: 'Personalized Theme Cake',
        category: 'custom',
        price: 200,
        description: 'Fully customized cake designed according to your specific theme and requirements',
        keywords: ['custom', 'personalized', 'theme', 'unique', 'bespoke', 'special', 'design'],
        image: 'https://via.placeholder.com/400x300/9370DB/FFFFFF?text=Custom+Theme'
    },
    {
        id: 'custom-2',
        name: 'Character Fantasy Cake',
        category: 'custom',
        price: 160,
        description: 'Custom cake featuring your favorite characters from movies, cartoons, or books',
        keywords: ['character', 'fantasy', 'movies', 'cartoons', 'books', 'custom', 'kids'],
        image: 'https://via.placeholder.com/400x300/FF6347/FFFFFF?text=Character+Fantasy'
    },
    {
        id: 'custom-3',
        name: 'Hobby & Interest Cake',
        category: 'custom',
        price: 130,
        description: 'Personalized cake reflecting your hobbies, interests, or profession',
        keywords: ['hobby', 'interest', 'profession', 'personalized', 'unique', 'custom', 'special'],
        image: 'https://via.placeholder.com/400x300/20B2AA/FFFFFF?text=Hobby+Cake'
    },
    {
        id: 'custom-4',
        name: 'Photo Print Cake',
        category: 'custom',
        price: 180,
        description: 'Custom cake with edible photo printing of your memorable moments',
        keywords: ['photo', 'print', 'edible', 'memories', 'pictures', 'custom', 'special'],
        image: 'https://via.placeholder.com/400x300/DA70D6/FFFFFF?text=Photo+Print'
    },
    {
        id: 'custom-5',
        name: 'Architectural Wonder',
        category: 'custom',
        price: 150,
        description: 'Custom cake designed as buildings, landmarks, or architectural structures',
        keywords: ['architectural', 'buildings', 'landmarks', 'structures', 'custom', 'unique', 'design'],
        image: 'https://via.placeholder.com/400x300/B8860B/FFFFFF?text=Architecture+Cake'
    },
    {
        id: 'custom-6',
        name: 'Artistic Masterpiece',
        category: 'custom',
        price: 140,
        description: 'Custom artistic cake with hand-painted designs and creative elements',
        keywords: ['artistic', 'masterpiece', 'hand-painted', 'creative', 'art', 'custom', 'unique'],
        image: 'https://via.placeholder.com/400x300/4169E1/FFFFFF?text=Artistic+Cake'
    }
];

// Search utility functions
const SearchUtils = {
    // Normalize text for better matching
    normalize: (text) => {
        return text.toLowerCase().trim().replace(/[^\w\s]/gi, '');
    },

    // Check if query matches any searchable fields
    matchesProduct: (product, query) => {
        const normalizedQuery = SearchUtils.normalize(query);
        const searchFields = [
            product.name,
            product.description,
            product.category,
            ...product.keywords,
            `RM${product.price}`,
            product.price.toString()
        ];

        return searchFields.some(field => 
            SearchUtils.normalize(field).includes(normalizedQuery)
        );
    },

    // Get search suggestions based on partial input
    getSuggestions: (query, limit = 5) => {
        const normalizedQuery = SearchUtils.normalize(query);
        if (normalizedQuery.length < 2) return [];

        const suggestions = new Set();
        
        PRODUCT_DATABASE.forEach(product => {
            // Add matching product names
            if (SearchUtils.normalize(product.name).includes(normalizedQuery)) {
                suggestions.add(product.name);
            }
            
            // Add matching keywords
            product.keywords.forEach(keyword => {
                if (SearchUtils.normalize(keyword).includes(normalizedQuery)) {
                    suggestions.add(keyword);
                }
            });
        });

        return Array.from(suggestions).slice(0, limit);
    },

    // Perform search with sorting by relevance
    search: (query, filters = {}) => {
        if (!query || query.trim().length === 0) {
            return PRODUCT_DATABASE;
        }

        let results = PRODUCT_DATABASE.filter(product => {
            // Check if product matches query
            const matchesQuery = SearchUtils.matchesProduct(product, query);
            
            // Apply category filter if specified
            const matchesCategory = !filters.category || product.category === filters.category;
            
            // Apply price range filter if specified
            const matchesPrice = (!filters.minPrice || product.price >= filters.minPrice) &&
                               (!filters.maxPrice || product.price <= filters.maxPrice);
            
            return matchesQuery && matchesCategory && matchesPrice;
        });

        // Sort by relevance (name matches first, then description matches)
        results.sort((a, b) => {
            const normalizedQuery = SearchUtils.normalize(query);
            const aNameMatch = SearchUtils.normalize(a.name).includes(normalizedQuery);
            const bNameMatch = SearchUtils.normalize(b.name).includes(normalizedQuery);
            
            if (aNameMatch && !bNameMatch) return -1;
            if (!aNameMatch && bNameMatch) return 1;
            return a.price - b.price; // Secondary sort by price
        });

        return results;
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PRODUCT_DATABASE, SearchUtils };
}