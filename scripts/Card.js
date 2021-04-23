import { openPopup } from './index.js';

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const openImagePopup = (link, name) => {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;

  openPopup(imagePopup);
};

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  _handleOpenPopup() {
    openImagePopup(this._link, this._name);
  }

  _handleLikeCard() {
    this._element.querySelector('.button_action_like').classList.toggle('card__like-button_active');
  }

  _setEventListeners() {
    const deleteCardButton = this._element.querySelector('.button_action_delete');
    const likeCardButton = this._element.querySelector('.button_action_like');
    const cardImage = this._element.querySelector('.card__image');

    deleteCardButton.addEventListener('click', () => this._element.remove());
    likeCardButton.addEventListener('click', () => this._handleLikeCard());
    cardImage.addEventListener('click', () => this._handleOpenPopup());
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.card__image');
    const cardTitle = this._element.querySelector('.card__title');

    this._setEventListeners();

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    return this._element;
  }
}
