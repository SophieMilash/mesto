export default class Card {
  constructor({ name, link, owner, _id}, userId, { handleCardClick, handleCardDelete }, cardSelector) {
    this._name = name;
    this._link = link;
    this._ownerId = owner._id;
    this._cardId = _id;
    this._userId = userId;
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

  getCardId() {
    return this._cardId;
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeCard() {
    this._likeCardButton.classList.toggle('card__like-button_active');
  }

  _setEventListeners() {
    this._deleteCardButton.addEventListener('click', () => this._handleCardDelete());
    this._likeCardButton.addEventListener('click', () => this._handleLikeCard(this));
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._deleteCardButton = this._element.querySelector('.button_action_delete');
    this._likeCardButton = this._element.querySelector('.button_action_like');

    /* if (this._ownerId !== this._userId) {
      this._deleteCardButton.remove();
    } */

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._element;
  }
}
