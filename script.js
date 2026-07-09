// ===== Hamburger menu =====
function toggleMenu() {
    var menuToggle = document.querySelector('.menu');
    menuToggle.classList.toggle('active');
}

// Close mobile menu after a link is clicked
document.querySelectorAll('.menu a').forEach(function (link) {
    link.addEventListener('click', function () {
        document.querySelector('.menu').classList.remove('active');
    });
});

// ===== Lightbox / image preview =====
(function () {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImg');
    var lightboxTitle = document.getElementById('lightboxTitle');
    var lightboxDesc = document.getElementById('lightboxDesc');
    var lightboxFile = document.getElementById('lightboxFile');
    var lightboxClose = document.getElementById('lightboxClose');
    var lightboxBackdrop = document.getElementById('lightboxBackdrop');
    var lightboxPrev = document.getElementById('lightboxPrev');
    var lightboxNext = document.getElementById('lightboxNext');

    var groups = {};
    var currentGroup = null;
    var currentIndex = 0;

    document.querySelectorAll('.lightbox-trigger').forEach(function (el, i) {
        var group = el.getAttribute('data-group');
        if (!groups[group]) groups[group] = [];
        groups[group].push({
            img: el.getAttribute('data-img'),
            title: el.getAttribute('data-title'),
            desc: el.getAttribute('data-desc')
        });
        var indexInGroup = groups[group].length - 1;

        el.addEventListener('click', function () {
            openLightbox(group, indexInGroup);
        });
    });

    function openLightbox(group, index) {
        currentGroup = group;
        currentIndex = index;
        renderLightbox();
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function renderLightbox() {
        var item = groups[currentGroup][currentIndex];
        lightboxImg.src = item.img;
        lightboxImg.alt = item.title;
        lightboxTitle.textContent = item.title;
        lightboxDesc.textContent = item.desc;
        var fileName = item.img.split('/').pop();
        lightboxFile.textContent = fileName;
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function showNext() {
        var items = groups[currentGroup];
        currentIndex = (currentIndex + 1) % items.length;
        renderLightbox();
    }

    function showPrev() {
        var items = groups[currentGroup];
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        renderLightbox();
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxBackdrop.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', showNext);
    lightboxPrev.addEventListener('click', showPrev);

    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
})();
