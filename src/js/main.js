'use strict';

const $ = document;
const defaultTitle = 'Dictionary';
const searchBtn = $.querySelector('#search_btn');
const searchInput = $.querySelector('#search_input');

window.addEventListener('load',()=>{
    setTimeout(() => {
        searchInput.focus();
    }, 2000);
})

// dynamic tab change
window.addEventListener('blur', () => {
  $.title = 'come back 😥';
  setTimeout(() => {
    $.title = defaultTitle;
  }, 3000);
});
window.addEventListener('focus', () => {
  $.title = defaultTitle;
});
// ----------------------

searchBtn.addEventListener('click', handleUserRequest);
searchInput.addEventListener('keypress', (event) => {
  event.code === 'Enter' &&  handleUserRequest();
});

function handleUserRequest() {
  if (searchInput.value.trim() === '') {
    Swal.fire({
      title: 'Error!',
      text: 'Empty values ​​are not allowed',
      icon: 'error',
      confirmButtonText: 'Got it',
    });
  } else {
    
  }
  searchInput.value = '';
}
