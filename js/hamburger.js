let address = window.location.pathname.split("/").pop().replace(".html", "");
let language = window.location.pathname.slice(-2)[0];

window.localStorage.setItem("currentNav", address);
window.localStorage.setItem("currentLang", language);

document.getElementById(address).classList.add("disable-link");