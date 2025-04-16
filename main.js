/**
 * Savoria Food Delivery App - Main JavaScript
 * Responsive functionality and interactive features
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Initialize active nav item based on scroll position
    updateActiveNavItem();
    
    // Update active nav item on scroll
    window.addEventListener('scroll', function() {
        updateActiveNavItem();
    });
    
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section id
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            // Scroll to the target section
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
            }
        });
    });
    
    // Category navigation buttons functionality
    const prevButton = document.querySelector('.category-nav.prev');
    const nextButton = document.querySelector('.category-nav.next');
    const categorySlider = document.querySelector('.category-slider');
    
    if (prevButton && nextButton && categorySlider) {
        prevButton.addEventListener('click', function() {
            scrollCategories('prev');
        });
        
        nextButton.addEventListener('click', function() {
            scrollCategories('next');
        });
    }
    
    // Search bar functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
    
    // Restaurant card hover effect
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    
    if (restaurantCards) {
        restaurantCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
            });
            
            // Add click event
            card.addEventListener('click', function() {
                const restaurantName = this.querySelector('h4').textContent;
                openRestaurantPage(restaurantName);
            });
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input');
            
            if (emailInput.value.trim() !== '') {
                // Show success message
                let successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.textContent = 'Thank you for subscribing to our newsletter!';
                
                this.parentNode.appendChild(successMessage);
                
                // Clear the input
                emailInput.value = '';
                
                // Remove the message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
    }
    
    // Add AOS animations if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }
    
    // Add mobile detection
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
});

/**
 * Update active navigation item based on scroll position
 */
function updateActiveNavItem() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        
        if (href === currentSection) {
            link.classList.add('active');
        }
        
        // Home link should be active when at the top
        if (window.pageYOffset < 100 && href === 'home') {
            link.classList.add('active');
        }
    });
}

/**
 * Scroll categories horizontally
 * @param {string} direction - 'prev' or 'next'
 */
function scrollCategories(direction) {
    const categorySlider = document.querySelector('.category-slider');
    if (!categorySlider) return;
    
    const scrollAmount = 300; // Adjust as needed
    
    if (direction === 'prev') {
        categorySlider.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        categorySlider.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}

/**
 * Perform search functionality
 * @param {string} query - Search query
 */
function performSearch(query) {
    if (!query.trim()) return;
    
    // In a real app, this would make an API call or redirect to a search results page
    console.log(`Searching for: ${query}`);
    
    // Show a search notification
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
        // Remove any existing notification
        const existingNotification = document.querySelector('.search-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create a new notification
        const notification = document.createElement('div');
        notification.className = 'search-notification';
        notification.innerHTML = `<div class="alert alert-info mt-3">Searching for "${query}"...</div>`;
        
        searchContainer.appendChild(notification);
        
        // Remove after 2 seconds
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }
}

/**
 * Open restaurant page (placeholder function)
 * @param {string} restaurantName - Name of the restaurant
 */
function openRestaurantPage(restaurantName) {
    // In a real app, this would navigate to a restaurant detail page
    console.log(`Opening restaurant page for: ${restaurantName}`);
    
    // Show a notification
    alert(`You selected ${restaurantName}. In a real app, this would open the restaurant detail page.`);
}

/**
 * Check if viewing on mobile and adjust UI accordingly
 */
function checkMobileView() {
    const isMobile = window.innerWidth <= 768;
    
    // Adjust UI elements for mobile
    if (isMobile) {
        // Add mobile-specific classes or behaviors
        document.body.classList.add('mobile-view');
        
        // Adjust category cards display
        const categoryCards = document.querySelectorAll('.category-card');
        if (categoryCards) {
            categoryCards.forEach(card => {
                card.addEventListener('click', function() {
                    // Mobile tap behavior
                    this.classList.add('tapped');
                    
                    setTimeout(() => {
                        this.classList.remove('tapped');
                    }, 300);
                });
            });
        }
    } else {
        document.body.classList.remove('mobile-view');
    }
}