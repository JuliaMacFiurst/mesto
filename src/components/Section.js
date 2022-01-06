export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._initialArray = items;
        this._renderer = renderer;

        this._container = document.querySelector(containerSelector);
    }
    renderItems(item) {
        this._initialArray.forEach(item => {
            this._renderer(item); // вызываем renderer, передав item
          });
        }

    addItem(element, method = "append") {
        if (method === "append") {
            this._container.append(element);
          } else {
            this._container.prepend(element);
          }
        }
}