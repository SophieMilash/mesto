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

// создание экземпляров класса PopupWithForm
const editProfilePopup = new PopupWithForm(editPopupConfig.editProfilePopup, {
  formSubmitHandler: (data) => {
    userInfo.setUserInfo({
      nameInput: datd.name,
      activityInput: data.activity
    });
    editProfilePopup.close();
  }
});

const addCardPopup = new PopupWithForm(addPopupConfig.addCardPopup, {
  formSubmitHandler: (data) => {
    const card = renderCard({
      name: data.name,
      link: data.link
    });
    cardList.addItem(card);
    addCardPopup.close();
  }
});

// создание экземпляра класса PopupWithImage
const imagePopup = new PopupWithImage(imagePopupConfig.imagePopup);

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();



function openEditProfilePopup() {
  userInfo.getUserInfo({
    name: editPopupConfig.nameInput,
    activity: editPopupConfig.activityInput
  });

  editProfilePopup.open();
}

function openAddCardPopup() {
  addCardFormValidator.removeInputErrors();
  addCardFormValidator.toggleButtonState();

  addCardPopup.open();
}


editPopupConfig.openEditProfilePopupBtn.addEventListener('click', openEditProfilePopup);
addPopupConfig.openAddCardPopupBtn.addEventListener('click', openAddCardPopup);


