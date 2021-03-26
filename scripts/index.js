let popup = document.querySelector('.popup');
let openPopupBtn = document.querySelector('.button_action_edit');
let closePopupBtn = popup.querySelector('.button_action_close');
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__item_type_name');
let activityInput = formElement.querySelector('.form__item_type_activity');
let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity');

// по клику открывается попап
// поля заполняются значениями со страницы
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
}

// по клику на крестик закрывается попап без сохранения
function closePopup() {
  popup.classList.remove('popup_opened');
}

// внесение изменений в данные на странице с последующим закрытием попапа
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  closePopup();
}

openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
