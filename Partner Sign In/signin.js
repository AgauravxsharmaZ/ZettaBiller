const btn = document.getElementById("continueBtn");
const input = document.getElementById("workspaceInput");

btn.addEventListener("click", () => {
  const workspace = input.value.trim().toLowerCase();

  if (!workspace) {
    alert("Please enter your company workspace");
    return;
  }

  // future: validate workspace via API here

  // redirect to tenant workspace
  const targetUrl = `https://${workspace}.zettabiller.com`;
  window.location.href = targetUrl;
});