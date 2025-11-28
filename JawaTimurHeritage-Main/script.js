document.addEventListener('DOMContentLoaded', () => {
    // Debug: cek apakah DOM sudah siap
    console.log('DOM siap, mulai pasang event listener tab');

    // Ambil semua tombol tab dan konten tab
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabButtons.length === 0) {
        console.warn('Tidak ditemukan tombol tab (.tab-btn)');
    }
    if (tabPanes.length === 0) {
        console.warn('Tidak ditemukan konten tab (.tab-pane)');
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Tab diklik:', button.getAttribute('data-tab'));

            // Hapus kelas active dari semua tombol dan pane
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Tambah kelas active ke tombol yang diklik
            button.classList.add('active');

            // Tampilkan pane yang sesuai
            const tabId = button.getAttribute('data-tab');
            const targetPane = document.getElementById(tabId);
            if (targetPane) {
                targetPane.classList.add('active');
            } else {
                console.error(`Elemen dengan id="${tabId}" tidak ditemukan`);
            }
        });
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    } else {
        console.warn('Elemen hamburger atau nav-links tidak ditemukan');
    }

    // Debug: cek tombol pertama aktif dan pane aktif
    const activeBtn = document.querySelector('.tab-btn.active');
    const activePane = document.querySelector('.tab-pane.active');
    console.log('Tombol aktif saat ini:', activeBtn ? activeBtn.getAttribute('data-tab') : 'tidak ada');
    console.log('Pane aktif saat ini:', activePane ? activePane.id : 'tidak ada');

    // ... kode lain Anda tetap di sini, misal smooth scroll, hamburger, slider, dll
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');

function revealOnScroll() {
    const trigger = window.innerHeight * 0.85;

    revealEls.forEach(el => {
        if (el.getBoundingClientRect().top < trigger) {
            el.classList.add('show');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// === AUTO SLIDER ===
const track = document.querySelector('.slider-track');
const items = document.querySelectorAll('.slider-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let index = 0;
const itemWidth = items[0].offsetWidth + 20; // width + gap

// Move slider
function updateSlider() {
    track.style.transform = `translateX(-${index * itemWidth}px)`;
}

// Auto scroll
function autoSlide() {
    index++;
    if (index >= items.length) {
        index = 0;
    }
    updateSlider();
}

let sliderInterval = setInterval(autoSlide, 2500); // 2.5s

// Manual buttons
prevBtn.addEventListener('click', () => {
    clearInterval(sliderInterval);
    index--;
    if (index < 0) index = items.length - 1;
    updateSlider();
    sliderInterval = setInterval(autoSlide, 2500);
});

nextBtn.addEventListener('click', () => {
    clearInterval(sliderInterval);
    index++;
    if (index >= items.length) index = 0;
    updateSlider();
    sliderInterval = setInterval(autoSlide, 2500);
});
