const swiper = new Swiper('.swiper', {
  slidesPerView: 1.6,
  centeredSlides: true,
  spaceBetween: 40, // مسافة أكبر بين البطاقات
  loop: true,
  autoplay: {
    delay: 3000, // 3 ثواني بين كل انتقال
    disableOnInteraction: false, // يستمر التشغيل التلقائي حتى بعد التفاعل
    pauseOnMouseEnter: true, // يتوقف عند مرور الفأرة
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
  // إضافة تأثيرات إضافية للسلايدر
  speed: 600, // سرعة الانتقال
  effect: 'slide', // تأثير الانتقال
  grabCursor: true, // تغيير المؤشر للإمساك
});