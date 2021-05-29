import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupElement, { formSubmitHandler }) {
    super(popupElement);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popupElement.querySelector('.form');
  }

  _getInputValues() {
    const inputValues = {};
    const formInputs = [...this._form.querySelectorAll('.form__input')];

    formInputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputData = this._getInputValues();
      this._formSubmitHandler(inputData);
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}
