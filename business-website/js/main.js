// ========================================
// BUSINESS SOLUTIONS - MAIN JAVASCRIPT
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const body = document.body;
    
    if (mobileMenuToggle && nav && mobileOverlay) {
        // Toggle mobile menu
        mobileMenuToggle.addEventListener('click', function() {
            const isActive = nav.classList.contains('active');
            
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        // Close menu when overlay is clicked
        mobileOverlay.addEventListener('click', closeMobileMenu);
        
        // Close menu when nav link is clicked
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
    
    function openMobileMenu() {
        nav.classList.add('active');
        mobileOverlay.classList.add('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        mobileMenuToggle.textContent = '✕';
        body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    }
    
    function closeMobileMenu() {
        nav.classList.remove('active');
        mobileOverlay.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.textContent = '☰';
        body.style.overflow = ''; // Restore scrolling
    }
    
    // ========================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ========================================
    
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal page anchors
            if (href !== '#' && href.length > 1) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    closeMobileMenu();
                    
                    // Smooth scroll to target
                    const headerOffset = 80; // Account for sticky header
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update focus for accessibility
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                }
            }
        });
    });
    
    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add shadow when scrolled
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // ========================================
    // SCROLL REVEAL ANIMATION
    // ========================================
    
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0) {
        // Create Intersection Observer
        const revealObserver = new IntersectionObserver(
            function(entries, observer) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        // Optional: stop observing after reveal
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15, // Trigger when 15% of element is visible
                rootMargin: '0px 0px -50px 0px' // Start animation slightly before element enters viewport
            }
        );
        
        // Observe all reveal elements
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }
    
    // ========================================
    // SERVICE CARD HOVER EFFECTS
    // ========================================
    
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle animation or effect
            this.style.transition = 'all 0.3s ease-in-out';
        });
    });
    
    // ========================================
    // ACTIVE NAVIGATION LINK HIGHLIGHTING
    // ========================================
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
    
    // ========================================
    // LAZY LOADING IMAGES (Fallback for older browsers)
    // ========================================
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src; // Trigger loading
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // ========================================
    // ACCESSIBILITY: SKIP TO MAIN CONTENT
    // ========================================
    
    // Add skip link functionality if it exists
    const skipLink = document.querySelector('a[href="#main"]');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const main = document.querySelector('main');
            if (main) {
                main.setAttribute('tabindex', '-1');
                main.focus();
            }
        });
    }
    
    // ========================================
    // PERFORMANCE: PRELOAD CRITICAL RESOURCES
    // ========================================
    
    // Preload next page on hover (for better perceived performance)
    const internalLinks = document.querySelectorAll('a[href$=".html"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const href = this.getAttribute('href');
            
            // Check if link hasn't been preloaded yet
            if (!document.querySelector(`link[rel="prefetch"][href="${href}"]`)) {
                const prefetchLink = document.createElement('link');
                prefetchLink.rel = 'prefetch';
                prefetchLink.href = href;
                document.head.appendChild(prefetchLink);
            }
        });
    });
    
    // ========================================
    // CONSOLE MESSAGE
    // ========================================
    
    console.log('%c🚀 Business Solutions', 'font-size: 20px; font-weight: bold; color: #3498db;');
    console.log('%cWebsite built with modern web technologies', 'font-size: 12px; color: #666;');
    console.log('%cHTML5 • CSS3 • SASS • JavaScript ES6', 'font-size: 12px; color: #2ecc71;');
    
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========================================
// EXPORT FOR MODULE USAGE (Optional)
// ========================================

// If using ES6 modules, uncomment below:
// export { debounce, throttle, isInViewport };
