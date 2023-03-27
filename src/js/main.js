'use strict';

const $ = document;
const defaultTitle = 'Dictionary';

// dynamic tab change
window.addEventListener('blur', () => {
  $.title = 'come back 😥';
  setTimeout(() => {$.title = defaultTitle}, 3000);
});
window.addEventListener('focus', () => {
  $.title = defaultTitle;
});
// ----------------------

