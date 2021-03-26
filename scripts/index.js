// popups
const editPopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_add-card');
const ImagePopup = document.querySelector('.popup_type_image');

// open popup buttons
const openEditPopupBtn = document.querySelector('.button_action_edit');
const openAddCardPopupBtn = document.querySelector('.button_action_add');


// close popup buttons
const closeEditPopupBtn = editPopup.querySelector('.button_action_close');
const closeAddCardPopupBtn = addCardPopup.querySelector('.button_action_close');
const closeImagePopupBtn = ImagePopup.querySelector('.button_action_close');

const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__item_type_name');
const activityInput = formElement.querySelector('.form__item_type_activity');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const cardsContainer = document.querySelector('.cards');




// массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// найти/создать шаблон
// склонировать
//заполнить данными
//добавить в док

const element = initialCards.forEach(item => {
  const cardTemplate = document.querySelector('.card-template').content.querySelector('.card');
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  cardTitle.textContent = item;

  cardsContainer.append(card);
});



// по клику открывается попап
// поля заполняются значениями со страницы
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
}

// по клику на крестик закрывается попап без сохранения
function closePopup() {
  popup.classList.remove('popup_opened');
}

// внесение изменений в данные на странице с последующим закрытием попапа
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  closePopup();
}

openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);


