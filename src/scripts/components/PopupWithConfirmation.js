import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupElement, confirmButton, { handleCardDelete }) {
    super(popupElement);
    this._confirmButton = confirmButton;
    this._handleCardDelete = handleCardDelete;
    this._form = this._popupElement.querySelector('.form');
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleCardDelete(this._card);
    });
  }

  open(card) {
    this._card = card;
    super.open();
  }
}
