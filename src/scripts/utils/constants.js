// массив карточек
const initialCards = [
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  }
];

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
  closeEditProfilePopupBtn: document.querySelector('.button_action_edit-popup-close'),
  editProfileForm: document.forms.edit,
  nameInput: document.querySelector('.form__input_type_name'),
  activityInput: document.querySelector('.form__input_type_activity'),
  profileName: document.querySelector('.profile__name'),
  profileActivity: document.querySelector('.profile__activity')
}

// данные попапа addCardPopup и формы addCardForm
const addPopupConfig = {
  addCardPopup: document.querySelector('.popup_type_add-card'),
  openAddCardPopupBtn: document.querySelector('.button_action_add-card'),
  closeAddCardPopupBtn: document.querySelector('.button_action_add-popup-close'),
  addCardForm: document.forms.add,
  titleInput: document.querySelector('.form__input_type_title'),
  linkInput: document.querySelector('.form__input_type_link')
}

// данные попапа imagePopup
const imagePopupConfig = {
  imagePopup: document.querySelector('.popup_type_image'),
  imagePopupImage: document.querySelector('.popup__image'),
  imagePopupCaption: document.querySelector('.popup__caption'),
  closeImagePopupBtn: document.querySelector('.button_action_img-popup-close')
}

export { initialCards, validationConfig, editPopupConfig, addPopupConfig, imagePopupConfig };
