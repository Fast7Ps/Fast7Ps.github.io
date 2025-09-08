    <script>  
// تأثير العد التصاعدي للإحصائيات - يبدأ فوراً
function initializeStatsCounter() {
    const statItems = document.querySelectorAll('.stat-item');
    
    if (statItems.length === 0) return;
    
    // تشغيل العدادات فوراً مع تأخير بسيط
    statItems.forEach((item, index) => {
        // تأخير تدريجي لكل عنصر (0.2s, 0.4s, 0.6s)
        setTimeout(() => {
            item.classList.add('animate');
            animateCounter(item);
        }, index * 200 + 300); // +300ms تأخير أولي
    });
    
    // دالة العد التصاعدي
    function animateCounter(statItem) {
        const statNumber = statItem.querySelector('.stat-number');
        const dataTarget = statItem.getAttribute('data-target');
        const dataSuffix = statItem.getAttribute('data-suffix') || '';
        const isYears = statItem.getAttribute('data-years') === 'true';
        
        if (!statNumber || !dataTarget) return;
        
        let target = parseInt(dataTarget);
        let current = 0;
        let increment;
        let duration;
        
        // تحديد السرعة حسب حجم الرقم
        if (target <= 10) {
            increment = 1;
            duration = 2000;
        } else if (target <= 50) {
            increment = 1;
            duration = 2500;
        } else if (target <= 100) {
            increment = 2;
            duration = 3000;
        } else {
            increment = 5;
            duration = 3500;
        }
        
        // للسنوات، عد أبطأ
        if (isYears) {
            increment = 1;
            duration = 4000;
        }
        
        const steps = Math.ceil(target / increment);
        const stepTime = Math.abs(duration / steps);
        let timer;
        
        console.log(`Starting counter for ${target}${dataSuffix} - duration: ${duration}ms`);
        
        // بدء العد
        timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                current = target;
                clearInterval(timer);
                // تأثير نهائي
                finalNumberEffect(statNumber, statItem);
            }
            
            // تحديث النص
            statNumber.textContent = current + dataSuffix;
            statNumber.setAttribute('data-number', current);
            
            // تأثير وميض أثناء العد
            statNumber.style.transform = 'scale(1.1)';
            statNumber.style.color = '#f59e0b';
            
            setTimeout(() => {
                statNumber.style.transform = 'scale(1)';
                statNumber.style.color = '';
            }, 120);
            
        }, stepTime);
        
        // تأثير نهائي للرقم
        function finalNumberEffect(numberElement, statItem) {
            numberElement.style.transform = 'scale(1.2)';
            numberElement.style.color = '#d97706';
            
            // نبض للأيقونة
            const statIcon = statItem.querySelector('.stat-icon');
            if (statIcon) {
                statIcon.style.transform = 'scale(1.2)';
                
                
                setTimeout(() => {
                    statIcon.style.transform = 'scale(1)';
                    
                }, 300);
            }
            
            setTimeout(() => {
                numberElement.style.transform = 'scale(1)';
                numberElement.style.color = '';
            }, 300);
        }
    }
}

