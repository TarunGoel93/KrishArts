// Sample artwork data - replace with your actual artwork information
const artworks = [
    {
        id: 1,
        title: "Ethereal Dreams",
        category: "paintings",
        year: 2023,
        medium: "Oil on canvas",
        dimensions: '24" x 36"',
        image: "k1.jpeg",
        description: "This artwork explores themes of consciousness and the subconscious mind. The flowing forms and ethereal colors represent the boundary between dreams and reality, inviting viewers to contemplate their own inner landscapes."
    },
    {
        id: 2,
        title: "Urban Reflections",
        category: "mixed-media",
        year: 2023,
        medium: "Mixed media on canvas",
        dimensions: '30" x 40"',
        image: "k4.jpeg",
        description: "A commentary on modern urban life, this piece combines traditional painting techniques with digital elements to capture the complexity and energy of city living."
    },
    {
        id: 3,
        title: "Nature's Symphony",
        category: "paintings",
        year: 2023,
        medium: "Watercolor on paper",
        dimensions: '18" x 24"',
        image: "k5.jpeg",
        description: "Inspired by the changing seasons, this watercolor piece captures the delicate balance and harmony found in nature's cycles."
    },
    {
        id: 4,
        title: "Digital Horizons",
        category: "digital",
        year: 2022,
        medium: "Digital illustration",
        dimensions: "Print sizes vary",
        image: "k6.jpeg",
        description: "A exploration of digital art possibilities, this piece pushes the boundaries between traditional and contemporary artistic expression."
    },
    {
        id: 5,
        title: "Midnight Thoughts",
        category: "sketches",
        year: 2022,
        medium: "Charcoal on paper",
        dimensions: '12" x 16"',
        image: "k21.jpeg",
        description: "A intimate sketch capturing the quiet contemplation of late-night thoughts and emotions."
    },
    {
        id: 6,
        title: "Color Burst",
        category: "paintings",
        year: 2022,
        medium: "Acrylic on canvas",
        dimensions: '36" x 48"',
        image: "k2.jpeg",
        description: "An explosion of color and energy, this piece celebrates the joy and vibrancy of artistic expression."
    },
    {
        id: 7,
        title: "Geometric Dreams",
        category: "digital",
        year: 2022,
        medium: "Digital art",
        dimensions: "Print sizes vary",
        image: "k3.jpeg",
        description: "A study in geometric forms and mathematical beauty, exploring the intersection of art and science."
    },
    {
        id: 8,
        title: "Ocean Depths",
        category: "mixed-media",
        year: 2021,
        medium: "Mixed media",
        dimensions: '24" x 32"',
        image: "k13.jpeg",
        description: "Inspired by the mysterious depths of the ocean, this piece combines various textures and materials to create a sense of depth and movement."
    },
    {
        id: 9,
        title: "Portrait Study",
        category: "sketches",
        year: 2021,
        medium: "Graphite on paper",
        dimensions: '14" x 18"',
        image: "k14.jpeg",
        description: "A detailed portrait study focusing on capturing the essence and character of the subject through careful observation and technique."
    },
    {
        id: 10,
        title: "Abstract Emotions",
        category: "paintings",
        year: 2021,
        medium: "Oil on canvas",
        dimensions: '20" x 24"',
        image: "k11.jpeg",
        description: "An abstract exploration of human emotions, using color and form to convey feelings that words cannot express."
    },
    {
        id: 11,
        title: "Digital Landscape",
        category: "digital",
        year: 2021,
        medium: "Digital painting",
        dimensions: "Print sizes vary",
        image: "k12.jpeg",
        description: "A digital interpretation of natural landscapes, blending realistic elements with fantastical imagination."
    },
    {
        id: 12,
        title: "Textural Exploration",
        category: "mixed-media",
        year: 2020,
        medium: "Mixed media on board",
        dimensions: '16" x 20"',
        image: "k23.jpeg",
        description: "An exploration of texture and material, this piece investigates how different surfaces and materials can convey meaning and emotion."
    }
];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const galleryGrid = document.getElementById('galleryGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('artworkModal');
const modalClose = document.getElementById('modalClose');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation
if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

// Gallery functionality
if (galleryGrid) {
    let currentFilter = 'all';

    // Create gallery items
    function createGalleryItems(artworksToShow) {
        galleryGrid.innerHTML = '';
        
        artworksToShow.forEach((artwork, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.category = artwork.category;
            galleryItem.innerHTML = `
                <div class="gallery-image">
                    <img src="${artwork.image}" alt="${artwork.title}" loading="lazy">
                </div>
                <div class="gallery-info">
                    <h3>${artwork.title}</h3>
                    <p>${artwork.medium}, ${artwork.year}</p>
                </div>
            `;

            // Add click event to open modal
            galleryItem.addEventListener('click', () => openModal(artwork));
            
            galleryGrid.appendChild(galleryItem);

            // Animate items in with delay
            setTimeout(() => {
                galleryItem.classList.add('show');
            }, index * 100);
        });
    }

    // Filter functionality
    function filterArtworks(category) {
        const filteredArtworks = category === 'all' 
            ? artworks 
            : artworks.filter(artwork => artwork.category === category);
        
        // Hide all items first
        const allItems = document.querySelectorAll('.gallery-item');
        allItems.forEach(item => {
            item.classList.remove('show');
        });

        // Wait for hide animation, then recreate items
        setTimeout(() => {
            createGalleryItems(filteredArtworks);
        }, 300);
    }

    // Filter button event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter artworks
            const category = button.dataset.filter;
            currentFilter = category;
            filterArtworks(category);
        });
    });

    // Modal functionality
    function openModal(artwork) {
        if (!modal) return;

        document.getElementById('modalImage').src = artwork.image;
        document.getElementById('modalTitle').textContent = artwork.title;
        document.getElementById('modalCategory').textContent = artwork.category.charAt(0).toUpperCase() + artwork.category.slice(1);
        document.getElementById('modalYear').textContent = artwork.year;
        document.getElementById('modalMedium').textContent = artwork.medium;
        document.getElementById('modalDimensions').textContent = artwork.dimensions;
        document.getElementById('modalDescription').textContent = artwork.description;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Modal event listeners
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Initialize gallery
    createGalleryItems(artworks);
}

// Contact form functionality
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Here you would typically send the data to a server
        // For this demo, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.featured-item, .section-title');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading states for better UX
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Handle window resize for responsive adjustments
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            if (hamburger) hamburger.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }, 250);
});