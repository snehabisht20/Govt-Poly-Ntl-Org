// Hamburger Menu
document.querySelector('.hamburger')?.addEventListener('click', () => {
    const nav = document.querySelector('.nav-links');
    if (nav) {
        nav.classList.toggle('active');
        document.querySelector('.hamburger').textContent = nav.classList.contains('active') ? '×' : '☰';
    }
});

// Dark Mode
document.getElementById('dark-mode-toggle')?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.getElementById('dark-mode-toggle').textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    document.getElementById('dark-mode-toggle').textContent = '☀️';
}

// Announcement Bar
document.querySelector('#announcement-bar span')?.addEventListener('click', () => {
    document.getElementById('announcement-bar').style.display = 'none';
    localStorage.setItem('announcementClosed', 'true');
});
if (localStorage.getItem('announcementClosed') === 'true') {
    document.getElementById('announcement-bar').style.display = 'none';
}

// Slideshow
let slideIndex = 0;
const setSlide = i => {
    const slides = document.querySelectorAll('.slide'), dots = document.querySelectorAll('.dot');
    if (slides.length && dots.length) {
        slideIndex = i >= slides.length ? 0 : i < 0 ? slides.length - 1 : i;
        slides.forEach((s, j) => s.classList.toggle('active', j === slideIndex));
        dots.forEach((d, j) => d.classList.toggle('active', j === slideIndex));
    }
};
document.querySelectorAll('.dot').forEach(d => d.addEventListener('click', () => setSlide(+d.dataset.index)));
setInterval(() => setSlide(slideIndex + 1), 5000);

// Course Filter
const filterCourses = () => {
    const cat = document.getElementById('course-category')?.value || 'all';
    const search = document.getElementById('course-search')?.value.toLowerCase() || '';
    document.querySelectorAll('.course-card').forEach(c => {
        const matchesCat = cat === 'all' || c.dataset.category === cat;
        const matchesSearch = c.querySelector('h3').textContent.toLowerCase().includes(search);
        c.style.display = matchesCat && matchesSearch ? 'block' : 'none';
    });
};
document.getElementById('course-category')?.addEventListener('change', filterCourses);
document.getElementById('course-search')?.addEventListener('input', filterCourses);

// Gallery Filter
const filterGallery = cat => {
    document.querySelectorAll('#divimage img').forEach(img => {
        img.style.display = cat === 'all' || img.dataset.category === cat ? 'block' : 'none';
    });
    document.querySelectorAll('#gallery-filter button').forEach(b => {
        b.classList.toggle('active', b.dataset.filter === cat);
    });
};
document.querySelectorAll('#gallery-filter button').forEach(b => b.addEventListener('click', () => filterGallery(b.dataset.filter)));

// Lightbox
const openLightbox = (src, alt) => {
    const lb = document.getElementById('lightbox');
    if (lb) {
        document.getElementById('lightbox-img').src = src;
        document.getElementById('lightbox-caption').textContent = alt;
        lb.style.display = 'flex';
    }
};
const closeLightbox = () => {
    const lb = document.getElementById('lightbox');
    if (lb) lb.style.display = 'none';
};
document.querySelectorAll('#divimage img').forEach(img => img.addEventListener('click', () => openLightbox(img.src, img.alt)));
document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);

// Video Carousel
let videoIndex = 0;
const showVideo = i => {
    const vids = document.querySelectorAll('#video-container video');
    if (vids.length) {
        videoIndex = i >= vids.length ? 0 : i < 0 ? vids.length - 1 : i;
        document.getElementById('video-container').style.transform = `translateX(-${videoIndex * 100}%)`;
    }
};
document.getElementById('prev-video')?.addEventListener('click', () => showVideo(videoIndex - 1));
document.getElementById('next-video')?.addEventListener('click', () => showVideo(videoIndex + 1));

// Testimonial Carousel
let testimonialIndex = 0;
const showTestimonial = i => {
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length) {
        testimonialIndex = i >= testimonials.length ? 0 : i < 0 ? testimonials.length - 1 : i;
        document.querySelector('.testimonial-container').style.transform = `translateX(-${testimonialIndex * 100}%)`;
    }
};
document.getElementById('prev-testimonial')?.addEventListener('click', () => showTestimonial(testimonialIndex - 1));
document.getElementById('next-testimonial')?.addEventListener('click', () => showTestimonial(testimonialIndex + 1));

// Back to Top & Progress Bar
document.getElementById('back-to-top')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', () => {
    const backToTop = document.getElementById('back-to-top');
    const progressBar = document.getElementById('progress-bar');
    if (backToTop && progressBar) {
        backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
        progressBar.style.width = `${(window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%`;
    }
});