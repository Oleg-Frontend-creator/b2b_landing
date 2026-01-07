let activeModal = null;
let lastFocus = null;

function getFocusable(root) {
    return Array.from(
        root.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
    );
}

function lockScroll() {
    document.body.classList.add('is-locked');
}

function unlockScroll() {
    document.body.classList.remove('is-locked');
}

export function openModal(id) {
    const modal = document.getElementById(`modal-${id}`);
    if (!modal) return;

    if (activeModal) closeModal();

    lastFocus = document.activeElement;
    activeModal = modal;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    lockScroll();

    const focusables = getFocusable(modal);
    (focusables[0] || modal).focus?.();
}

export function closeModal() {
    if (!activeModal) return;

    activeModal.classList.remove('is-open');
    activeModal.setAttribute('aria-hidden', 'true');
    unlockScroll();

    const toRestore = lastFocus;
    activeModal = null;
    lastFocus = null;

    toRestore?.focus?.();
}

export function initModals() {
    document.addEventListener('click', (e) => {
        const openBtn = e.target.closest('[data-modal-open]');
        if (openBtn) {
            e.preventDefault();
            openModal(openBtn.dataset.modalOpen);
            return;
        }

        if (e.target.closest('[data-modal-close]')) {
            e.preventDefault();
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!activeModal) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            closeModal();
            return;
        }

        if (e.key === 'Tab') {
            const focusables = getFocusable(activeModal);
            if (!focusables.length) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });
}

export function initLeadForms() {
    document.addEventListener('submit', async (e) => {
        const form = e.target.closest('[data-lead-form]');
        if (!form) return;
        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const submitBtn = form.querySelector('[type="submit"]');
        submitBtn?.setAttribute('disabled', 'disabled');

        try {
            //сбор данных с формы и отправка на backend
            openModal('thanks');
            form.reset();
        } catch (err) {
            console.error(err);
        } finally {
            submitBtn?.removeAttribute('disabled');
        }
    });
}