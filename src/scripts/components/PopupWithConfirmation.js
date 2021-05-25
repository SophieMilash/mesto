import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupElement, confirmButton, { handleCardDelete }) { /* {formSubmitHandler} */
    super(popupElement);
    //this._formSubmitHandler = formSubmitHandler;
    this._confirmButton = confirmButton;
    this._handleCardDelete = handleCardDelete;
    //this._actionFn = actionFn;
  }


  setEventListeners() {
    super.setEventListeners();

    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleCardDelete;
      this.close();
    });
  }

  open(data) {
    this._data = data;
    super.open();
  }
}
