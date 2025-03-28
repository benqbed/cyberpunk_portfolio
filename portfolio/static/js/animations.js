// portfolio/static/js/animations.js

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth Scrolling for Nav Links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (menuToggle && menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll with a cyberpunk feel
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Accounting for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Interactive elements hover effects with neon glow
    const interactiveElements = document.querySelectorAll('.cyberpunk-card, .neon-button, .nav-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            addNeonGlow(this);
        });
        
        element.addEventListener('mouseleave', function() {
            removeNeonGlow(this);
        });
    });
    
    function addNeonGlow(element) {
        // Add a subtle neon glow effect with a random color
        const neonColors = [
            'rgba(255, 0, 255, 0.3)', // Pink
            'rgba(0, 255, 255, 0.3)',  // Blue
            'rgba(57, 255, 20, 0.3)',  // Green
            'rgba(255, 255, 0, 0.3)',  // Yellow
            'rgba(204, 0, 255, 0.3)'   // Purple
        ];
        
        const randomColor = neonColors[Math.floor(Math.random() * neonColors.length)];
        element.style.boxShadow = `0 0 15px ${randomColor}`;
    }
    
    function removeNeonGlow(element) {
        // Remove the neon glow effect
        element.style.boxShadow = '';
    }
    
    // Glitch effect on scroll
    const glitchTexts = document.querySelectorAll('.glitch-text');
    
    if (glitchTexts.length > 0) {
        window.addEventListener('scroll', function() {
            glitchTexts.forEach(text => {
                const rect = text.getBoundingClientRect();
                const isVisible = (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= window.innerHeight &&
                    rect.right <= window.innerWidth
                );
                
                if (isVisible) {
                    text.classList.add('glitch-active');
                    
                    // Remove the class after animation completes
                    setTimeout(() => {
                        text.classList.remove('glitch-active');
                    }, 1000);
                }
            });
        });
    }
    
    // Card reveal animations when scrolling
    const revealElements = document.querySelectorAll('.cyberpunk-card, .experience-item');
    
    const revealElementsOnScroll = function() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('element-visible');
            }
        });
    };
    
    // Add the visible class to elements on page load
    window.addEventListener('load', revealElementsOnScroll);
    
    // Check for elements to reveal on scroll
    window.addEventListener('scroll', revealElementsOnScroll);
    
    // Scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
});