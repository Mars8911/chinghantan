// 精漢堂客製化互動腳本
document.addEventListener('DOMContentLoaded', () => {
    // 辨識真假彈出卡片控制
    const authenticityPopup = document.getElementById('authenticityPopup');
    const closeBtn = authenticityPopup?.querySelector('.authenticity-popup__close');
    const overlay = authenticityPopup?.querySelector('.authenticity-popup__overlay');
    
    // 每次頁面載入時都顯示彈出卡片
    if (authenticityPopup) {
        // 延遲顯示，讓頁面先載入
        setTimeout(() => {
            authenticityPopup.classList.add('is-active');
            document.body.style.overflow = 'hidden';
        }, 500);
    }

    // 關閉彈出卡片
    const closePopup = () => {
        if (authenticityPopup) {
            authenticityPopup.classList.remove('is-active');
            document.body.style.overflow = '';
        }
    };

    // 綁定關閉事件
    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }

    if (overlay) {
        overlay.addEventListener('click', closePopup);
    }

    const videoModal = document.getElementById('videoModal');
    const videoIframe = videoModal?.querySelector('.video-modal__iframe');

    const closeVideoModal = () => {
        if (!videoModal || !videoIframe) return;
        videoIframe.src = '';
        videoModal.classList.remove('is-active');
        videoModal.setAttribute('hidden', '');
        if (!authenticityPopup?.classList.contains('is-active')) {
            document.body.style.overflow = '';
        }
    };

    const openVideoModal = (videoId) => {
        if (!videoModal || !videoIframe || !videoId) return;
        videoIframe.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;
        videoModal.classList.add('is-active');
        videoModal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
    };

    document.querySelectorAll('a[data-youtube-id].testimonial-card__play').forEach((link) => {
        link.addEventListener('click', (e) => {
            const id = link.getAttribute('data-youtube-id');
            if (id) {
                e.preventDefault();
                openVideoModal(id);
            }
        });
    });

    videoModal?.querySelectorAll('[data-video-modal-close]').forEach((el) => {
        el.addEventListener('click', closeVideoModal);
    });

    // ESC 鍵關閉（影片優先，其次辨識真假）
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        if (videoModal?.classList.contains('is-active')) {
            closeVideoModal();
        } else if (authenticityPopup?.classList.contains('is-active')) {
            closePopup();
        }
    });

    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbar = document.querySelector('.navbar');

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
                }
            });
        },
        {
            threshold: 0.6,
        }
    );

    document.querySelectorAll('section[id]').forEach(section => observer.observe(section));

    let prevScroll = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > prevScroll && currentScroll > 120) {
            navbar.classList.add('navbar-hidden');
        } else {
            navbar.classList.remove('navbar-hidden');
        }
        prevScroll = currentScroll;
    });
});



