export default class Card {
  constructor({ name, link, owner}, cardId, userId, { handleCardClick, handleCardDelete }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardId = cardId;
    this._userId = userId;
    this._ownerId = owner._id;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
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

  /* handleDeleteCard() {
    this._element.remove();
    this._element = null;
  } */

  _handleLikeCard() {
    this._likeCardButton.classList.toggle('card__like-button_active');
  }

  _setEventListeners() {
    this._deleteCardButton.addEventListener('click', () => this._handleCardDelete());
    this._likeCardButton.addEventListener('click', () => this._handleLikeCard());
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  getCardId() {
    return this._cardId;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._deleteCardButton = this._element.querySelector('.button_action_delete');
    this._likeCardButton = this._element.querySelector('.button_action_like');
    this._cardImage = this._element.querySelector('.card__image');

    if (this._ownerId !== this._userId) {
      this._deleteCardButton.remove();
    }

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._element;
  }
}
