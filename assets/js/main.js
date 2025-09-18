(function () {
  "use strict";

  function toggleScrolled() {
    const body = document.querySelector("body");
    const header = document.querySelector("#header");
    if (!header.classList.contains("scroll-up-sticky") && !header.classList.contains("sticky-top") && !header.classList.contains("fixed-top")) return;
    window.scrollY > 100 ? body.classList.add("scrolled") : body.classList.remove("scrolled");
  }
  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");
  function mobileNavToggle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToggle);
  }

  document.querySelectorAll("#navmenu a").forEach((navLink) => {
    navLink.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToggle();
      }
      setTimeout(() => {
        AOS.refresh();
      }, 500);
    });
  });

  // Cuộn mượt và thêm class .active khi click
  document.querySelectorAll('#navmenu a').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      // Xóa class .active khỏi tất cả menu item
      document.querySelectorAll('#navmenu a').forEach((nav) => nav.classList.remove('active'));
      // Thêm class .active cho menu item được click
      this.classList.add('active');
      // Cuộn mượt đến section
      const hash = this.getAttribute("href");
      const target = hash === "#" || hash === "#hero" ? document.body : document.querySelector(hash);
      if (target) {
        const headerOffset = document.querySelector("#header")?.offsetHeight ?? 0;
        const offsetTop = target === document.body ? 0 : target.offsetTop - headerOffset;
        window.scrollTo({ top: offsetTop, behavior: "smooth", duration: 1000 });
        setTimeout(() => {
          AOS.refreshHard();
        }, 1200);
      }
    });
  });

  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  const scrollTop = document.querySelector(".scroll-top");
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add("active") : scrollTop.classList.remove("active");
    }
  }
  scrollTop?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth", duration: 1000 });
    setTimeout(() => {
      AOS.refreshHard();
    }, 1200);
  });
  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  function aosInit() {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out-back',
    once: false,
    mirror: true,
    offset: 100,
    delay: 100,
  });
 }

  window.addEventListener("load", aosInit);

  const glightbox = GLightbox({ selector: ".glightbox" });
  new PureCounter();

  document.querySelectorAll(".faq-item h3, .faq-item .faq-toggle").forEach((item) => {
    item.addEventListener("click", () => {
      item.parentNode.classList.toggle("faq-active");
    });
  });

  document.querySelectorAll(".isotope-layout").forEach((layout) => {
    let mode = layout.getAttribute("data-layout") ?? "masonry";
    let filter = layout.getAttribute("data-default-filter") ?? "*";
    let sort = layout.getAttribute("data-sort") ?? "original-order";
    let iso;
    imagesLoaded(layout.querySelector(".isotope-container"), function () {
      iso = new Isotope(layout.querySelector(".isotope-container"), {
        itemSelector: ".isotope-item",
        layoutMode: mode,
        filter: filter,
        sortBy: sort,
      });
    });

    layout.querySelectorAll(".isotope-filters li").forEach((filterBtn) => {
      filterBtn.addEventListener("click", function () {
        layout.querySelector(".filter-active")?.classList.remove("filter-active");
        this.classList.add("filter-active");
        iso.arrange({ filter: this.getAttribute("data-filter") });
        setTimeout(() => {
          AOS.refreshHard();
        }, 500);
      });
    });
  });

  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach((swiperEl) => {
      let config = JSON.parse(swiperEl.querySelector(".swiper-config").innerHTML.trim());
      if (swiperEl.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperEl, config);
      } else {
        new Swiper(swiperEl, config);
      }
    });
  }
  window.addEventListener("load", initSwiper);

  // Giải pháp fix scroll gấp lúc load hash từ URL
  window.addEventListener("load", () => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      const headerHeight = document.querySelector("#header")?.offsetHeight ?? 0;
      if (target) {
        window.history.replaceState(null, null, window.location.pathname);
        requestAnimationFrame(() => {
          const offset = target.offsetTop - headerHeight;
          window.scrollTo({ top: offset, behavior: "smooth", duration: 1000 });
          setTimeout(() => {
            AOS.refreshHard();
          }, 1200);
          window.history.replaceState(null, null, window.location.hash);
        });
      }
    }
  });
  // Nút sản phẩm tăng giảm
		  document.querySelectorAll('.quantity-control').forEach(function(container) {
			  const input = container.querySelector('.quantity-input');
			  const btnMinus = container.querySelector('.btn-minus');
			  const btnPlus = container.querySelector('.btn-plus');

			  if (btnMinus) {
				btnMinus.addEventListener('click', () => {
				  let val = parseInt(input.value) || 1;
				  if (val > 1) input.value = val - 1;
				});
			  }
			  if (btnPlus) {
				btnPlus.addEventListener('click', () => {
				  let val = parseInt(input.value) || 1;
				  input.value = val + 1;
				});
			  }
		  });

  // Scrollspy highlight menu
  const navLinks = document.querySelectorAll("#navmenu a");
  function scrollSpy() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    let activeSectionFound = false;

    navLinks.forEach((link) => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;

      const sectionTop = section.offsetTop - (document.querySelector("#header")?.offsetHeight ?? 0);
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navLinks.forEach((nav) => nav.classList.remove("active"));
        link.classList.add("active");
        activeSectionFound = true;
      }
    });

    if (!activeSectionFound) {
      navLinks.forEach((nav) => nav.classList.remove("active"));
    }
  }
  window.addEventListener("load", scrollSpy);
  document.addEventListener("scroll", scrollSpy);

  window.addEventListener("load", () => {
    AOS.refreshHard();
  });
  
 

//!-- JS: thêm class has-promo khi #gia-khuyen-mai hiển thị 

document.addEventListener("DOMContentLoaded", function () {
  const ctaSection = document.getElementById("call-to-action-2");
  const gia = document.getElementById("gia-khuyen-mai");
  if (!ctaSection || !gia) return;

  function updateClass() {
    const visible = window.getComputedStyle(gia).display !== "none" && gia.offsetWidth > 0 && gia.offsetHeight > 0;
    ctaSection.classList.toggle("has-promo", visible);
  }

  updateClass();

  // Nếu trạng thái hiển thị thay đổi (JS khác ẩn/hiện), vẫn tự cập nhật
  const observer = new MutationObserver(updateClass);
  observer.observe(gia, { attributes: true, attributeFilter: ["style", "class"] });
});

})();
