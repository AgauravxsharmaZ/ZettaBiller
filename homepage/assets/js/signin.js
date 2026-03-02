:root {
  --bg: #0b0f1a;
  --bg-soft: #11162a;
  --primary: #4f7cff;
  --text: #e6e9f0;
  --muted: #a3a8c3;
  --card: #151a33;
  --border: #242a4d;
  --radius: 14px;
}

/* Light theme */
body.light {
  --bg: #f6f8ff;
  --bg-soft: #ffffff;
  --text: #0b0f1a;
  --muted: #4a4f6a;
  --card: #ffffff;
  --border: #d6d9ef;
}

/* Reset */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}

body {
  min-height: 100vh;
  color: var(--text);
  line-height: 1.6;
  background:
    radial-gradient(1200px 600px at 10% -10%, rgba(79,124,255,0.10), transparent 55%),
    radial-gradient(900px 500px at 90% 10%, rgba(120,150,255,0.08), transparent 60%),
    linear-gradient(180deg, var(--bg), var(--bg-soft));
}

/* Typography safety */
h1, h2, h3, h4, h5, h6 {
  color: var(--text);
}

p, span {
  color: var(--muted);
}

a {
  color: inherit;
  text-decoration: none;
}

/* Header */
header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 48px;
  background: rgba(11,15,26,0.75);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}

.logo {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

/* Buttons */
.signin-btn,
.theme-toggle {
  padding: 10px 16px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  cursor: pointer;
}

.signin-btn:hover,
.theme-toggle:hover {
  background: rgba(255,255,255,0.04);
}

.primary-btn {
  padding: 14px 26px;
  border-radius: 12px;
  background: var(--primary);
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 12px 40px rgba(79,124,255,0.35);
  transition: transform 0.2s ease;
}

.primary-btn:hover {
  transform: translateY(-1px);
}

.secondary-btn {
  padding: 14px 26px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  cursor: pointer;
}

.secondary-btn:hover {
  background: rgba(255,255,255,0.04);
}

/* Page title */
.page-title {
  padding: 72px 24px 40px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.page-title h1 {
  font-size: 40px;
  margin-bottom: 10px;
}

.page-title::after {
  content: "";
  display: block;
  width: 120px;
  height: 2px;
  margin: 24px auto 0;
  background: linear-gradient(90deg, transparent, var(--primary), transparent);
}

/* Hero */
.hero {
  padding: 120px 48px;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 48px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero h1 {
  font-size: 44px;
  line-height: 1.2;
}

.hero p {
  max-width: 520px;
  margin: 20px 0 32px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.hero-visual {
  height: 340px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background:
    radial-gradient(circle at 20% 20%, rgba(79,124,255,0.35), transparent 45%),
    radial-gradient(circle at 80% 30%, rgba(140,170,255,0.25), transparent 50%);
  box-shadow:
    0 40px 120px rgba(0,0,0,0.6),
    inset 0 0 60px rgba(255,255,255,0.05);
}

/* Footer */
footer {
  padding: 40px 48px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  color: var(--muted);
  position: relative;
  z-index: 1;
}

/* Modal */
.modal {
  position: fixed;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.6);
  z-index: 100;
}

.modal-box {
  background: var(--card);
  padding: 32px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  width: 100%;
  max-width: 420px;
}

.modal-box h3 {
  margin-bottom: 10px;
}

.modal-box p {
  margin-bottom: 16px;
}

.modal-box input {
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
}

.modal-box button {
  width: 100%;
  margin-top: 16px;
  padding: 14px;
  border-radius: 10px;
  background: var(--primary);
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

/* Mobile */
@media (max-width: 900px) {
  header {
    padding: 20px 24px;
  }

  .hero {
    grid-template-columns: 1fr;
    padding: 80px 24px;
    text-align: center;
  }

  .hero p {
    margin-left: auto;
    margin-right: auto;
  }

  footer {
    padding: 32px 24px;
    text-align: center;
  }
}