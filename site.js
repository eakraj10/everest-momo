const deliveryDialog = document.querySelector('#delivery-dialog');
let previousFocus = null;
document.querySelectorAll('[data-delivery]').forEach(button => button.addEventListener('click', () => {
  previousFocus = button;
  deliveryDialog.showModal();
  document.body.style.overflow = 'hidden';
}));
document.querySelector('[data-close]').addEventListener('click', () => deliveryDialog.close());
deliveryDialog.addEventListener('click', event => {
  if (event.target === deliveryDialog) {
    const rect = deliveryDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) deliveryDialog.close();
  }
});
deliveryDialog.addEventListener('close', () => {
  document.body.style.overflow = '';
  previousFocus?.focus();
});
