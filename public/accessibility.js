// Accessibility & Unobtrusive JS for modal and buttons
document.addEventListener('DOMContentLoaded', function() {
  // Contact Modal
  var contactBtn = document.getElementById('contactBtn');
  var contactModal = document.getElementById('contactModal');
  var contactModalClose = document.getElementById('contactModalClose');
  if (contactBtn && contactModal && contactModalClose) {
    contactBtn.addEventListener('click', function() {
      contactModal.style.display = 'block';
      contactModalClose.focus();
    });
    contactModalClose.addEventListener('click', function() {
      contactModal.style.display = 'none';
      contactBtn.focus();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && contactModal.style.display === 'block') {
        contactModal.style.display = 'none';
        contactBtn.focus();
      }
    });
  }
  // Cert Modal
  var certModal = document.getElementById('certModal');
  var certModalClose = document.getElementById('certModalClose');
  var modalImage = document.getElementById('modalImage');
  var badges = document.querySelectorAll('.badge img');
  badges.forEach(function(img) {
    img.addEventListener('click', function() {
      certModal.style.display = 'block';
      modalImage.src = img.src;
      modalImage.alt = img.alt + ' enlarged preview';
      certModalClose.focus();
    });
  });
  if (certModalClose) {
    certModalClose.addEventListener('click', function() {
      certModal.style.display = 'none';
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && certModal.style.display === 'block') {
        certModal.style.display = 'none';
      }
    });
  }
  // Cert scroll buttons
  var scrollLeftBtn = document.getElementById('scrollLeftBtn');
  var scrollRightBtn = document.getElementById('scrollRightBtn');
  var certScroll = document.getElementById('certScroll');
  if (scrollLeftBtn && certScroll) {
    scrollLeftBtn.addEventListener('click', function() {
      certScroll.scrollBy({ left: -300, behavior: 'smooth' });
    });
  }
  if (scrollRightBtn && certScroll) {
    scrollRightBtn.addEventListener('click', function() {
      certScroll.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }
  // Copy buttons for commands
  var copyBtns = document.querySelectorAll('.copy-btn[data-copy]');
  copyBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var lineId = btn.getAttribute('data-copy');
      var line = document.getElementById(lineId);
      if (line) {
        navigator.clipboard.writeText(line.textContent.trim());
        btn.textContent = 'Copied!';
        setTimeout(function() { btn.textContent = 'Copy'; }, 1200);
      }
    });
  });
});
