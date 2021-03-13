let popup = document.querySelector('.popup');
let openPopupBtn = document.querySelector('.button_action_edit');
let closePopupBtn = popup.querySelector('.button_action_close');
let popupOverlay = popup.querySelector('.popup__overlay');

function openPopup() {
  popup.classList.add('popup_opened');
  document.body.style.overflowY = 'hidden';
}

function closePopup() {
  popup.classList.remove('popup_opened');
  document.body.style.overflowY = '';
}

openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
popupOverlay.addEventListener('click', closePopup);

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__item_type_name');
let activityInput = formElement.querySelector('.form__item_type_activity');
let formSubmitBtn = formElement.querySelector('.button_action_save');

function formSubmitHandler (evt) {
  evt.preventDefault();
  let profileName = document.querySelector('.profile__name');
  let profileActivity = document.querySelector('.profile__activity');
  profileName.textContent = `${nameInput.value}`;
  profileActivity.textContent = `${activityInput.value}`;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
