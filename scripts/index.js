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



// Функция, которая добавляет класс с ошибкой
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('form__item_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__item-error_active');
}

// Функция, которая удаляет класс с ошибкой
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('form__item_type_error');
  errorElement.classList.remove('form__item-error_active');
  errorElement.textContent = '';
}

// Проверка валидности поля
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
}

// Проверка наличия невалидного поля
function hasInvalidInput(inputList) {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
}

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
// Стилизация кнопки submit 
function toggleButtonState(inputList, buttonElement) {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('form__submit_inactive');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('form__submit_inactive');
  }
}

// Добавление обработчиков всем полям формы
function setEventListeners(formElement) {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.form__item'));

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement);
    });
  });
}

// Добавление обработчиков всем формам
function enableValidation() {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
}

// Вызовем функцию
enableValidation();


