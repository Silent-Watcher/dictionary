function fireAlert(title = 'title', text = 'modal text', type = 'success') {
  let validTypes = ['error', 'success', 'warning', 'info', 'questions'];
  if (!validTypes.includes(type)) return new Error('invalid alert type ! 🤔');
  else Swal.fire({ title, text, icon: type, confirmButtonText: 'Got it' });
}

export default fireAlert;
