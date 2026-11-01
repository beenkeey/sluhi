(function () {
  const motion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (motion) document.documentElement.classList.add("motion");

  const header = document.querySelector(".header");
  const dialog = document.querySelector("#lightbox");
  const dialogImg = dialog.querySelector("img");
  const dialogCaption = dialog.querySelector(".lightbox__caption");
  const dialogPrice = dialog.querySelector(".lightbox__price");
  const dialogNote = dialog.querySelector(".lightbox__note");
  const prevBtn = dialog.querySelector(".lightbox__prev");
  const nextBtn = dialog.querySelector(".lightbox__next");
  const year = document.querySelector("[data-year]");

  const labels = {
    painting: "роспись",
    embroidery: "вышивка",
    miniature: "миниатюра",
  };

  let activeImages = [];
  let activeIndex = 0;
  let activeTitle = "";

  if (year) year.textContent = String(new Date().getFullYear());

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[char]));
  }

  function placeholder(index, category) {
    const number = String(index + 1).padStart(2, "0");
    const tone = (index % 4) + 1;
    return (
      '<div class="ph ph--' + tone + '" aria-hidden="true">' +
        '<span class="ph__num">' + number + "</span>" +
        '<span class="ph__label">' + escapeHtml(labels[category] || "") + "</span>" +
      "</div>"
    );
  }

  function cardHtml(work, index) {
    const category = labels[work.category] || "";
    const title = work.title || category;
    const price = work.price || "";
    const images = Array.isArray(work.images) && work.images.length
      ? work.images
      : [(work.cover || work.src || "").trim()].filter(Boolean);
    const cover = (work.cover || images[0] || "").trim();
    const extra = Math.max(0, images.length - 1);
    const fit = work.fit === "contain" ? ' data-fit="contain"' : "";
    const media = cover
      ? '<button class="card__zoom" type="button" data-work-index="' + index + '">' +
          '<img src="' + escapeHtml(cover) + '" alt="' + escapeHtml(work.alt || title) + '" loading="lazy" decoding="async">' +
          (extra ? '<span class="card__more">+' + extra + "</span>" : "") +
        "</button>"
      : placeholder(index, work.category);

    return (
      '<article class="card" data-category="' + escapeHtml(work.category || "") + '" data-span="' + escapeHtml(work.span || "6") + '" data-ratio="' + escapeHtml(work.ratio || "portrait") + '"' + fit + (work.shift ? ' data-shift="down"' : "") + ">" +
        "<figure>" +
          '<div class="card__visual">' + media + "</div>" +
          '<figcaption class="card__caption">' +
            "<h3>" + escapeHtml(title) + "</h3>" +
            "<p>" + escapeHtml(price || category) + "</p>" +
          "</figcaption>" +
        "</figure>" +
      "</article>"
    );
  }

  function showSlide(index) {
    if (!activeImages.length) return;
    activeIndex = (index + activeImages.length) % activeImages.length;
    dialogImg.src = activeImages[activeIndex];
    dialogImg.alt = activeTitle;
    const many = activeImages.length > 1;
    prevBtn.hidden = !many;
    nextBtn.hidden = !many;
    dialogNote.textContent = many
      ? (activeIndex + 1) + " / " + activeImages.length
      : "";
  }

  function openWork(work) {
    const images = Array.isArray(work.images) && work.images.length
      ? work.images
      : [(work.cover || work.src || "").trim()].filter(Boolean);
    if (!images.length) return;
    activeImages = images;
    activeTitle = work.title || "";
    dialogCaption.textContent = activeTitle;
    dialogPrice.textContent = work.price || "";
    showSlide(0);
    dialog.showModal();
  }

  function bindGallery(gallery, items) {
    gallery.querySelectorAll("img").forEach((img) => {
      img.addEventListener("error", () => {
        const card = img.closest(".card");
        const index = [...gallery.children].indexOf(card);
        const zoom = img.closest(".card__zoom");
        if (zoom) zoom.remove();
        card.querySelector(".card__visual").insertAdjacentHTML(
          "beforeend",
          placeholder(index, card.dataset.category)
        );
      });
    });

    gallery.addEventListener("click", (event) => {
      const zoom = event.target.closest(".card__zoom");
      if (!zoom) return;
      const workIndex = Number(zoom.dataset.workIndex);
      const work = items[workIndex];
      if (work) openWork(work);
    });
  }

  function renderGalleries() {
    const works = Array.isArray(window.WORKS) ? window.WORKS : (typeof WORKS !== "undefined" ? WORKS : []);

    document.querySelectorAll("[data-gallery]").forEach((gallery) => {
      const category = gallery.dataset.gallery;
      const items = works.filter((work) => work.category === category);
      const empty = gallery.parentElement.querySelector("[data-empty]");

      gallery.innerHTML = items.map((work, index) => cardHtml(work, index)).join("");
      if (empty) empty.hidden = items.length !== 0;
      bindGallery(gallery, items);
    });

    watchReveal();
  }

  function watchReveal() {
    const nodes = document.querySelectorAll(".works__head, .order__intro, .order__promise, .card");
    if (!motion || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-in"));
      return;
    }

    const seen = new WeakSet();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || seen.has(entry.target)) return;
        seen.add(entry.target);
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });

    nodes.forEach((node, index) => {
      node.classList.add("reveal");
      const cards = node.parentElement ? [...node.parentElement.children] : [];
      const place = cards.indexOf(node);
      if (node.classList.contains("card") && place > 0) {
        node.style.transitionDelay = Math.min(place, 5) * 90 + "ms";
      } else if (!node.classList.contains("card")) {
        node.style.transitionDelay = (index % 2) * 80 + "ms";
      }
      observer.observe(node);
    });
  }

  prevBtn.addEventListener("click", () => showSlide(activeIndex - 1));
  nextBtn.addEventListener("click", () => showSlide(activeIndex + 1));

  dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    dialogImg.removeAttribute("src");
    activeImages = [];
    activeIndex = 0;
  });
  document.addEventListener("keydown", (event) => {
    if (!dialog.open) return;
    if (event.key === "ArrowLeft") showSlide(activeIndex - 1);
    if (event.key === "ArrowRight") showSlide(activeIndex + 1);
  });

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  document.addEventListener("scroll", onScroll, { passive: true });

  renderGalleries();
})();
