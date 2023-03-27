'use strict';
import fireAlert from './helpers/alert.js';
import capitalize from './helpers/text.helper.js';

const $ = document,
  searchBtn = $.querySelector('#search_btn'),
  searchInput = $.querySelector('#search_input'),
  API_URL = import.meta.env.VITE_BASE_URL,
  audio = $.querySelector('#audio');


const wordTemplate = $.querySelector('#word_template');
const api_response_wrapper = $.querySelector('#api_response_wrapper');


// dynamic tab change
window.addEventListener('blur', () => {
  $.title = 'come back 😥';
});
window.addEventListener('focus', () => {
  const defaultTitle = 'Dictionary';
  $.title = defaultTitle;
});
// ----------------------

searchBtn.addEventListener('click', handleUserRequest);
searchInput.addEventListener('keypress', (event) => {
  event.code === 'Enter' && handleUserRequest();
});

async function handleUserRequest() {
  const queryProcessText = $.querySelector('#queryProcessText');
  api_response_wrapper.innerHTML = null;
  let word = searchInput.value;
  queryProcessText.innerHTML = `searching the meaning of ${word}`
  if (word.trim() === '')
    fireAlert('Error!', 'Empty values ​​are not allowed', 'error');
  else {
    try {
      let response = await sendApiRequest(word.toLowerCase());
      queryProcessText.innerHTML = null;
      addApiResponse(response);
    } catch (error) {
      fireAlert('404', `"${word}" not found 🤔`, 'error');
    } finally {
      searchInput.value = '';
    }
  }
}


// api operations
function sendApiRequest(word) {
  return fetch(`${API_URL}/${word}`).then((res) => {
    if (res.status === 200) return res.json();
    else if (res.status === 404) {
      return new Error(`404 "${word}" not found 🤔`);
    }
  });
}

function addApiResponse(response) {
 
  api_response_wrapper.appendChild(wordTemplate.content.cloneNode(true));
  $.querySelector('#word').innerHTML = capitalize(response.at(0).word);
  audio.src = response[0].phonetics[0].audio;

  let fragment = $.createDocumentFragment();

  let meanings = $.createElement('section');
  meanings.className = "meanings row col-12 mt-4";

  response[0].meanings.forEach( meaning => {
    let card = `
    <div class="card col-12 col-lg-6">
      <h5 class="partOfSpeech card-header">${meaning.partOfSpeech || 'not found'}</h5>
      <div class="card-body">
        <div class="definitions">
          <h5 class="definition card-title">${meaning.definitions[0].definition || 'not found'}</h5>
          <p class="example card-text ms-3">${meaning.definitions[0]?.example ?? 'not found'}</p>
          <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">synonyms</div>
                <p class="synonyms ms-3">${meaning.synonyms.length ?  meaning.synonyms.join(', ') : '..'}</p>
              </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-boldx">antonyms</div>
                <p class="antonyms ms-3">${meaning.antonyms.length ?  meaning.antonyms.join(', ') : '..'}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>`;
    meanings.insertAdjacentHTML('beforeend',card);
  })
    fragment.appendChild(meanings);
    api_response_wrapper.appendChild(fragment);
}
// ---------------------------------------------

// audio button validations
function isAudioSrcProvided(audioElement , audioBtn) {
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

function playAudioBtn(event){
  if (isAudioSrcProvided(audio , event.target.parentElement)) audio.play();
  else fireAlert('Error', 'failed to load the audio file');
}
// ---------------------------------------------

window.playAudioBtn = playAudioBtn;

// cursor
new kursor({
  type: 1,
  removeDefaultCursor: true,
  color: '#da2a1e'
});
