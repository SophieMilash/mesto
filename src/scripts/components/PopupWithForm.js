import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector('.form');
  }

  _getInputValues() {
    const inputValues = {};
    const formInputs = Array.from(this._form.querySelectorAll('.form__input'));
    formInputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  _setEventListeners() {
    super._setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const data = this._getInputValues();
      this._formSubmitHandler(data);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

/* const editProfilePopup = new PopupWithForm(editPopupConfig.editProfilePopup, handleEditProfileFormSubmit({ editPopupConfig }));
const addCardPopup = new PopupWithForm(addPopupConfig.addCardPopup, handleAddCardFormSubmit({ addPopupConfig }));

editProfilePopup */
