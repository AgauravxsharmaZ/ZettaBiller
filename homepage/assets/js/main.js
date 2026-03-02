// ------ Partner Sign-In Modal & Browser Detection ------
document.addEventListener("DOMContentLoaded", function () {

  const modal = document.getElementById("signInModal");
  const openBtn = document.getElementById("openSignIn");
  const companyInput = document.getElementById("companyInput");
  const continueBtn = document.getElementById("continueBtn");
  const browserNote = document.getElementById("browserNote");

  // ----- OPEN MODAL -----
  if (openBtn && modal) {
    openBtn.addEventListener("click", function (e) {
      e.preventDefault();
      modal.style.display = "flex";
      companyInput.value = "";
      companyInput.focus();
    });
  }

  // ----- CLOSE MODAL -----
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      modal.style.display = "none";
    }
  });

  // ----- CONTINUE -----
  continueBtn.addEventListener("click", function () {
    const tenant = companyInput.value.trim().toLowerCase();
    if (!tenant) return;

    continueBtn.textContent = "Loading…";
    continueBtn.disabled = true;

    setTimeout(function () {
      window.location.href = "https://" + tenant + ".zettabiller.com";
    }, 400);
  });

  // ----- BROWSER DETECTION -----
  if (browserNote) {
    const ua = navigator.userAgent;
    let browser = "Unknown";
    let version = "";

    if (/Chrome\/(\d+)/.test(ua) && !/Edg/.test(ua)) {
      browser = "Chrome";
      version = ua.match(/Chrome\/(\d+)/)[1];
    } else if (/Firefox\/(\d+)/.test(ua)) {
      browser = "Firefox";
      version = ua.match(/Firefox\/(\d+)/)[1];
    } else if (/Safari\/(\d+)/.test(ua) && /Version\/(\d+)/.test(ua)) {
      browser = "Safari";
      version = ua.match(/Version\/(\d+)/)[1];
    } else if (/Edg\/(\d+)/.test(ua)) {
      browser = "Edge";
      version = ua.match(/Edg\/(\d+)/)[1];
    }

    browserNote.textContent =
      "Optimized for modern browsers. You are using " +
      browser +
      (version ? " " + version : "") +
      ".";
  }

});