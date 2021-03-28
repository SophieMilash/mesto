// попапы
const popup = document.querySelector('.popup');
const editPopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_add-card');
const imagePopup = document.querySelector('.popup_type_image');

// кнопки открытия/закрытия попапов
const openEditPopupBtn = document.querySelector('.button_action_edit');
const openAddCardPopupBtn = document.querySelector('.button_action_add');
const closeEditPopupBtn = editPopup.querySelector('.button_action_close');
const closeAddCardPopupBtn = addCardPopup.querySelector('.button_action_close');
const closeImagePopupBtn = imagePopup.querySelector('.button_action_close');

// данные для форм:
    // editForm
const editForm = document.forms.edit;
const nameInput = editForm.querySelector('.form__item_type_name');
const activityInput = editForm.querySelector('.form__item_type_activity');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
    // addCardForm
const addCardForm = document.forms.add;
const titleInput = addCardForm.querySelector('.form__item_type_title');
const linkInput = addCardForm.querySelector('.form__item_type_link');

// элемемнты imagePopup
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

// массив карточек
const cardsContainer = document.querySelector('.cards');
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
const cardTemplate = document.querySelector('.card-template').content.querySelector('.card');


// открытие / закрытие попапа
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

// внесение изменений в профиль с последующим закрытием попапа (editPopup)
function editFormSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  togglePopup(editPopup);
}

// генерация новой карточки
function insertCard(item) {
  // склонировать template
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const deleteCardButton = card.querySelector('.button_action_delete');
  const likeCardButton = card.querySelector('.button_action_like');
  // запонить данными
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  // добавить в DOM
  cardsContainer.prepend(card);

  function imageClickHandler() {
    imagePopupImage.src = item.link;
    imagePopupImage.alt = item.name;
    imagePopupCaption.textContent = item.name;

    togglePopup(imagePopup);
  }

  // добавление обработчиков
  /* deleteCardButton.addEventListener('click', () => card.target.closest('.card').remove());
  likeCardButton = addEventListener('click', () => {
    likeCardButton.classList.toggle('card__like-button_active');
  }); */
  cardImage.addEventListener('click', imageClickHandler);

}

// вызов карточек из массива
initialCards.forEach(insertCard);

// добавление карточек с последующим закрытием попапа (addCardPopup)
function addCardFormSubmitHandler (evt) {
  evt.preventDefault();

  insertCard({
    name: titleInput.value,
    link: linkInput.value
  });
  togglePopup(addCardPopup);
}

// открытие / закрытие editPopup
  // поля заполняются значениями со страницы
openEditPopupBtn.addEventListener('click', () => {
  togglePopup(editPopup);
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
});
closeEditPopupBtn.addEventListener('click', () => togglePopup(editPopup));
editForm.addEventListener('submit', editFormSubmitHandler);

// открытие / закрытие addCardPopup
openAddCardPopupBtn.addEventListener('click', () => togglePopup(addCardPopup));
  // поля обнуляются после закрытия
closeAddCardPopupBtn.addEventListener('click', () => {
  togglePopup(addCardPopup);
  titleInput.value = '';
  linkInput.value = '';
});
addCardForm.addEventListener('submit', addCardFormSubmitHandler);
