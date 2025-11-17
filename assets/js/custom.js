// 精漢堂客製化互動腳本
document.addEventListener('DOMContentLoaded', () => {
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


