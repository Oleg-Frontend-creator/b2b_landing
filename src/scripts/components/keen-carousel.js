import KeenSlider from "keen-slider";

function autoplay(slider) {
    let timeout;
    let mouseOver = false;

    function clearNextTimeout() {
        clearTimeout(timeout);
    }

    function nextTimeout() {
        clearTimeout(timeout);
        if (mouseOver) return;
        timeout = setTimeout(() => slider.next(), 2500);
    }

    slider.on("created", () => {
        slider.container.addEventListener("mouseenter", () => {
            mouseOver = true;
            clearNextTimeout();
        });
        slider.container.addEventListener("mouseleave", () => {
            mouseOver = false;
            nextTimeout();
        });
        nextTimeout();
    });

    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);
}

export function initCarousel(rootSelector) {
    const el = document.querySelector(rootSelector);
    if (!el) return;

    const slider = new KeenSlider(
        el,
        {
            loop: true,
            mode: "snap",
            slides: {
                perView: 4,
                spacing: 24,
            },
            breakpoints: {
                "(max-width: 1200px)": { slides: { perView: 3, spacing: 16 } },
                "(max-width: 900px)":  { slides: { perView: 2, spacing: 20 } },
                "(max-width: 520px)":  { slides: { perView: 1 } },
            },
        },
        [autoplay]
    );

    document.querySelector(".keen-prev")?.addEventListener("click", () => slider.prev());
    document.querySelector(".keen-next")?.addEventListener("click", () => slider.next());

    window.addEventListener("resize", () => slider.update());
}