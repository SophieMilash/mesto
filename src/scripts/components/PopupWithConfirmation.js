import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupElement, confirmButton, { handleCardDelete }) {
    super(popupElement);
    this._confirmButton = confirmButton;
    this._handleCardDelete = handleCardDelete;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleCardDelete(this._card);
    });
  }

  open(card) {
    this._card = card;
    super.open();
  }
}
