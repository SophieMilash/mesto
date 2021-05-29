export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popupElement.querySelector('.popup__close-button');
    closeButton.addEventListener('click', this.close.bind(this));
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('click', this._handleOverlayClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('click', this._handleOverlayClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  renderLoading(isLoading) {
    const submitButton = this._popupElement.querySelector('.button_action_submit');

    if (isLoading) {
      submitButton.querySelector('.dots-loader').classList.add('dots-loader_visible');
    } else {
      submitButton.querySelector('.dots-loader').classList.remove('dots-loader_visible');
    }
  }
}
