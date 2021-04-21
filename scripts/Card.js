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

class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
  }

  // клонирование template
  _getTemplate() {
    const cardElement = document
    .querySelector('.card-template')
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  // добавление обработчиков
  _setEventListeners() {
    this._element.querySelector('.button_action_delete').addEventListener('click', (item) => card.remove(item));

    this._element.querySelector('.button_action_like').addEventListener('click', () => likeCardButton.classList.toggle('card__like-button_active'));

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._element.querySelector('.popup__image').src = this._link;
      this._element.querySelector('.popup__image').alt = this._name;
      this._element.querySelector('.popup__caption').textContent = this._name;

      openPopup(imagePopup);
    });
  }

  // генерация карточки
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    // запонилнение данными
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__title').alt = this._name;

    return this._element;
  }
}

// вызов карточек из массива
// создание экземпляра класса
initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.generateCard();

  document.querySelector('.cards').prepend(cardElement);
});
