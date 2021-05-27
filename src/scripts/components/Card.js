export default class Card {
  constructor(data, cardSelector, userId, { handleCardClick, handleCardDelete, handleCardLike }) {
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
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

  handleLikeCard() {
    this._likeCardButton.classList.toggle('card__like-button_active');
    this._likeCounter.textContent = this._likes.length;
    this._showUserLikes(this._userId);
  }

  /* countLikes() {
    this._likeCounter.textContent = this._likes.length;
    this._showUserLikes(this._userId);
  } */

  _showUserLikes() {
    // this._likes.forEach((like) => {
    //   if (like._id === this._ownerId) {
    //     this._likeCardButton.classList.add('card__like-button_active');
    //   }
    // })

    if (this.checkCurrentUserLikes(this._userId)) {
      this._likeCardButton.classList.add('card__like-button_active');
    } else {
      this._likeCardButton.classList.remove('card__like-button_active');
    }
  }

  checkCurrentUserLikes() {
    return this._likes.some(like => like._id === this._userId);
  }

  setLikes(data) {
    this._likes = data;
  }

  _removeDeleteButton() {
    if (this._ownerId !== this._userId) {
      this._deleteCardButton.remove();
    }
  }

  _setEventListeners() {
    this._deleteCardButton.addEventListener('click', () => this._handleCardDelete(this));
    this._likeCardButton.addEventListener('click', () => this._handleCardLike());
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._deleteCardButton = this._element.querySelector('.card__delete-button');
    this._likeCardButton = this._element.querySelector('.card__like-button');
    this._likeCounter = this._element.querySelector('.card__like-number');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._showUserLikes();
    this._removeDeleteButton();
    this._setEventListeners();
    return this._element;
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
}
