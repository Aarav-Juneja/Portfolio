// Shared scroll-driven motion for the site.
//
//   data-reveal               fade/slide in when scrolled into view
//   data-reveal-delay="150"   optional stagger in ms
//   data-countup="2000"       count from 0 to the number when visible; the
//                             element's existing text is the final value, so
//                             prefixes/suffixes like "Top 2%" or "2000+" work
//                             by putting the number in its own span.
//
// Content is visible without JS: the hidden state only applies under
// `html.js` (set inline in Layout), and reduced-motion users skip all of it.

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function reveal(el: HTMLElement) {
    const delay = Number(el.dataset.revealDelay || 0);
    if (delay) el.style.transitionDelay = `${delay}ms`;
    el.classList.add("is-visible");
}

function countUp(el: HTMLElement) {
    const target = Number(el.dataset.countup);
    if (!Number.isFinite(target)) return;
    const final = el.textContent ?? String(target);
    const duration = 1400;
    const start = performance.now();
    const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = String(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = final;
    };
    el.textContent = "0";
    requestAnimationFrame(step);
}

function init() {
    const revealEls = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const countEls = document.querySelectorAll<HTMLElement>("[data-countup]");

    if (reduceMotion || !("IntersectionObserver" in window)) {
        revealEls.forEach((el) => el.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                const el = entry.target as HTMLElement;
                if (el.hasAttribute("data-reveal")) reveal(el);
                if (el.hasAttribute("data-countup")) countUp(el);
                observer.unobserve(el);
            }
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    revealEls.forEach((el) => observer.observe(el));
    countEls.forEach((el) => observer.observe(el));
}

init();
