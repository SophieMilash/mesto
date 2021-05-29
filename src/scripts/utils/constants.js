const templateConfig = {
  cardsContainerSelector: '.cards',
  cardSelector: '.card-template'
}

// объект с настройками валидации
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.button_action_submit',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

// данные попапа editProfilePopup и формы editProfileForm
const editPopupConfig = {
  editProfilePopup: document.querySelector('.popup_type_edit'),
  openEditProfilePopupBtn: document.querySelector('.button_action_edit'),
  editProfileForm: document.forms.edit,
  nameInput: document.querySelector('.form__input_type_name'),
  activityInput: document.querySelector('.form__input_type_activity'),
  profileName: document.querySelector('.profile__name'),
  profileActivity: document.querySelector('.profile__activity')
}

// данные попапа avatarEditPopup и формы avatarEditForm
const avatarEditPopupConfig = {
  avatarEditPopup: document.querySelector('.popup_type_avatar-edit'),
  openAvatarEditPopupBtn: document.querySelector('.profile__avatar-edit'),
  avatarEditForm: document.forms.avatar,
  avatarInput: document.querySelector('.form__input_type_avatar-link'),
  profileAvatar: document.querySelector('.profile__avatar')
}

// данные попапа addCardPopup и формы addCardForm
const addPopupConfig = {
  addCardPopup: document.querySelector('.popup_type_add-card'),
  openAddCardPopupBtn: document.querySelector('.button_action_add-card'),
  addCardForm: document.forms.add,
}

// данные попапа imagePopup
const imagePopupConfig = {
  imagePopup: document.querySelector('.popup_type_image'),
}

// данные попапа deletionConfirmPopup и формы addCardForm
const deletionConfirmConfig = {
  deletionConfirmPopup: document.querySelector('.popup_type_deletion-confirm'),
  deletionConfirmBtn: document.querySelector('.button_action_confirm')
}

const loaderConfig = {
  loader: document.querySelector('.loader'),
  loaderVisibleClass: 'loader_visible',
  cards: document.querySelector('.cards'),
  cardsHiddenClass: 'cards_hidden',
  dotsLoader: document.querySelector('.dots-loader'),
  dotsLoaderVisibleClass: 'dots-loader_visible'
}

export { templateConfig, validationConfig, editPopupConfig, avatarEditPopupConfig, addPopupConfig, imagePopupConfig, deletionConfirmConfig, loaderConfig };
