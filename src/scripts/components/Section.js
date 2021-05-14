export default class Section {
  constructor({ items, renderer}, containerSelector) {
    this._renderedItems = items;
    this.__renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach(item => this.__renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
