'use strict';
import fireAlert from './helpers/alert.js';
import capitalize from './helpers/text.helper.js';

const $ = document,
  defaultTitle = 'Dictionary',
  searchBtn = $.querySelector('#search_btn'),
  searchInput = $.querySelector('#search_input'),
  API_URL = import.meta.env.VITE_BASE_URL,
  audio = $.querySelector('#audio'),
  audioBtn = $.querySelector('#audio_btn');

window.addEventListener('load', () => {
  isAudioSrcProvided(audio);
});

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
  event.code === 'Enter' && handleUserRequest();
});

async function handleUserRequest() {
  let word = searchInput.value;
  if (word.trim() === '')
    fireAlert('Error!', 'Empty values ​​are not allowed', 'error');
  else {
    try {
      let response = await sendApiRequest(word.toLowerCase());
      addApiResponse(response);
    } catch (error) {
      fireAlert('404', `"${word}" not found 🤔`, 'error');
    } finally {
      searchInput.value = '';
    }
  }
}

audioBtn.addEventListener('click', function () {
  if (isAudioSrcProvided(audio)) audio.play();
  else fireAlert('Error', 'failed to load the audio file');
});

// api operations
function sendApiRequest(word) {
  return fetch(`${API_URL}/${word}`).then((res) => {
    if (res.status === 404) {
      return new Error(`404 "${word}" not found 🤔`);
    }
    if (res.status === 200) return res.json();
  });
}

function addApiResponse(response) {
  console.log(response);
  $.querySelector('#word').innerHTML = capitalize(response.at(0).word);
  audio.src = response[0].phonetics[0].audio;
}
// ---------------------------------------------

// audio button validations
function isAudioSrcProvided(audioElement) {
  if (audioElement.src === window.location.href) {
    disableActiveBtn(audioBtn);
    return false;
  } else {
    activateAudioBtn(audioBtn);
    return true;
  }
}

function activateAudioBtn(audioBtn) {
  audioBtn.removeAttribute('disabled', '');
  audioBtn.firstElementChild.classList.replace(
    'fa-volume-xmark',
    'fa-volume-high'
  );
}

function disableActiveBtn(audioBtn) {
  audioBtn.setAttribute('disabled', '');
  audioBtn.firstElementChild.classList.replace(
    'fa-volume-high',
    'fa-volume-xmark'
  );
}
// ---------------------------------------------
