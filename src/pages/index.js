import './index.css';
import { initialCards, validationConfig, editPopupConfig, addPopupConfig, imagePopupConfig } from '../scripts/utils/constants.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';

// создание экземпляров класса FormValidator
const editProfileFormValidator = new FormValidator(validationConfig, editPopupConfig.editProfileForm);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(validationConfig, addPopupConfig.addCardForm);
addCardFormValidator.enableValidation();


// рендеринг карточки
// создание экземпляра класса Card
function renderCard(item) {
  const card = new Card({
      name: item.name,
      link: item.link
    }, {
    handleCardClick: (item) => {
      imagePopup.open({
        name: item.name,
        link: item.link
      });
    }
  }, '.card-template');
  const cardElement = card.generateCard();

  cardList.addItem(cardElement);
  return cardElement;
}

// создание экземпляра класса Section
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = renderCard(item);

    cardList.addItem(card);
  }
}, '.cards');

cardList.renderItems();

// создание экземпляра класса UserInfo
const userInfo = new UserInfo({
  name: editPopupConfig.profileName,
  activity: editPopupConfig.profileActivity
});

// создание экземпляра класса PopupWithImage
const imagePopup = new PopupWithImage(imagePopupConfig.imagePopup);
imagePopup.setEventListeners();

// создание экземпляров класса PopupWithForm
const editProfilePopup = new PopupWithForm(editPopupConfig.editProfilePopup, handleEditProfileFormSubmit(editPopupConfig));
const addCardPopup = new PopupWithForm(addPopupConfig.addCardPopup, handleAddCardFormSubmit(addPopupConfig));




function handleEditProfileFormSubmit({ nameInput, activityInput }) {
  userInfo.setUserInfo(editPopupConfig);
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;

}

function handleAddCardFormSubmit({ titleInput, linkInput }) {
  //evt.preventDefault();

  renderCard({
    name: titleInput.value,
    link: linkInput.value
  });
  //addCardForm.reset();
  //closePopup(addCardPopup);
}

// открытие / закрытие editProfilePopup
editPopupConfig.openEditProfilePopupBtn.addEventListener('click', () => openEditProfilePopup(editPopupConfig));
editPopupConfig.closeEditProfilePopupBtn.addEventListener('click', () => closePopup(editPopupConfig.editProfilePopup));
editPopupConfig.editProfileForm.addEventListener('submit', () => handleEditProfileFormSubmit(editPopupConfig));

// открытие / закрытие addCardPopup
addPopupConfig.openAddCardPopupBtn.addEventListener('click', () => openAddCardPopup(addPopupConfig));
addPopupConfig.closeAddCardPopupBtn.addEventListener('click', () => closePopup(addPopupConfig.addCardPopup));
addPopupConfig.addCardForm.addEventListener('submit', () => handleAddCardFormSubmit(addPopupConfig));

