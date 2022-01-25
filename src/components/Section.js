export default class Section {
    constructor({ renderer }, containerSelector) {
      
        this._renderer = renderer;

        this._container = document.querySelector(containerSelector);
    }
    // renderItems(item) {
    //     this._initialArray.forEach(item => {
    //         this._renderer(item); // вызываем renderer, передав item
    //       });
    //     }

    renderItems(data, userId) {
      data.forEach(item => {
          this._renderer(item, userId); // вызываем renderer, передав item
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