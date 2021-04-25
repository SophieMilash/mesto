import { initialCards, validationConfig, editPopupConfig, addPopupConfig, imagePopupConfig } from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// создание экземпляров класса FormValidator
const editProfileFormValidator = new FormValidator(validationConfig, editPopupConfig.editProfileForm);
const addCardFormValidator = new FormValidator(validationConfig, addPopupConfig.addCardForm);

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
function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('click', closePopupByOverlay);
  document.addEventListener('keydown', closePopupByEsc);
}

// открытие попапа imagePopup
function handleCardClick(link, name) {
  imagePopupConfig.imagePopupImage.src = link;
  imagePopupConfig.imagePopupImage.alt = name;
  imagePopupConfig.imagePopupCaption.textContent = name;

  openPopup(imagePopupConfig.imagePopup);
};

// открытие попапа imagePopup
function handleCardClick(link, name) {
  imagePopupConfig.imagePopupImage.src = link;
  imagePopupConfig.imagePopupImage.alt = name;
  imagePopupConfig.imagePopupCaption.textContent = name;

  openPopup(imagePopupConfig.imagePopup);
};


// закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

// внесение изменений в профиль с последующим закрытием попапа (editProfilePopup)
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  editPopupConfig.profileName.textContent = editPopupConfig.nameInput.value;
  editPopupConfig.profileActivity.textContent = editPopupConfig.activityInput.value;
  closePopup(editPopupConfig.editProfilePopup);
}

// рендеринг карточки
// создание экземпляра класса Card
function renderCard(item) {
  const card = new Card(item, handleCardClick, '.card-template');
  const cardElement = card.generateCard();

  document.querySelector('.cards').prepend(cardElement);
}

// вызов карточек из массива
initialCards.forEach(item => {
  renderCard(item);
});

// добавление карточки с последующим закрытием попапа (addCardPopup)
  // поля ввода обнуляются после закрытия
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  renderCard({
    name: addPopupConfig.titleInput.value,
    link: addPopupConfig.linkInput.value
  });
  addPopupConfig.addCardForm.reset();
  closePopup(addPopupConfig.addCardPopup);
}

// открытие / закрытие editProfilePopup
  // поля заполняются значениями со страницы
  editPopupConfig.openEditProfilePopupBtn.addEventListener('click', () => {
  openPopup(editPopupConfig.editProfilePopup);
  editProfileFormValidator.enableValidation();
  editProfileFormValidator.removeInputErrors();
  editPopupConfig.nameInput.value = editPopupConfig.profileName.textContent;
  editPopupConfig.activityInput.value = editPopupConfig.profileActivity.textContent;
});
editPopupConfig.closeEditProfilePopupBtn.addEventListener('click', () => closePopup(editPopupConfig.editProfilePopup));
editPopupConfig.editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

// открытие / закрытие addCardPopup
addPopupConfig.openAddCardPopupBtn.addEventListener('click', () => {
  openPopup(addPopupConfig.addCardPopup);
  addCardFormValidator.enableValidation();
  addCardFormValidator.removeInputErrors();
  addPopupConfig.addCardForm.reset();
});
addPopupConfig.closeAddCardPopupBtn.addEventListener('click', () => closePopup(addPopupConfig.addCardPopup));
addPopupConfig.addCardForm.addEventListener('submit', handleAddCardFormSubmit);

// закрытие imagePopup
imagePopupConfig.closeImagePopupBtn.addEventListener('click', () => closePopup(imagePopupConfig.imagePopup));
