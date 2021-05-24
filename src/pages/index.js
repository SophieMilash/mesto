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

let user = {};
let userId = {};

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, cards]) => {
    user = userInfo.data;
    cardList.renderItems(cards);
  })
  .catch((err) => console.log(err));


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

// cardList.renderItems();

const userInfo = new UserInfo({
  name: editPopupConfig.profileName,
  activity: editPopupConfig.profileActivity
});

const editProfilePopup = new PopupWithForm(editPopupConfig.editProfilePopup, {
  formSubmitHandler: (data) => {
    userInfo.setUserInfo(data);

    api.setUserInfo({
      name: data.profileName,
      activity: data.profileActivity
    })
      .then(() => editProfilePopup.close())
      .catch((err) => console.log(err));
  }
});

const addCardPopup = new PopupWithForm(addPopupConfig.addCardPopup, {
  formSubmitHandler: (data) => {
    api.createCard({
      name: data.title,
      link: data.link
    })
      .then((result) => {
        cardList.addItem(createCard({...result.data}));
      })
      .catch((err) => console.log(err));

    // const card = renderCard({
    //   name: data.title,
    //   link: data.link
    // });
    // cardList.addItem(card);
    addCardPopup.close();
  }
});

const imagePopup = new PopupWithImage(imagePopupConfig.imagePopup);

const deletionConfirmPopup = new PopupWithConfirmation(deletionConfirmConfig.deletionConfirmPopup, deletionConfirmConfig.deletionConfirmBtn, {
  actionFn: (data) => {
    api.deleteCard(data)
        .then(() => {
          evtCard.target.closest('.card').remove();
          deletionConfirmPopup.close();
        })
        .catch((err) => console.log(err));
  }
});


function renderCard(item) {
  const card = new Card({
    name: item.name,
    link: item.link,
    _id: item._id
  }, {
    handleCardClick: () => {
      imagePopup.open({
        name: item.name,
        link: item.link
      });
    }
  }, {
    /* handleCardDelete: () => {
      deletionConfirmPopup.open();
    } */
    handleCardDelete: () => {
      deletionConfirmPopup.open(() => {
        api.deleteCard(card.getId())
          .then(() => card.handleDeleteCard())
          .catch((err) => console.log(err));
      });
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
