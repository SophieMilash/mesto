import './index.css';
import { templateConfig, validationConfig, editPopupConfig, avatarEditPopupConfig, addPopupConfig, imagePopupConfig, deletionConfirmConfig } from '../scripts/utils/constants.js';
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

let userId = {};
const userInfo = new UserInfo(editPopupConfig.profileName, editPopupConfig.profileActivity, avatarEditPopupConfig.profileAvatar);


api.getUserInfo()
  .then((data) => {
    userId = data._id;
    userInfo.setUserInfo(data);
  })
    .catch((err) => console.log(err));

/* function createCardList(cards) {
  const cardList = new Section({
    items: cards,
    renderer: (item) => {
      const card = renderCard(item);
      cardList.addItem(card);
    }
  }, templateConfig.cardsContainerSelector);
} */

api.getInitialCards()
  .then((data) => {
    const cardList = new Section({
      items: data,
      renderer: (item) => {
        const card = renderCard(item);
        cardList.addItem(card);
      }
    }, templateConfig.cardsContainerSelector);
    cardList.renderItems();
  })
    .catch((err) => console.log(err));


const editProfileFormValidator = new FormValidator(validationConfig, editPopupConfig.editProfileForm);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(validationConfig, addPopupConfig.addCardForm);
addCardFormValidator.enableValidation();
const avatarEditFormValidator = new FormValidator(validationConfig, avatarEditPopupConfig.avatarEditForm);
avatarEditFormValidator.enableValidation();


const editProfilePopup = new PopupWithForm(editPopupConfig.editProfilePopup, {
  formSubmitHandler: (data) => {
    api.setUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .then(() => {
        editProfilePopup.close();
      })
      .catch((err) => console.log(err));
  }
});

const avatarEditPopup = new PopupWithForm(avatarEditPopupConfig.avatarEditPopup, {
  formSubmitHandler: (data) => {
    api.setAvatar(data.link)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .then(() => {
        editProfilePopup.close();
      })
      .catch((err) => console.log(err));
  }
});

const addCardPopup = new PopupWithForm(addPopupConfig.addCardPopup, {
  formSubmitHandler: (data) => {
    api.createCard(data.title, data.link)
      .then((result) => {

        // TODO
        const cardList = new Section({
          items: data,
          renderer: (item) => {
            const card = renderCard(item);
            cardList.addItem(card);
          }
        }, templateConfig.cardsContainerSelector);

        const card = renderCard(result);
        cardList.addItem(card);
      })
      .finally(() => {
        addCardPopup.close();
      })
      .catch((err) => console.log(err));

  }
});

const imagePopup = new PopupWithImage(imagePopupConfig.imagePopup);

const deletionConfirmPopup = new PopupWithConfirmation(deletionConfirmConfig.deletionConfirmPopup, deletionConfirmConfig.deletionConfirmBtn, {
  handleCardDelete: (card) => {
    api.deleteCard(card.getCardId())
        .then(() => {
          card.handleDeleteCard();
        })
        .finally(() => {
          deletionConfirmPopup.close();
        })
        .catch((err) => console.log(err));
  }
});


function renderCard(item) {
  const card = new Card({
    name: item.name,
    link: item.link,
    owner: item.owner,
    _id: item._id
  }, userId, {
    handleCardClick: () => {
      imagePopup.open({
        name: item.name,
        link: item.link
      });
    },
    handleCardDelete: () => {
      deletionConfirmPopup.open(card);
    }
  }, templateConfig.cardSelector);
  const cardElement = card.generateCard();

  return cardElement;
}

function openEditProfilePopup({ nameInput, activityInput }) {
  editProfileFormValidator.removeInputErrors();

  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  activityInput.value = userData.about;

  editProfilePopup.open();
}

function openAvatarEditPopup({ avatarInput }) {
  avatarEditFormValidator.removeInputErrors();

  const userData = userInfo.getUserInfo();
  avatarInput.value = userData.link;

  avatarEditPopup.open();
}

function openAddCardPopup() {
  addCardFormValidator.removeInputErrors();
  addCardFormValidator.toggleButtonState();

  addCardPopup.open();
}


editPopupConfig.openEditProfilePopupBtn.addEventListener('click', () => openEditProfilePopup(editPopupConfig));
avatarEditPopupConfig.openAvatarEditPopupBtn.addEventListener('click', () => openAvatarEditPopup(avatarEditPopupConfig));
addPopupConfig.openAddCardPopupBtn.addEventListener('click', openAddCardPopup);

editProfilePopup.setEventListeners();
avatarEditPopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();
deletionConfirmPopup.setEventListeners();
