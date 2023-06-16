const nav = document.querySelector(".nav");
const navMenu = document.querySelector(".nav-items");
const btnToggleNav = document.querySelector(".menu-btn");
const workEls = document.querySelectorAll(".work-box");
const workImgs = document.querySelectorAll(".work-img");
const mainEl = document.querySelector("main");

let lang;

switch (navigator.language.slice(0, 2).toLowerCase()) {
  case "en":
    lang = "en";
    break;
  case "pt":
    lang = "pt-br";
    break;
  case "es":
    lang = "es";
    break;
  case "de":
    lang = "de";
    break;
  default:
    lang = "en";
    break;
}

document.querySelector("#deBtn").addEventListener("click", () => {
  lang = "de";
  defineLangProps(lang);
});

document.querySelector("#enBtn").addEventListener("click", () => {
  lang = "en";
  defineLangProps(lang);
});

document.querySelector("#esBtn").addEventListener("click", () => {
  lang = "es";
  defineLangProps(lang);
});

document.querySelector("#ptBtn").addEventListener("click", () => {
  lang = "pt-br";
  defineLangProps(lang);
});

function defineLangProps(lang) {
  menuBtn = langs[lang].nav.menu;
  closeBtn = langs[lang].nav.close;
  DarkTheme = langs[lang].theme.dark;
  LightTheme = langs[lang].theme.light;
  document.querySelector("#title").textContent = langs[lang].title;
  document.querySelector("#navMenu").textContent = langs[lang].nav.menu;
  document.querySelector("#navHome").textContent = langs[lang].nav.home;
  document.querySelector("#navWork").textContent = langs[lang].nav.work;
  document.querySelector("#navSkills").textContent = langs[lang].nav.skills;
  document.querySelector("#navContact").textContent = langs[lang].nav.contact;
  document.querySelector("#headerTitle").textContent = langs[lang].header.title;
  document.querySelector("#headerSubtitle").textContent = langs[lang].header.subtitle;
  document.querySelector("#headerText").textContent = langs[lang].header.text;
  document.querySelector("#headerBtn1").textContent = langs[lang].header.btn1;
  document.querySelector("#headerBtn2").textContent = langs[lang].header.btn2;
  document.querySelector("#trusted").textContent = langs[lang].trusted;
  document.querySelector("#work").textContent = langs[lang].work.title;
  document.querySelector("#rollerText").textContent = langs[lang].work.companies.roller.text;
  document.querySelector("#rollerLink").textContent = langs[lang].work.companies.roller.link;
  document.querySelector("#lustText").textContent = langs[lang].work.companies.lust.text;
  document.querySelector("#lustLink").textContent = langs[lang].work.companies.lust.link;
  document.querySelector("#itudeText").textContent = langs[lang].work.companies.itude.text;
  document.querySelector("#itudeLink").textContent = langs[lang].work.companies.lust.link;
  document.querySelector("#skills").textContent = langs[lang].skills;
  document.querySelector("#contact").textContent = langs[lang].contact.title;
  document.querySelector("#indicator").textContent = langs[lang].contact.indicator;
  document.querySelector("#contactText").textContent = langs[lang].contact.text;
  document.querySelector("#contactLinkText1").textContent = langs[lang].contact.link.text1;
  document.querySelector("#contactLinkText2").textContent = langs[lang].contact.link.text2;
  document.querySelector("#formName").textContent = langs[lang].contact.form.name;
  document.querySelector("#formEmail").textContent = langs[lang].contact.form.email;
  document.querySelector("#formText").textContent = langs[lang].contact.form.text;
  document.querySelector("#formBtn").textContent = langs[lang].contact.form.btn;
  document.querySelector("#theme").textContent = langs[lang].theme.dark;
}

var menuBtn;
var closeBtn;
var DarkTheme;
var LightTheme;
var langs;

fetch ("./langs.json")
    .then(resp=>resp.json())
    .then(langsArr=> langs = langsArr)
  .then(() => {
    defineLangProps(lang);
  });

const toggleNav = () => {
  nav.classList.toggle("hidden");

  // Prevent screen from scrolling when menu is opened
  document.body.classList.toggle("lock-screen");

  if (nav.classList.contains("hidden")) {
    btnToggleNav.textContent = menuBtn;
  } else {
    // When menu is opened after transition change text respectively
    setTimeout(() => {
      btnToggleNav.textContent = closeBtn;
    }, 475);
  }
};

btnToggleNav.addEventListener("click", toggleNav);

navMenu.addEventListener("click", (e) => {
  if (e.target.localName === "a") {
    toggleNav();
  }
});

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !nav.classList.contains("hidden")) {
    toggleNav();
  }
});

// Animating work instances on scroll

workImgs.forEach((workImg) => workImg.classList.add("transform"));

let observer = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;
    const [textbox, picture] = Array.from(entry.target.children);
    if (entry.isIntersecting) {
      picture.classList.remove("transform");
      Array.from(textbox.children).forEach(
        (el) => (el.style.animationPlayState = "running")
      );
    }
  },
  { threshold: 0.3 }
);

workEls.forEach((workEl) => {
  observer.observe(workEl);
});

// Toggle theme and store user preferred theme for future

const switchThemeEl = document.querySelector('input[type="checkbox"]');
const storedTheme = localStorage.getItem('theme')

switchThemeEl.checked = storedTheme === 'dark' || storedTheme === null

switchThemeEl.addEventListener("click", () => {
  const isChecked = switchThemeEl.checked;

  if (!isChecked) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
    switchThemeEl.checked = false
    document.querySelector("#theme").textContent = LightTheme;
    toggleNav();
  } else {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");
    document.querySelector("#theme").textContent = DarkTheme;
    toggleNav();
  }

});

// Trap the tab when menu is opened

const lastFocusedEl = document.querySelector('a[aria-data="last-focused"]');

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Tab" && document.activeElement === lastFocusedEl) {
    e.preventDefault();
    btnToggleNav.focus();
  }
});

const logosWrappers = document.querySelectorAll(".logo-group");

const sleep = (number) => new Promise((res) => setTimeout(res, number));

logosWrappers.forEach(async (logoWrapper, i) => {
  const logos = Array.from(logoWrapper.children);
  await sleep(1400 * i);
  setInterval(() => {
    let temp = logos[0];
    logos[0] = logos[1];
    logos[1] = logos[2];
    logos[2] = temp;
    logos[0].classList.add("hide", "to-top");
    logos[1].classList.remove("hide", "to-top", "to-bottom");
    logos[2].classList.add("hide", "to-bottom");
  }, 5600);
});