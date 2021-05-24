import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupElement, confirmButton, { actionFn }) { /* {formSubmitHandler} */
    super(popupElement);
    //this._formSubmitHandler = formSubmitHandler;
    //this._confirmPopup = confirmPopup;
    this._confirmButton = confirmButton;
    this._actionFn = actionFn;
  }


  setEventListeners() {
    super.setEventListeners();

    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._actionFn;
      this.close();
    });
  }

  open(data) {
    this._data = data;
    super.open();
  }
}
