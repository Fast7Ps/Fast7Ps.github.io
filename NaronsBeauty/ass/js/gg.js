
// تأثير العد التصاعدي للإحصائيات
function initializeStatsCounter() {
    const statItems = document.querySelectorAll('.stat-item');
    const observerOptions = {
        threshold: 0.7, // يبدأ العد عندما تظهر 70% من العنصر
        rootMargin: '0px 0px -100px 0px' // يبدأ قبل 100px من الظهور
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItem = entry.target;
                statItem.classList.add('animate');
                animateCounter(statItem);
                observer.unobserve(statItem); // إيقاف المراقبة بعد التشغيل مرة واحدة
            }
        });
    }, observerOptions);

    // مراقبة جميع عناصر الإحصائيات
    statItems.forEach(item => {
        observer.observe(item);
    });

    // دالة العد التصاعدي
    function animateCounter(statItem) {
        const statNumber = statItem.querySelector('.stat-number');
        const dataTarget = statItem.getAttribute('data-target');
        const dataSuffix = statItem.getAttribute('data-suffix') || '';
        const isYears = statItem.getAttribute('data-years') === 'true';
        
        let target = parseInt(dataTarget);
        let current = parseInt(statNumber.getAttribute('data-number'));
        let increment;
        let duration;

        // تحديد سرعة العد حسب حجم الرقم
        if (target <= 10) {
            increment = 1;
            duration = 1500; // 1.5 ثانية للأرقام الصغيرة
        } else if (target <= 100) {
            increment = 1;
            duration = 2000; // 2 ثانية
        } else {
            increment = 5;
            duration = 2500; // 2.5 ثانية للأرقام الكبيرة
        }

        // للسنوات، عد من 0 إلى الرقم ببطء أكثر
        if (isYears) {
            increment = 1;
            duration = 3000; // 3 ثواني للسنوات
        }

        const steps = Math.ceil(target / increment);
        const stepTime = Math.abs(duration / steps);
        let timer;

        timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // تحديث النص مع المؤثرات
            statNumber.textContent = current + dataSuffix;
            statNumber.setAttribute('data-number', current);
            
            // إضافة تأثير وميض أثناء العد
            statNumber.style.transform = 'scale(1.1)';
            statNumber.style.color = '#f59e0b';
            
            setTimeout(() => {
                statNumber.style.transform = 'scale(1)';
                statNumber.style.color = '';
            }, 100);
            
        }, stepTime);

        // عند انتهاء العد، إضافة تأثير نهائي
        setTimeout(() => {
            statNumber.style.transform = 'scale(1.2)';
            statNumber.style.color = '#d97706';
            
            setTimeout(() => {
                statNumber.style.transform = 'scale(1)';
                statNumber.style.color = '';
                
                // إضافة تأثير نبض للأيقونة
                const statIcon = statItem.querySelector('.stat-icon');
                if (statIcon) {
                    statIcon.style.animation = 'pulseIcon 1s ease-in-out';
                    setTimeout(() => {
                        statIcon.style.animation = '';
                    }, 1000);
                }
                
            }, 200);
        }, duration);
    }

    // إعادة تشغيل العداد عند التمرير للأعلى (اختياري)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const headerCard = document.querySelector('.header-card');
        
        if (headerCard) {
            const headerRect = headerCard.getBoundingClientRect();
            const isVisible = headerRect.top < window.innerHeight && headerRect.bottom > 0;
            
            if (isVisible && !statItems[0].classList.contains('animate')) {
                statItems.forEach(item => {
                    item.classList.add('animate');
                    animateCounter(item);
                });
            }
        }
    });
}

// دالة للتحقق من الرقم الحالي (للاختبار)
function getCurrentStatValue(statItem) {
    const statNumber = statItem.querySelector('.stat-number');
    return statNumber.textContent;
}

// تهيئة العداد عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تشغيل العداد بعد تحميل الصفحة
    setTimeout(() => {
        initializeStatsCounter();
    }, 500);
    
    // إضافة مستمع للتمرير لإعادة تشغيل العداد إذا لزم الأمر
    let scrollTimer;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            // التحقق من ظهور قسم الإحصائيات
            const statsGrid = document.querySelector('.stats-grid');
            if (statsGrid) {
                const rect = statsGrid.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    const animatedItems = document.querySelectorAll('.stat-item.animate');
                    if (animatedItems.length < 3) {
                        // إذا لم تُحرّك جميع العناصر، أعد تشغيل العداد
                        document.querySelectorAll('.stat-item').forEach(item => {
                            if (!item.classList.contains('animate')) {
                                item.classList.add('animate');
                                animateCounter(item);
                            }
                        });
                    }
                }
            }
        }, 100);
    });
});

// إضافة تأثير للعناصر عند التمرير (اختياري)
function addScrollAnimations() {
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
    
    // تطبيق على جميع العناصر التي تحتاج للرسوم المتحركة
    document.querySelectorAll('.stat-item, .contact-card, .work-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', addScrollAnimations);
