import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({ name, link }) {
    const popupImage = this._popupSelector.querySelector('.popup__image');
    const popupCaption = this._popupSelector.querySelector('.popup__caption');

    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;

    super.open();
  }
}
