  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function () {
    initializeAnimations();
    handleContactClicks();
    handleScrollAnimations();
    addHoverEffects();
    handleResponsive();
    initializeMap();
});

// Initialize page animations
function initializeAnimations() {
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + index * 100);
    });
    
    const mapSection = document.querySelector('.map-section');
    if (mapSection) {
        mapSection.style.opacity = '0';
        mapSection.style.transform = 'translateY(30px)';
        setTimeout(() => {
            mapSection.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            mapSection.style.opacity = '1';
            mapSection.style.transform = 'translateY(0)';
        }, 600);
    }
    
    const footer = document.querySelector('.footer-card');
    if (footer) {
        footer.style.opacity = '0';
        footer.style.transform = 'translateY(30px)';
        setTimeout(() => {
            footer.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            footer.style.opacity = '1';
            footer.style.transform = 'translateY(0)';
        }, 800);
    }
}

// Handle contact card clicks
function handleContactClicks() {
    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('data-href');
            if (!href) return;
            if (href.startsWith('http')) {
                window.open(href, '_blank', 'noopener,noreferrer');
            } else {
                window.location.href = href;
            }
        });

        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
    });
}

// Handle scroll animations
function handleScrollAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('animate-in');
        });
    }, observerOptions);
    document.querySelectorAll('.contact-card, .map-section, .footer-card').forEach(el => observer.observe(el));
}

// Add enhanced hover effects
function addHoverEffects() {
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-4px) scale(1.02)';
            const arrow = this.querySelector('.contact-arrow');
            if (arrow) arrow.style.transform = 'translateX(-4px)';
            createRippleEffect(this);
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
            const arrow = this.querySelector('.contact-arrow');
            if (arrow) arrow.style.transform = '';
        });
    });
    const floatingBtn = document.querySelector('.floating-whatsapp a');
    if (floatingBtn) {
        floatingBtn.addEventListener('mouseenter', function () { this.style.transform = 'scale(1.1) rotate(5deg)'; });
        floatingBtn.addEventListener('mouseleave', function () { this.style.transform = ''; });
    }
}

// Create ripple effect
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.marginLeft = '-10px';
    ripple.style.marginTop = '-10px';
    ripple.style.pointerEvents = 'none';
    element.style.position = 'relative';
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// Handle responsive behavior
function handleResponsive() {
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleScrollAnimations, 250);
    });
}


////////////////////////////////

// Initialize Map الخريطة
function initializeMap() {
    try {
       // إحداثيات الخليل التقريبية
        const latitude = 31.5304;
        const longitude = 35.0963;
        
        // إنشاء الخريطة باستخدام Leaflet
        const map = L.map('map').setView([latitude, longitude], 12);
        
        // إضافة طبقة الخريطة من OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // إضافة علامة للموقع
        const marker = L.marker([latitude, longitude]).addTo(map);
        marker.bindPopup("<b>GOLO MEN'S WEAR</b><br>ملابس رجالية أنيقة - الخليل فلسطين").openPopup();
        
    } catch (error) {
        console.error('Error initializing map:', error);
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div class="map-error">
                    <i class="fas fa-map-marked-alt"></i>
                    <p>عذراً، تعذر تحميل الخريطة</p>
                    <p>يمكنك <a href="https://www.google.com/maps/search/?api=1&query=31.5304,35.0963" target="_blank">النقر هنا</a> لفتح الخريطة في نافذة جديدة</p>
                </div>`;
        }
    }
}

// Add CSS animation for ripple effect
const styleEl = document.createElement('style');
styleEl.textContent = `
@keyframes ripple { to { transform: scale(4); opacity: 0 } }
.animate-in { animation: slideInUp 0.6s cubic-bezier(.4,0,.2,1) forwards }
@keyframes slideInUp { from { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: translateY(0) } }
`;
document.head.appendChild(styleEl);