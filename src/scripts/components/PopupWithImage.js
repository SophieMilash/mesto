import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
  }

  open({ name, link }) {
    const popupImage = this._popupElement.querySelector('.popup__image');
    const popupCaption = this._popupElement.querySelector('.popup__caption');

    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;

    super.open();
  }
}
