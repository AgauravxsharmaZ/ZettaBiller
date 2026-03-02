// -----------------------------
// THEME TOGGLE (DAY / NIGHT)
// -----------------------------

const themeToggle = document.getElementById("themeToggle")

if (themeToggle) {
  const savedTheme = localStorage.getItem("theme")

  if (savedTheme === "light") {
    document.body.classList.add("light")
    themeToggle.textContent = "☀️"
  } else {
    themeToggle.textContent = "🌙"
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light")

    const isLight = document.body.classList.contains("light")
    themeToggle.textContent = isLight ? "☀️" : "🌙"
    localStorage.setItem("theme", isLight ? "light" : "dark")
  })
}

// -----------------------------
// SIGN IN MODAL
// -----------------------------

const modal = document.getElementById("signInModal")
const openButtons = document.querySelectorAll("#openSignIn, #openSignInAlt")
const companyInput = document.getElementById("companyInput")
const continueBtn = document.getElementById("continueBtn")

openButtons.forEach(btn => {
  if (!btn) return
  btn.addEventListener("click", () => {
    modal.style.display = "flex"
    companyInput.focus()
  })
})

if (modal) {
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none"
    }
  })
}

if (continueBtn) {
  continueBtn.addEventListener("click", () => {
    const tenant = companyInput.value.trim().toLowerCase()
    if (!tenant) return

    continueBtn.textContent = "Loading..."
    continueBtn.disabled = true

    setTimeout(() => {
      window.location.href = "https://" + tenant + ".zettabiller.com"
    }, 500)
  })
}