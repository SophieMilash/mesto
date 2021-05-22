import './index.css';
import { initialCards, templateConfig, validationConfig, editPopupConfig, addPopupConfig, imagePopupConfig, deletionConfirmConfig } from '../scripts/utils/constants.js';
import Api from '../scripts/components/Api.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: 'c72c9866-e9ca-4f90-b055-72d87299b8be',
    'Content-Type': 'application/json'
  }
});

/* const cards = fetch('')
  .then(result => result.json())
  .then(data => console.log(data))
  .catch(e => console.log('e:', e)) */


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
}, templateConfig.cardsContainerSelector);

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

const deletionConfirmPopup = new PopupWithConfirmation(deletionConfirmConfig.deletionConfirmPopup, deletionConfirmConfig.deletionConfirmBtn);


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
  }, {
    handleCardDelete: () => {
      deletionConfirmPopup.open();
    }
  }, templateConfig.cardSelector);
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
deletionConfirmPopup.setEventListeners();
