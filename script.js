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
        
        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.classList.add('navbar-scrolled');
            } else {
                header.classList.remove('navbar-scrolled');
            }
        });
        
        // Animation on scroll
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
        
        // Hero slideshow seamless infinite loop
        const heroSlides = document.querySelector('.hero-slides');
        const heroImages = document.querySelectorAll('.hero-slides img');
        const totalSlides = heroImages.length;
        let heroSlideIndex = 1; // Start at first real image (after clone)
        let slideInterval;
        
        function goToHeroSlide(index, animate = true) {
            if (heroSlides) {
                heroSlides.style.transition = animate ? 'transform 0.8s cubic-bezier(0.77,0,0.18,1)' : 'none';
                heroSlides.style.transform = `translateX(-${index * 100}vw)`;
            }
        }
        
        function startHeroSlideshow() {
            goToHeroSlide(heroSlideIndex, false);
            slideInterval = setInterval(() => {
                heroSlideIndex++;
                goToHeroSlide(heroSlideIndex, true);
                // If at the last (clone of first), reset to first real after transition
                if (heroSlideIndex === totalSlides - 1) {
                    setTimeout(() => {
                        heroSlideIndex = 1;
                        goToHeroSlide(heroSlideIndex, false);
                    }, 800); // match transition duration
                }
            }, 3000);
        }
        
        // Handle seamless jump when user navigates quickly (optional, for robustness)
        if (heroSlides) {
            heroSlides.addEventListener('transitionend', () => {
                if (heroSlideIndex === 0) {
                    heroSlideIndex = totalSlides - 2;
                    goToHeroSlide(heroSlideIndex, false);
                } else if (heroSlideIndex === totalSlides - 1) {
                    heroSlideIndex = 1;
                    goToHeroSlide(heroSlideIndex, false);
                }
            });
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            startHeroSlideshow();
        });
        
        // Showroom slideshow seamless infinite loop
        const showroomSlides = document.querySelector('.showroom-slides');
        const showroomImages = document.querySelectorAll('.showroom-slides img');
        const totalShowroomSlides = showroomImages.length;
        let showroomSlideIndex = 1; // Start at first real image (after clone)
        let showroomSlideInterval;
        
        function goToShowroomSlide(index, animate = true) {
            if (showroomSlides) {
                showroomSlides.style.transition = animate ? 'transform 0.8s cubic-bezier(0.77,0,0.18,1)' : 'none';
                showroomSlides.style.transform = `translateX(-${index * 100}%)`;
            }
        }
        
        function startShowroomSlideshow() {
            goToShowroomSlide(showroomSlideIndex, false);
            showroomSlideInterval = setInterval(() => {
                showroomSlideIndex++;
                goToShowroomSlide(showroomSlideIndex, true);
                // If at the last (clone of first), reset to first real after transition
                if (showroomSlideIndex === totalShowroomSlides - 1) {
                    setTimeout(() => {
                        showroomSlideIndex = 1;
                        goToShowroomSlide(showroomSlideIndex, false);
                    }, 800); // match transition duration
                }
            }, 3000);
        }
        
        // Handle seamless jump when user navigates quickly (optional, for robustness)
        if (showroomSlides) {
            showroomSlides.addEventListener('transitionend', () => {
                if (showroomSlideIndex === 0) {
                    showroomSlideIndex = totalShowroomSlides - 2;
                    goToShowroomSlide(showroomSlideIndex, false);
                } else if (showroomSlideIndex === totalShowroomSlides - 1) {
                    showroomSlideIndex = 1;
                    goToShowroomSlide(showroomSlideIndex, false);
                }
            });
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            startShowroomSlideshow();
        });