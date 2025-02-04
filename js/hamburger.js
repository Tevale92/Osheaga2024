let address = window.location.pathname.split("/").pop().replace(".html", "");
let language = window.location.pathname.split("/").slice(-2)[0];

localStorage.setItem("currentNav", address);
localStorage.setItem("currentLang", language);

document.getElementById(address).classList.add("disable-link");

document.getElementById("menu-toggle").addEventListener("click", function () {
    let navMenu = document.getElementById("nav-options");
    navMenu.classList.toggle("show-menu");
});

document.getElementById("nav-menu-toggle").addEventListener("click", function () {
    let navMenu = document.getElementById("nav-options");
    navMenu.classList.toggle("show-menu");
});