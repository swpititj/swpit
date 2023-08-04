document.querySelector(".nav-toggle").addEventListener("click", () => {
  document.querySelector(".nav-menu").classList.toggle("nav-menu_visible");

  if (document.querySelector(".nav-menu").classList.contains("nav-menu_visible")) {
    document.querySelector(".nav-toggle").setAttribute("aria-label", "Cerrar menú");
  } else {
    document.querySelector(".nav-toggle").setAttribute("aria-label", "Abrir menú");
  }
});