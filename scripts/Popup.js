export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-button');
    }

    open() {
      this._popup.classList.add("popup_opened");
      document.addEventListener("keydown", () => this._handleEscClose(evt));
    }

    close() {
       this._popup.classList.remove("popup_opened");
      document.removeEventListener("keydown", () => this._handleEscClose(evt));
    }

    _handleEscClose(evt) {
        this._openPopup = document.querySelector('popup_opened');
        if (evt.key === "Escape") {
        this._openPopup.close();
          }
    }

    setEventListeners() {
        this._closeButton.addEventListener("click", () => this.close());
        this._popup.addEventListener('click', (evt) => {
            if (evt.target === this._popup) {
                this.close();
            }
        });
    }
    }