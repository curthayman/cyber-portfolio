// Make the hireBanner accessible and open the contact modal like the Contact Me button
document.addEventListener('DOMContentLoaded', function() {
  var hireBanner = document.getElementById('hireBanner');
  var contactModal = document.getElementById('contactModal');
  var contactModalClose = document.getElementById('contactModalClose');
  if (hireBanner && contactModal && contactModalClose) {
    var openModal = function() {
      contactModal.style.display = 'block';
      contactModalClose.focus();
    };
    hireBanner.addEventListener('click', openModal);
    hireBanner.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal();
      }
    });
  }
});
