import Card from './Card.js';

export class DefaultCard extends Card {
  constructor(data, cardSelector) {
  super(cardSelector);
    this._name = data.name;
    this._link = data.link;
  }

  generateCard() {
    this._element = super._getTemplate();
    super._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__title').alt = this._name;

    return this._element;
  }
}
