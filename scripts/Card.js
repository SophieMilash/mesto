import { openPopup } from './index.js';

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

export default class Card {
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

  _handleLikeCard() {
    /* likeCardButton.classList.toggle('card__like-button_active'); */

    this._element.querySelector('.button_action_like').classList.toggle('card__like-button_active');
  }

  _handleOpenPopup() {
    imagePopupImage.src = this._link;
    imagePopupImage.alt = this._name;
    imagePopupCaption.textContent = this._name;

    openPopup(imagePopup);
  }

  // добавление обработчиков
  _setEventListeners() {
    const deleteCardButton = this._element.querySelector('.button_action_delete');
    const likeCardButton = this._element.querySelector('.button_action_like');
    const cardImage = this._element.querySelector('.card__image');

    deleteCardButton.addEventListener('click', () => {
      this._element.remove();
    });

    likeCardButton.addEventListener('click', () => {
      this._handleLikeCard()
    });

    cardImage.addEventListener('click', () => {
      this._handleOpenPopup();
    });
  }
}
