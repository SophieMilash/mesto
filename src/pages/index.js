import './index.css';
import { templateConfig, validationConfig, editPopupConfig, avatarEditPopupConfig, addPopupConfig, imagePopupConfig, deletionConfirmConfig, loaderConfig } from '../scripts/utils/constants.js';
import Api from '../scripts/components/Api.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';


let userId = {};
const userInfo = new UserInfo(editPopupConfig.profileName, editPopupConfig.profileActivity, avatarEditPopupConfig.profileAvatar);


/* -получение данных с сервера- */

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: 'c72c9866-e9ca-4f90-b055-72d87299b8be',
    'Content-Type': 'application/json'
  }
});

renderLoading(true);

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardList.renderItems(cards);
  })
  .catch((err) => console.log(err))
  .finally(() => renderLoading(false));


/* -валидация- */

const editProfileFormValidator = new FormValidator(validationConfig, editPopupConfig.editProfileForm);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(validationConfig, addPopupConfig.addCardForm);
addCardFormValidator.enableValidation();
const avatarEditFormValidator = new FormValidator(validationConfig, avatarEditPopupConfig.avatarEditForm);
avatarEditFormValidator.enableValidation();


/* -создание попапов- */

  // попап с формой редактирования данных пользователя
const editProfilePopup = new PopupWithForm(editPopupConfig.editProfilePopup, {
  formSubmitHandler: (info) => {
    editProfilePopup.renderLoading(true);
    api.setUserInfo(info)
      .then((result) => {
        userInfo.setUserInfo(result);
        editProfilePopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => editProfilePopup.renderLoading(false));
  }
});

  // попап с формой редактирования аватара
const avatarEditPopup = new PopupWithForm(avatarEditPopupConfig.avatarEditPopup, {
  formSubmitHandler: (data) => {
    avatarEditPopup.renderLoading(true);
    api.setAvatar(data)
      .then((result) => {
        userInfo.setUserInfo(result);
        avatarEditPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => avatarEditPopup.renderLoading(false));
  }
});

  // попап с формой добавления новой карточки
const addCardPopup = new PopupWithForm(addPopupConfig.addCardPopup, {
  formSubmitHandler: (data) => {
    addCardPopup.renderLoading(true);
    api.addCard(data)
      .then((result) => {
        const card = renderCard(result);
        cardList.prependItem(card);
        addCardPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => addCardPopup.renderLoading(false));
  }
});

  // попап с полным изображением
const imagePopup = new PopupWithImage(imagePopupConfig.imagePopup);

  // попап с запросом на удаление карточки
const deletionConfirmPopup = new PopupWithConfirmation(deletionConfirmConfig.deletionConfirmPopup, deletionConfirmConfig.deletionConfirmBtn, {
  handleCardDelete: (card) => {
    deletionConfirmPopup.renderLoading(true);
    api.deleteCard(card.getCardId())
        .then(() => {
          card.handleDeleteCard();
          deletionConfirmPopup.close()
        })
        .catch((err) => console.log(err))
        .finally(() => deletionConfirmPopup.renderLoading(false));
  }
});


/* -рендеринг карточек- */

const cardList = new Section({
  renderer: (item) => {
    const card = renderCard(item);
    cardList.appendItem(card);
  }
}, templateConfig.cardsContainerSelector);

function renderCard(data) {
  const card = new Card(data, templateConfig.cardSelector, userId, {
    handleCardClick: () => {
      imagePopup.open({
        name: data.name,
        link: data.link
      });
    },
    handleCardDelete: () => {
      deletionConfirmPopup.open(card);
    },
    handleCardLike: () => {
      const currentUserLikedCard =  card.checkLikeStatus();
      const requiredApi = currentUserLikedCard
        ? api.removeLikeCard(card.getCardId())
        : api.setLikeCard(card.getCardId());

      requiredApi.then((data) => {
        card.setLikes(data.likes);
        card.handleLikeCard();
      })
      .catch((err) => console.log(err));
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
}


/* -функции открытия попапов- */

function openEditProfilePopup({ nameInput, activityInput }) {
  editProfileFormValidator.removeInputErrors();

  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  activityInput.value = userData.about;

  editProfilePopup.open();
}

function openAvatarEditPopup() {
  avatarEditFormValidator.removeInputErrors();
  avatarEditFormValidator.toggleButtonState();

  avatarEditPopup.open();
}

function openAddCardPopup() {
  addCardFormValidator.removeInputErrors();
  addCardFormValidator.toggleButtonState();

  addCardPopup.open();
}


/* -добавление лоадера при загрузке карточек- */

function renderLoading(isLoading) {
  if (isLoading) {
    loaderConfig.loader.classList.add(loaderConfig.loaderVisibleClass);
    loaderConfig.profile.classList.add(loaderConfig.hiddenSectionClass);
    loaderConfig.cards.classList.add(loaderConfig.hiddenSectionClass);
    loaderConfig.footer.classList.add(loaderConfig.footerFixedClass);
  } else {
    loaderConfig.loader.classList.remove(loaderConfig.loaderVisibleClass);
    loaderConfig.profile.classList.remove(loaderConfig.hiddenSectionClass);
    loaderConfig.cards.classList.remove(loaderConfig.hiddenSectionClass);
    loaderConfig.footer.classList.remove(loaderConfig.footerFixedClass);
  }
}


/* -добавление обработчиков событий- */

editPopupConfig.openEditProfilePopupBtn.addEventListener('click', () => openEditProfilePopup(editPopupConfig));
avatarEditPopupConfig.openAvatarEditPopupBtn.addEventListener('click', () => openAvatarEditPopup(avatarEditPopupConfig));
addPopupConfig.openAddCardPopupBtn.addEventListener('click', openAddCardPopup);
editProfilePopup.setEventListeners();
avatarEditPopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();
deletionConfirmPopup.setEventListeners();
