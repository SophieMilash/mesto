// попапы
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_add-card');
const imagePopup = document.querySelector('.popup_type_image');

// кнопки открытия/закрытия попапов
const openEditProfilePopupBtn = document.querySelector('.button_action_edit');
const openAddCardPopupBtn = document.querySelector('.button_action_add');
const closeEditProfilePopupBtn = editProfilePopup.querySelector('.button_action_close');
const closeAddCardPopupBtn = addCardPopup.querySelector('.button_action_close');
const closeImagePopupBtn = imagePopup.querySelector('.button_action_close');

// данные для форм:
    // editProfileForm
const editProfileForm = document.forms.edit;
const nameInput = editProfileForm.querySelector('.form__item_type_name');
const activityInput = editProfileForm.querySelector('.form__item_type_activity');
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

  // возможность закрытия попапа кликом на оверлей
  document.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });

  // возможность закрытия попапа нажатием на Esc 
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
}

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// внесение изменений в профиль с последующим закрытием попапа (editProfilePopup)
function handleEditProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  closePopup(editProfilePopup);
}

// генерация карточки
function createCard(item) {
  // клонирование template
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const deleteCardButton = card.querySelector('.button_action_delete');
  const likeCardButton = card.querySelector('.button_action_like');
  // запонилнение данными
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

// функция добавления карточки
function renderCard (item) {
  cardsContainer.prepend(createCard(item));
}

// вызов карточек из массива
initialCards.forEach(item => {
  renderCard(item);
});

// добавление карточки с последующим закрытием попапа (addCardPopup)
  // поля ввода обнуляются после закрытия
function handleAddCardFormSubmit (evt) {
  evt.preventDefault();

  renderCard({
    name: titleInput.value,
    link: linkInput.value
  });
  addCardForm.reset();
  closePopup(addCardPopup);
}

// открытие / закрытие editProfilePopup
  // поля заполняются значениями со страницы
openEditProfilePopupBtn.addEventListener('click', () => {
  openPopup(editProfilePopup);
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
});
closeEditProfilePopupBtn.addEventListener('click', () => closePopup(editProfilePopup));
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

// открытие / закрытие addCardPopup
openAddCardPopupBtn.addEventListener('click', () => openPopup(addCardPopup));
closeAddCardPopupBtn.addEventListener('click', () => closePopup(addCardPopup));
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

// закрытие imagePopup
closeImagePopupBtn.addEventListener('click', () => closePopup(imagePopup));
