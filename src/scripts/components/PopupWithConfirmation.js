import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupElement, confirmButton) { /* {formSubmitHandler} */
    super(popupElement);
    //this._formSubmitHandler = formSubmitHandler;
    //this._confirmPopup = confirmPopup;
    this._confirmButton = confirmButton;
  }


  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.close();
    });
  }

  open() {

    super.open();
  }
}
