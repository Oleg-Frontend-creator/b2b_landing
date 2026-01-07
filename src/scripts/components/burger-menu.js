export function initBurgerMenu() {
    const burger = document.getElementById('burger-menu');
    const menu = document.getElementById('menu');

    if (!burger || !menu) return;

    const ACTIVE = 'active';

    const setOpen = (open) => {
        burger.classList.toggle(ACTIVE, open);
        menu.classList.toggle(ACTIVE, open);

        // полезно для a11y
        burger.setAttribute('aria-expanded', String(open));
    };

    const isOpen = () => burger.classList.contains(ACTIVE);

    burger.addEventListener('click', () => setOpen(!isOpen()));

    menu.addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('.menu-link, .menu-item, a')) {
            setOpen(false);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setOpen(false);
    });

    menu.addEventListener('click', (e) => {
      if (e.target === menu) setOpen(false);
    });
}