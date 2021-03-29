// попапы
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

// карточки
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content.querySelector('.card');


// открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// внесение изменений в профиль с последующим закрытием попапа (editPopup)
function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  closePopup(editPopup);
}

// генерация новой карточки
function createCard(item) {
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
  // добавление обработчиков
  deleteCardButton.addEventListener('click', (item) => card.remove(item));
  likeCardButton.addEventListener('click', () => likeCardButton.classList.toggle('card__like-button_active'));
  cardImage.addEventListener('click', () => {
    imagePopupImage.src = item.link;
    imagePopupImage.alt = item.name;
    imagePopupCaption.textContent = item.name;

    openPopup(imagePopup);
  });
  return card;
}

// добавление новой карточки в контейнер
function getCard() {
  const result = initialCards.map(item => {
    const newCard = createCard(item);
    return newCard;
  });
  cardsContainer.prepend(...result);

}
getCard();

// вызов карточек из массива
initialCards.forEach(createCard);

// добавление карточек с последующим закрытием попапа (addCardPopup)
  // поля ввода обнуляются после закрытия
function handleAddCardFormSubmit (evt) {
  evt.preventDefault();

  createCard({
    name: titleInput.value,
    link: linkInput.value
  });
  cardsContainer.prepend(createCard);
  addCardForm.reset();
  closePopup(addCardPopup);
}

// открытие / закрытие editPopup
  // поля заполняются значениями со страницы
openEditPopupBtn.addEventListener('click', () => {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
});
closeEditPopupBtn.addEventListener('click', () => closePopup(editPopup));
editForm.addEventListener('submit', handleEditFormSubmit);

// открытие / закрытие addCardPopup
openAddCardPopupBtn.addEventListener('click', () => openPopup(addCardPopup));
closeAddCardPopupBtn.addEventListener('click', () => closePopup(addCardPopup));
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

// закрытие imagePopup
closeImagePopupBtn.addEventListener('click', () => closePopup(imagePopup));
