import './index.css';
import { initialCards, validationConfig, editPopupConfig, addPopupConfig, imagePopupConfig } from '../scripts/utils/constants.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';

const editProfileFormValidator = new FormValidator(validationConfig, editPopupConfig.editProfileForm);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(validationConfig, addPopupConfig.addCardForm);
addCardFormValidator.enableValidation();

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = renderCard(item);

    cardList.addItem(card);
  }
}, '.cards');

cardList.renderItems();

const userInfo = new UserInfo({
  name: editPopupConfig.profileName,
  activity: editPopupConfig.profileActivity
});

const editProfilePopup = new PopupWithForm(editPopupConfig.editProfilePopup, {
  formSubmitHandler: (data) => {
    userInfo.setUserInfo(data);
    editProfilePopup.close();
  }
});

const addCardPopup = new PopupWithForm(addPopupConfig.addCardPopup, {
  formSubmitHandler: (data) => {
    const card = renderCard({
      name: data.title,
      link: data.link
    });
    cardList.addItem(card);
    addCardPopup.close();
  }
});

const imagePopup = new PopupWithImage(imagePopupConfig.imagePopup);


function renderCard(item) {
  const card = new Card({
    name: item.name,
    link: item.link
  }, {
    handleCardClick: () => {
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

function openEditProfilePopup({ nameInput, activityInput }) {
  editProfileFormValidator.removeInputErrors();

  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  activityInput.value = userData.activity;

  editProfilePopup.open();
}

function openAddCardPopup() {
  addCardFormValidator.removeInputErrors();
  addCardFormValidator.toggleButtonState();

  addCardPopup.open();
}


editPopupConfig.openEditProfilePopupBtn.addEventListener('click', () => openEditProfilePopup(editPopupConfig));
addPopupConfig.openAddCardPopupBtn.addEventListener('click', openAddCardPopup);
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();
