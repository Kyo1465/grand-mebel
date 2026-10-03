const WHATSAPP_PHONE = "77715977888";
const WHATSAPP_MESSAGE = "Здравствуйте! Хочу обсудить заказ мебели.";
const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const siteHeader = document.querySelector(".site-header");
const anchorGap = 18;

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.href = whatsappUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const updateAnchorOffset = () => {
  document.documentElement.style.setProperty(
    "--anchor-offset",
    `${Math.ceil(siteHeader.getBoundingClientRect().height) + anchorGap}px`
  );
};

updateAnchorOffset();
new ResizeObserver(updateAnchorOffset).observe(siteHeader);

document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }

  const target = document.getElementById(link.hash.slice(1));
  if (!target) {
    return;
  }

  event.preventDefault();
  if (window.location.hash !== link.hash) {
    window.history.pushState(null, "", link.hash);
  }

  target.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "start"
  });
});
