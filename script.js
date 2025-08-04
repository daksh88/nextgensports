// Mobile navigation toggle
        const mobileToggle = document.querySelector('.mobile-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        const overlay = document.querySelector('.overlay');
        
        mobileToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            overlay.classList.toggle('active');
        });
        
        overlay.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
        });

        // Theme Toggle Functionality
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        // Check for saved theme preference or default to dark mode
        const savedTheme = localStorage.getItem('theme') || 'dark';
        
        // Apply saved theme on page load
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
        }
        
        // Theme toggle event listener
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('light-mode');
            
            // Save theme preference
            const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', currentTheme);
            
            // Add a subtle animation feedback
            themeToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.classList.add('navbar-scrolled');
            } else {
                header.classList.remove('navbar-scrolled');
            }
        });
        
        // Gallery Slideshow Functionality
        let currentSlideIndex = 1;
        const totalSlides = 6; // Number of actual slides (excluding clones)
        let slideInterval;
        let isTransitioning = false;
        
        function showSlide(n) {
            // Prevent multiple transitions at once
            if (isTransitioning) return;
            
            const slides = document.querySelectorAll('.showroom-slide');
            const dots = document.querySelectorAll('.dot');
            
            // Handle looping
            if (n > totalSlides) {
                currentSlideIndex = 1;
            } else if (n < 1) {
                currentSlideIndex = totalSlides;
            } else {
                currentSlideIndex = n;
            }
            
            isTransitioning = true;
            
            // Clear all classes first
            slides.forEach(slide => {
                slide.classList.remove('active', 'prev', 'next', 'hidden');
            });
            
            // Set up 3-card layout
            slides.forEach((slide, index) => {
                const slideNumber = index + 1;
                
                if (slideNumber === currentSlideIndex) {
                    // Center slide - active
                    slide.classList.add('active');
                } else if (slideNumber === (currentSlideIndex === 1 ? totalSlides : currentSlideIndex - 1)) {
                    // Left slide - previous
                    slide.classList.add('prev');
                } else if (slideNumber === (currentSlideIndex === totalSlides ? 1 : currentSlideIndex + 1)) {
                    // Right slide - next
                    slide.classList.add('next');
                } else {
                    // Hidden slides
                    slide.classList.add('hidden');
                }
            });
            
            // Update dots
            dots.forEach((dot, index) => {
                if (index === currentSlideIndex - 1) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            // Allow next transition after animation completes
            setTimeout(() => {
                isTransitioning = false;
            }, 800);
        }
        
        function currentSlide(n) {
            clearInterval(slideInterval);
            currentSlideIndex = n;
            showSlide(currentSlideIndex);
            startSlideshow();
        }
        
        // Make currentSlide globally accessible
        window.currentSlide = currentSlide;
        
        function nextSlide() {
            if (!isTransitioning) {
                currentSlideIndex++;
                showSlide(currentSlideIndex);
            }
        }
        
        function startSlideshow() {
            slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds (reduced from 5 seconds)
        }
        
        // Scroll-based Progress Line Animation
        function animateProgressLine() {
            const progressLine = document.querySelector('.progress-line-main');
            const progressDot = document.querySelector('.progress-dot-main');
            const facilitiesGrid = document.querySelector('.more-facilities-grid');
            const facilityCards = document.querySelectorAll('.more-facility-card');
            
            if (!progressLine || !progressDot || !facilitiesGrid) return;
            
            const gridRect = facilitiesGrid.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate how much of the grid is visible
            const gridTop = gridRect.top;
            const gridBottom = gridRect.bottom;
            const gridHeight = gridRect.height;
            
            // Calculate scroll progress through the grid
            let scrollProgress = 0;
            
            if (gridTop <= windowHeight && gridBottom >= 0) {
                if (gridTop <= windowHeight * 0.8) {
                    // Start animation when grid is 80% visible
                    scrollProgress = Math.min((windowHeight * 0.8 - gridTop) / (gridHeight + windowHeight * 0.2), 1);
                } else {
                    // Grid is entering from bottom
                    scrollProgress = 0;
                }
            }
            
            // Smooth progress curve
            const easedProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
            
            // Update progress line height
            progressLine.style.height = `${easedProgress * 100}%`;
            
            // Update dot position (starts from top and moves down smoothly)
            const dotPosition = easedProgress * 100;
            progressDot.style.top = `${dotPosition}%`;
            
            // Animate cards based on scroll progress
            facilityCards.forEach((card, index) => {
                const cardProgress = (easedProgress * facilityCards.length * 1.2) - index;
                const cardVisibility = Math.max(0, Math.min(cardProgress, 1));
                
                if (cardVisibility > 0) {
                    card.style.opacity = cardVisibility;
                    card.style.transform = `translateY(${(1 - cardVisibility) * 40}px)`;
                } else {
                    card.style.opacity = 0;
                    card.style.transform = 'translateY(40px)';
                }
            });
        }
        
        // Initialize and add scroll listener
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize slideshow
            const slides = document.querySelectorAll('.showroom-slide');
            
            // Set initial state
            showSlide(currentSlideIndex);
            startSlideshow();
            
            // Add click listeners to slides for navigation
            slides.forEach((slide, index) => {
                slide.addEventListener('click', function() {
                    const slideNumber = index + 1;
                    
                    // Only allow clicks on prev/next slides, not the active one
                    if (slide.classList.contains('prev') || slide.classList.contains('next')) {
                        clearInterval(slideInterval);
                        currentSlideIndex = slideNumber;
                        showSlide(currentSlideIndex);
                        startSlideshow();
                    }
                });
            });
            
            // Pause slideshow on hover
            const slideshow = document.querySelector('.showroom-slideshow');
            if (slideshow) {
                slideshow.addEventListener('mouseenter', () => clearInterval(slideInterval));
                slideshow.addEventListener('mouseleave', startSlideshow);
            }
            
            // Add scroll listener for progress line
            window.addEventListener('scroll', animateProgressLine);
            animateProgressLine(); // Initial call
        });
        
        // Animation on scroll for other elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.showroom-content, .about-container, .collection-card, .showroom-item').forEach(item => {
            item.style.opacity = "0";
            item.style.transform = "translateY(30px)";
            item.style.transition = "all 0.8s ease";
            observer.observe(item);
        });
        
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

        // FAQ Section Functionality
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });

        // Enhanced Animation on Scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const enhancedObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    
                    // Add staggered animation for grid items
                    if (entry.target.classList.contains('advantage-card') || 
                        entry.target.classList.contains('application-item') ||
                        entry.target.classList.contains('factor-card')) {
                        const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                        setTimeout(() => {
                            entry.target.style.opacity = "1";
                            entry.target.style.transform = "translateY(0)";
                        }, delay);
                    }
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.showroom-content, .about-container, .collection-card, .showroom-item, .advantage-card, .application-item, .factor-card, .faq-item, .stat-item').forEach(item => {
            item.style.opacity = "0";
            item.style.transform = "translateY(30px)";
            item.style.transition = "all 0.8s ease";
            enhancedObserver.observe(item);
        });