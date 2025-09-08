// Initialize Map
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
              marker.bindPopup("<b>فرقة الأصيل</b><br>زفة العريس الاحترافية - الخليل فلسطين").openPopup();
              
          } catch (error) {
              console.error('Error initializing map:', error);
              const mapContainer = document.getElementById('map');
              if (mapContainer) {
                  mapContainer.innerHTML = `
                      <div class="map-error">
                          <i class="fas fa-map-marked-alt"></i>
                          <p>عذراً، تعذر تحميل الخريطة</p>
                          <p>يمكنك <a href="https://www.google.com/maps/search/?api=1&query=31.5304,35.0963" target="_blank">النقر هنا</a> لفتح الخريطة في نافذة جديدة</p>
                      </div>                  `;
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