// تعديل وظيفة الـ preloader لتشمل تشغيل العدادات
function initializePreloader() {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    const logoImage = document.getElementById('logoImage');
    
    if (!preloader || !mainContent) return;
    
    let isLoaded = false;
    const minLoadTime = 3000;
    let startTime = Date.now();
    
    // منع التمرير
    document.body.style.overflow = 'hidden';
    
    // التحقق من تحميل الشعار
    function checkLogoLoad() {
        if (logoImage && logoImage.complete && logoImage.naturalWidth > 0) {
            preloader.classList.add('loaded');
            isLoaded = true;
            console.log('Logo loaded successfully');
            startLogoAnimation();
        } else if (!logoImage) {
            // إذا لم يوجد شعار، ابدأ مباشرة
            setTimeout(() => {
                preloader.classList.add('loaded');
                isLoaded = true;
            }, 300);
        } else {
            setTimeout(checkLogoLoad, 100);
        }
    }
    
    function startLogoAnimation() {
        setTimeout(() => {
            const logoSvg = document.querySelector('.logo-svg');
            if (logoSvg) {
                logoSvg.style.animation = 'logoRotate 4s linear infinite 0.5s';
            }
        }, 500);
    }
    
    // إضافة CSS للدوران
    if (!document.querySelector('style[data-stats-animation]')) {
        const style = document.createElement('style');
        style.setAttribute('data-stats-animation', 'true');
        style.textContent = `
            @keyframes logoRotate {
                from { transform: rotate(0deg) scale(1); }
                to { transform: rotate(360deg) scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // بدء التحقق
    setTimeout(checkLogoLoad, 50);
    
    // إنهاء التحميل
    function finishLoading() {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            
            setTimeout(() => {
                if (mainContent) {
                    mainContent.style.opacity = '1';
                    mainContent.style.transform = 'translateY(0)';
                }
                
                // تشغيل جميع الرسوم المتحركة فوراً
                setTimeout(() => {
                    // تشغيل العدادات أولاً
                    if (typeof initializeStatsCounter === 'function') {
                        initializeStatsCounter();
                    }
                    
                    // ثم باقي الرسوم المتحركة
                    setTimeout(() => {
                        if (typeof initializeAnimations === 'function') initializeAnimations();
                        if (typeof initializeWorkFilter === 'function') initializeWorkFilter();
                    }, 500);
                    
                }, 100);
                
                // إزالة الـ preloader
                setTimeout(() => {
                    if (preloader) {
                        preloader.remove();
                    }
                    document.body.style.overflow = 'auto';
                }, 600);
            }, 100);
        }
    }
    
    let loadTime = Date.now() - startTime;
    let remainingTime = minLoadTime - loadTime;
    
    const timer = setTimeout(() => {
        finishLoading();
        clearTimeout(timer);
    }, Math.max(500, remainingTime));
    
    // حماية
    setTimeout(() => {
        if (!preloader.classList.contains('hidden')) {
            finishLoading();
        }
    }, 6000);
}

// تهيئة شاملة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, starting preloader');
    
    // تشغيل الـ preloader أولاً
    initializePreloader();
    
    // تهيئة Swiper بعد فترة قصيرة
    setTimeout(() => {
        if (typeof Swiper !== 'undefined') {
            const swiper = new Swiper('.swiper', {
                slidesPerView: 1.6,
                centeredSlides: true,
                spaceBetween: 40,
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    480: { slidesPerView: 2.2, spaceBetween: 35 },
                    768: { slidesPerView: 2.2, spaceBetween: 35 },
                    1024: { slidesPerView: 3, spaceBetween: 40 }
                },
                speed: 600,
                effect: 'slide',
                grabCursor: true,
            });
            console.log('Swiper initialized');
        }
    }, 200);
    
    // تعيين السنة الحالية
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

// تشغيل العدادات عند تحميل كامل الصفحة كحماية
window.addEventListener('load', function() {
    console.log('Page fully loaded');
    
    // تشغيل العدادات فوراً إذا لم تُشغل بعد
    setTimeout(() => {
        if (typeof initializeStatsCounter === 'function') {
            // التحقق من أن العدادات لم تُشغل بعد
            const animatedItems = document.querySelectorAll('.stat-item.animate');
            if (animatedItems.length === 0) {
                console.log('Starting stats counter on page load');
                initializeStatsCounter();
            }
        }
    }, 500);
});

// إضافة تشغيل يدوي للعدادات بعد الـ preloader (حماية إضافية)
function ensureStatsCounter() {
    const statItems = document.querySelectorAll('.stat-item');
    const animatedItems = document.querySelectorAll('.stat-item.animate');
    
    if (statItems.length > 0 && animatedItems.length === 0) {
        console.log('Ensuring stats counter starts');
        initializeStatsCounter();
    }
}

// تشغيل الضمان بعد 2 ثانية من تحميل الصفحة
setTimeout(ensureStatsCounter, 2000);
</script>
