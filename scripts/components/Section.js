export default class Section {
  constructor({ items, render}, containerSelector) {
    this._renderedItems = data;
    this._container = document.querySelector(containerSelector);
  }

  setItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      const card = new Card(item, openImagePopup, '.card-template');
      const cardElement = card.generateCard();

      this.setItem(cardElement);
    });
  }
}
