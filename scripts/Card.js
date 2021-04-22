import { initialCards } from './initial-сards.js';

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const closeImagePopupBtn = imagePopup.querySelector('.button_action_close');

class Card {
  constructor(cardSelector) {
    this._cardSelector = cardSelector;
  }

  // клонирование template
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  _handleOpenPopup() {
    imagePopupImage.src = this._link;
    imagePopupImage.alt = this._name;
    imagePopupCaption.textContent = this._name;
  }

  _handleLikeCard() {
    this._element.querySelector('.button_action_like').classList.toggle('card__like-button_active');
  }

  // добавление обработчиков
  _setEventListeners() {
    const deleteCardButton = this._element.querySelector('.button_action_delete');
    const likeCardButton = this._element.querySelector('.button_action_like');
    const cardImage = this._element.querySelector('.card__image');

    this._element.querySelector('.button_action_delete').addEventListener('click', (item) => {
      this._element.remove(item);
    });

    this._element.querySelector('.button_action_like').addEventListener('click', () => {
      _handleLikeCard()
    });

    cardImage.addEventListener('click', () => {
      this._handleOpenPopup();

      openPopup(imagePopup);
    });
  }

  generateCard() {
    this._element = super._getTemplate();
    super._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__title').alt = this._name;

    return this._element;
  }
}

class DefaultCard extends Card {
  constructor(data, cardSelector) {
  super(cardSelector);
    this._name = data.name;
    this._link = data.link;
  }

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

export { Card }
