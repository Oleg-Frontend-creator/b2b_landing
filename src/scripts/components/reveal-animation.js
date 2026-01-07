export function initReveal({
                               selector = '.reveal',
                               rootMargin = '0px 0px -10% 0px',
                               threshold = 0.3
                           } = {}) {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
        els.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting)
                return;

            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
        });
    }, {rootMargin, threshold});

    els.forEach(el => io.observe(el));
}