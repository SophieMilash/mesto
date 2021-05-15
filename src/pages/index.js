import './index.css';
import { initialCards, validationConfig, editPopupConfig, addPopupConfig, imagePopupConfig } from '../scripts/utils/constants.js';
import { openPopup, closePopup } from '../scripts/utils/utils.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';

// создание экземпляров класса FormValidator
const editProfileFormValidator = new FormValidator(validationConfig, editPopupConfig.editProfileForm);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(validationConfig, addPopupConfig.addCardForm);
addCardFormValidator.enableValidation();


function openEditProfilePopup({ nameInput, activityInput, profileName, profileActivity, editProfilePopup }) {
  editProfileFormValidator.removeInputErrors();
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;

  openPopup(editProfilePopup);
};

function openAddCardPopup({ addCardForm, addCardPopup }) {
  addCardFormValidator.toggleButtonState();
  addCardFormValidator.removeInputErrors();
  addCardForm.reset();

  openPopup(addCardPopup);
}

function openImagePopup(link, name) {
  imagePopupConfig.imagePopupImage.src = link;
  imagePopupConfig.imagePopupImage.alt = name;
  imagePopupConfig.imagePopupCaption.textContent = name;

  openPopup(imagePopupConfig.imagePopup);
};


// внесение изменений в профиль с последующим закрытием попапа (editProfilePopup)
function handleEditProfileFormSubmit({ profileName, nameInput, profileActivity, activityInput, editProfilePopup }, evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  closePopup(editProfilePopup);
}

// рендеринг карточки
// создание экземпляра класса Card
function renderCard(item) {
  const card = new Card(item, openImagePopup, '.card-template');
  const cardElement = card.generateCard();

  document.querySelector('.cards').prepend(cardElement);
}

// вызов карточек из массива
initialCards.forEach(item => {
  renderCard(item);
});

// добавление карточки с последующим закрытием попапа (addCardPopup)
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
editPopupConfig.openEditProfilePopupBtn.addEventListener('click', () => openEditProfilePopup(editPopupConfig));
editPopupConfig.closeEditProfilePopupBtn.addEventListener('click', () => closePopup(editPopupConfig.editProfilePopup));
editPopupConfig.editProfileForm.addEventListener('submit', () => handleEditProfileFormSubmit(editPopupConfig));

// открытие / закрытие addCardPopup
addPopupConfig.openAddCardPopupBtn.addEventListener('click', () => openAddCardPopup(addPopupConfig));
addPopupConfig.closeAddCardPopupBtn.addEventListener('click', () => closePopup(addPopupConfig.addCardPopup));
addPopupConfig.addCardForm.addEventListener('submit', handleAddCardFormSubmit);

// закрытие imagePopup
imagePopupConfig.closeImagePopupBtn.addEventListener('click', () => closePopup(imagePopupConfig.imagePopup));
