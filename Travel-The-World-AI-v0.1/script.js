// ننتظر حتى يتم تحميل الصفحة
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    
    // نحدد مهلة زمنية قدرها 3000 مللي ثانية (3 ثوانٍ)
    setTimeout(function() {
        // إضافة كلاس الاختفاء (الذي يجعل الـ opacity تصبح 0)
        preloader.classList.add('hidden');
        
        // بعد انتهاء أنيميشن التلاشي (نصف ثانية تقريباً)، نحذف العنصر تماماً
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 600); 
        
    }, 3000); // 3000ms = 3 ثوانٍ
});