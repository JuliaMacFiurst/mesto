export class Card {
    constructor(name, link, cardTemplate, placesList, handleCardClick, popupOpenImage) {
        this._name = name;
        this._link = link;
        this._cardTemplate = cardTemplate;
        this._placesList = placesList;
        this._popupOpenImage = popupOpenImage;
        this.handleCardClick = handleCardClick;
        
    }
    _getTemplate() {
        // забираем разметку из HTML и клонируем элемент
        const cardElement = this._cardTemplate.cloneNode(true)
        .querySelector('.place')
        .cloneNode(true);
        // вернём DOM-элемент карточки
        return cardElement;

    }
   
    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
        this._handleLikeClick();
        });
        this._removeButton.addEventListener('click', () => {
        this._handleDeleteClick();
    });
        this._placePhoto.addEventListener("click", () => {
        this.handleCardClick(this._name, this._link);
      });
}
    _handleLikeClick() {
        this._element.querySelector('.place__like-button').classList.toggle('place__like-button_active');
} 
    _handleDeleteClick() {
        this._element.remove();
    }
    // _handleCardClick() {
    //     openPopup(this._popupOpenImage);
    //       document.querySelector(".popup__image").src = this._link;
    //       document.querySelector(".popup__image").alt = this._name;
    //       document.querySelector(".popup__caption").textContent = this._name;
    //   }
    generateCard() {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        // Добавим данные
        this._placePhoto = this._element.querySelector('.place__photo');
        this._likeButton = this._element.querySelector('.place__like-button');
        this._removeButton = this._element.querySelector('.place__remove-button');
        
        this._placePhoto.src = this._link;
        this._placePhoto.alt = this._name;
        this._placePhoto.textContent = this._name;

            
        this._setEventListeners();

            return this._element;

    }
  
    }
