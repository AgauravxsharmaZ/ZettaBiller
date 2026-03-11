/* ========== ZettaBiller signin JS (namespaced) ========== */

(function(){
  const AUTH_HOST = 'auth.zettabiller.com';
  const ROOT_DOMAIN = 'zettabiller.com'; // change if you use a different TLD
  const DASHBOARD_PATH = '/dashboard';   // where you land after signin (stub)
  const UNIVERSAL_signin_PATH = '/signin';

  // Utilities
  const qs = (s, el=document) => el.querySelector(s);
  const getParam = (k) => new URLSearchParams(location.search).get(k) || '';

  // Detect if we are on a tenant subdomain like acme.zettabiller.com
  function getSubdomain(hostname){
    // e.g., acme.zettabiller.com -> ["acme","zettabiller","com"]
    const parts = hostname.split('.');

    // Handle localhost or custom dev hosts quickly
    if (hostname === 'localhost' || /^[\d.]+$/.test(hostname)) return '';

    // Expect at least 3 parts for subdomain.domain.tld
    if (parts.length < 3) return '';

    // Extract subdomain = everything before the last 2 parts (domain + tld)
    const sub = parts.slice(0, -2).join('.');
    return sub;
  }

  function redirectToUniversal(tenant){
    const url = `https://${AUTH_HOST}${UNIVERSAL_signin_PATH}?tenant=${encodeURIComponent(tenant)}&source=subdomain`;
    location.replace(url);
  }

  // If this script is also loaded on tenant roots, auto-redirect to universal signin with tenant param
  (function maybeRedirectFromTenant(){
    const host = location.hostname;
    const sub = getSubdomain(host);

    const isOnAuth = host === AUTH_HOST || host.startsWith(`www.`); // treat www as marketing
    if (!isOnAuth && sub) {
      // Examples: acme.zettabiller.com, demo.zettabiller.com
      redirectToUniversal(sub);
    }
  })();

  // Now, on the universal signin page, wire the UI
  document.addEventListener('DOMContentLoaded', () => {
    const form = qs('#zbsigninForm');
    const submitBtn = qs('#zbSubmit');

    const tenantInput = qs('#tenant');
    const tenantContext = qs('#tenantContext');
    const openPolicyBtn = qs('#openPolicy');
    const policyModal = qs('#policyModal');
    const policyTenantSpan = qs('#policyTenant');
    const policyTenantInline = qs('#policyTenantInline');

    // Prefill tenant from URL ?tenant=acme and lock it
    const tenantFromParam = (getParam('tenant') || '').toLowerCase().replace(/[^a-z0-9-]/g,'-');
    if (tenantFromParam) {
      tenantInput.value = tenantFromParam;
      tenantInput.readOnly = true;
      tenantInput.setAttribute('aria-readonly', 'true');
      tenantContext.textContent = `You’re signing into: ${tenantFromParam}.zettabiller.com`;
      tenantContext.hidden = false;

      // Update policy view
      policyTenantSpan.textContent = tenantFromParam.toUpperCase();
      policyTenantInline.textContent = tenantFromParam.toUpperCase();
    }

    // Policy modal handlers
    function openModal(m){
      m.hidden = false;
    }
    function closeModal(m){
      m.hidden = true;
    }
    if (openPolicyBtn) {
      openPolicyBtn.addEventListener('click', () => openModal(policyModal));
    }
    document.addEventListener('click', (e) => {
      const t = e.target;
      const closeId = t.getAttribute('data-close');
      if (closeId && qs(`#${closeId}`)) {
        closeModal(qs(`#${closeId}`));
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !policyModal.hidden) closeModal(policyModal);
    });

    // Submit handler (stubbed auth)
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const tenant = tenantInput.value.trim().toLowerCase();
      const username = qs('#username').value.trim();
      const password = qs('#password').value;

      if (!tenant || !username || !password) {
        submitBtn.textContent = 'Fill all fields';
        setTimeout(()=> submitBtn.textContent = 'Sign In', 1200);
        return;
      }

      submitBtn.disabled = true;
      const orig = submitBtn.textContent;
      submitBtn.textContent = 'Signing in…';

      try {
        // === Replace this with your real API call ===
        // Example:
        // const res = await fetch(`https://auth.zettabiller.com/api/signin`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ tenant, username, password, remember: qs('#remember').checked })
        // });
        // if (!res.ok) throw new Error('Invalid credentials');
        // const data = await res.json(); // store token/cookie as needed

        await new Promise(r => setTimeout(r, 900)); // fake wait

        // Redirect to the tenant dashboard
        const safeTenant = tenant.replace(/[^a-z0-9-]/g,'-');
        location.href = `https://${safeTenant}.${ROOT_DOMAIN}${DASHBOARD_PATH}`;
      } catch (err) {
        console.error(err);
        submitBtn.textContent = 'Try again';
        setTimeout(()=> {
          submitBtn.textContent = orig;
          submitBtn.disabled = false;
        }, 1200);
        return;
      }
    });
  });
})();