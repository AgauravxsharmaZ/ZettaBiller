// ------ Partner Sign-In Modal + Browser + IP Detection (FINAL) ------

document.addEventListener("DOMContentLoaded", function () {

  const modal = document.getElementById("signInModal");
  const openBtn = document.getElementById("openSignIn");
  const companyInput = document.getElementById("companyInput");
  const continueBtn = document.getElementById("continueBtn");
  const browserNote = document.getElementById("browserNote");

  /* ---------------- OPEN / CLOSE MODAL ---------------- */

  if (openBtn && modal) {
    openBtn.addEventListener("click", e => {
      e.preventDefault();
      modal.style.display = "flex";
      companyInput.value = "";
      companyInput.focus();
    });
  }

  if (modal) {
    modal.addEventListener("click", e => {
      if (e.target === modal) modal.style.display = "none";
    });
  }

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal) modal.style.display = "none";
  });

  /* ---------------- CONTINUE ---------------- */

  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      const tenant = companyInput.value.trim().toLowerCase();
      if (!tenant) return;

      continueBtn.textContent = "Loading…";
      continueBtn.disabled = true;

      setTimeout(() => {
        window.location.href = "https://" + tenant + ".zettabiller.com";
      }, 400);
    });
  }

  /* ---------------- BROWSER DETECTION ---------------- */

  function detectBrowser() {
    const ua = navigator.userAgent;
    let name = "Browser";
    let version = "";

    if (/Edg\/(\d+)/.test(ua)) {
      name = "Microsoft Edge";
      version = ua.match(/Edg\/(\d+)/)[1];
    } else if (/Chrome\/(\d+)/.test(ua)) {
      name = "Chrome";
      version = ua.match(/Chrome\/(\d+)/)[1];
    } else if (/Firefox\/(\d+)/.test(ua)) {
      name = "Firefox";
      version = ua.match(/Firefox\/(\d+)/)[1];
    } else if (/Safari\/(\d+)/.test(ua) && /Version\/(\d+)/.test(ua)) {
      name = "Safari";
      version = ua.match(/Version\/(\d+)/)[1];
    }

    return { name, version };
  }

  /* ---------------- IP DETECTION (SAFE) ---------------- */

  function detectIP() {
    return fetch("https://api.ipify.org?format=json")
      .then(r => r.json())
      .then(d => d.ip)
      .catch(() => null);
  }

  /* ---------------- RENDER NOTE ---------------- */

  function renderNote(browser, ip) {
    if (!browserNote) return;

    browserNote.className = "browser-note"; // reset
    browserNote.classList.add(browserClass(browser.name));

    browserNote.textContent =
      "You are using " +
      browser.name +
      " " +
      browser.version +
      (ip ? " · IP " + ip : "");
  }

  function browserClass(name) {
    if (name.includes("Edge")) return "browser-edge";
    if (name === "Chrome") return "browser-chrome";
    if (name === "Firefox") return "browser-firefox";
    if (name === "Safari") return "browser-safari";
    return "browser-generic";
  }

  /* ---------------- INIT ---------------- */

  if (browserNote) {
    const browser = detectBrowser();

    detectIP().then(ip => {
      renderNote(browser, ip);
    });
  }

});
const modal = document.getElementById("demoModal");
const openBtn = document.getElementById("openDemo");
const closeBtn = document.getElementById("closeDemo");

openBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// =======================================
// REQUEST DEMO MODAL LOGIC
// =======================================
(function(){

const modal = document.getElementById("demoModal")
const openBtn = document.getElementById("openDemo")
const closeBtn = document.getElementById("closeDemo")

const form = document.getElementById("demoForm")
const success = document.getElementById("demoSuccess")
const refText = document.getElementById("refText")

if(openBtn){

openBtn.onclick = () => {
modal.style.display = "flex"
}

}

if(closeBtn){

closeBtn.onclick = () => {
modal.style.display = "none"
}

}

window.onclick = function(e){

if(e.target === modal){
modal.style.display = "none"
}

}

form.addEventListener("submit", function(e){

e.preventDefault()

const ref = "ZB-" + Math.floor(100000 + Math.random()*900000)

form.style.display = "none"

success.style.display = "block"

refText.innerText =
"Please check your mailbox for your reference code: " + ref

})

})();