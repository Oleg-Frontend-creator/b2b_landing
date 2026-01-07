import {initCarousel} from "../components/keen-carousel.js";
import {initReveal} from "../components/reveal-animation";
import {initBurgerMenu} from "../components/burger-menu";
import {closeModal, initLeadForms, initModals, openModal} from "../components/modal";

document.addEventListener("DOMContentLoaded", () => {
    initReveal({});
    initCarousel('#keenSlider');
    initBurgerMenu();

    initModals();
    initLeadForms();

    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            closeModal();
            openModal("thanks");
            form.reset();
        });
    }
});