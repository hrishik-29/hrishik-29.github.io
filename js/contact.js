/* ===== Contact Form with Web3Forms ===== */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-message');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const formData = new FormData(form);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        formMsg.textContent = '✅ Message sent successfully!';
        formMsg.style.color = '#a5b4fc';
        form.reset();
      } else {
        formMsg.textContent = '❌ Something went wrong. Please try again.';
        formMsg.style.color = '#ef4444';
      }
    } catch (err) {
      formMsg.textContent = '❌ Network error. Please try again.';
      formMsg.style.color = '#ef4444';
    }
    btn.textContent = original;
    btn.disabled = false;
    setTimeout(() => { formMsg.textContent = ''; }, 5000);
  });
});
