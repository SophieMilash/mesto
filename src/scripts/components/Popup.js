export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button');
    closeButton.addEventListener('click', () => this.close());
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('click', this._handleOverlayClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close = () => {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('click', this._handleOverlayClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
