// Small enhancements only (keeps it "simple" and easy to draw / rebuild)
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.querySelector(".nav__toggle");
const nav = document.getElementById("nav");
if (toggle && nav){
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  // Close menu when clicking a link (mobile)
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

// Copy email button
const copyBtn = document.getElementById("copyBtn");
const emailText = document.getElementById("emailText");
const copyStatus = document.getElementById("copyStatus");

if (copyBtn && emailText){
  copyBtn.addEventListener("click", async () => {
    try{
      await navigator.clipboard.writeText(emailText.textContent.trim());
      if (copyStatus) copyStatus.textContent = "Copied!";
      setTimeout(() => { if (copyStatus) copyStatus.textContent = ""; }, 1400);
    }catch(e){
      if (copyStatus) copyStatus.textContent = "Copy failed — you can select and copy it manually.";
    }
  });
}

// Mailto contact form (free, no backend)
const form = document.getElementById("contactForm");
const mailto = document.getElementById("mailtoLink");

if (form && mailto){
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = encodeURIComponent(data.get("name") || "");
    const email = encodeURIComponent(data.get("email") || "");
    const msg = encodeURIComponent(data.get("message") || "");
    const subject = encodeURIComponent("Website Project Inquiry");
    const body =
      `Name: ${name}%0D%0A` +
      `Email: ${email}%0D%0A%0D%0A` +
      `${msg}`;

    const base = mailto.getAttribute("href").split("?")[0];
    window.location.href = `${base}?subject=${subject}&body=${body}`;
  });
}
