import { initialCards } from './initial-сards.js';
import Card from './Card.js';

// попапы
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_add-card');
const imagePopup = document.querySelector('.popup_type_image');

// кнопки открытия/закрытия попапов
const openEditProfilePopupBtn = document.querySelector('.button_action_edit');
const openAddCardPopupBtn = document.querySelector('.button_action_add-card');
const closeEditProfilePopupBtn = editProfilePopup.querySelector('.button_action_close');
const closeAddCardPopupBtn = addCardPopup.querySelector('.button_action_close');
const closeImagePopupBtn = imagePopup.querySelector('.button_action_close');

// данные для форм:
    // editProfileForm
const editProfileForm = document.forms.edit;
const nameInput = editProfileForm.querySelector('.form__input_type_name');
const activityInput = editProfileForm.querySelector('.form__input_type_activity');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
    // addCardForm
const addCardForm = document.forms.add;
const titleInput = addCardForm.querySelector('.form__input_type_title');
const linkInput = addCardForm.querySelector('.form__input_type_link');

// возможность закрытия попапа нажатием на Esc
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// возможность закрытия попапа кликом на оверлей
function closePopupByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// открытие попапа
export function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('click', closePopupByOverlay);
  document.addEventListener('keydown', closePopupByEsc);
}

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}


// внесение изменений в профиль с последующим закрытием попапа (editProfilePopup)
function handleEditProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  closePopup(editProfilePopup);
}

// рендеринг карточки
// создание экземпляра класса
function renderCard (item) {
  const card = new Card(item, '.card-template');
  const cardElement = card.generateCard();

  document.querySelector('.cards').prepend(cardElement);
}

// вызов карточек из массива
initialCards.forEach(item => {
  renderCard(item);
});

// добавление карточки с последующим закрытием попапа (addCardPopup)
  // поля ввода обнуляются после закрытия
  // кнопка отправки становится неактивной
function handleAddCardFormSubmit (evt) {
  evt.preventDefault();

  const inputList = Array.from(addCardForm.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = addCardForm.querySelector(validationConfig.submitButtonSelector);

  renderCard({
    name: titleInput.value,
    link: linkInput.value
  });
  addCardForm.reset();
  toggleButtonState(inputList, buttonElement);
  closePopup(addCardPopup);
}

// удаление сообщений об ошибках
function removeInputErrors(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));

  inputList.forEach(item => {
    if (!item.validity.valid) {
      hideInputError(formElement, item);
    }
  });
}

// открытие / закрытие editProfilePopup
  // поля заполняются значениями со страницы
openEditProfilePopupBtn.addEventListener('click', () => {
  openPopup(editProfilePopup);
  removeInputErrors(editProfileForm);
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
});
closeEditProfilePopupBtn.addEventListener('click', () => closePopup(editProfilePopup));
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

// открытие / закрытие addCardPopup
openAddCardPopupBtn.addEventListener('click', () => {
  openPopup(addCardPopup);
  removeInputErrors(addCardForm);
  addCardForm.reset();
});
closeAddCardPopupBtn.addEventListener('click', () => closePopup(addCardPopup));
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

// закрытие imagePopup
closeImagePopupBtn.addEventListener('click', () => closePopup(imagePopup));
