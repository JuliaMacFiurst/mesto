export default class Card {
    constructor({ data, handleCardClick, handleLike, handleDelete }, cardTemplate, api, popupOpenImage, popupConfirmDelete, placesList) {
        this._name = data.name;
        this._link = data.link;
        

        
        this.handleCardClick = handleCardClick;
        //this._handleLike = handleLike;
        //this._handleDelete = handleDelete;

        this._cardTemplate = cardTemplate;
        this._popupOpenImage = popupOpenImage;
        this._popupConfirmDelete = popupConfirmDelete;
        this._placesList = placesList;
        this._api = api;
        
        this._ownerId = data.owner._id;
        this._cardId = data._id; 

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
        this._handleLike();
        });
        this._removeButton.addEventListener('click', () => {
        this._handleDelete();
    });
        this._placePhoto.addEventListener("click", () => {
        this.handleCardClick(this._name, this._link);
      });
}
    handleLikeClick() {
        if(!(this._likeButton.classList.contains('place__like-button_active'))) {
            this._api.like(this._cardId)
                .then((data) => {
                    this._likeButton.classList.add('place__like-button_active')
                    this._likeCount.textContent = data.likes.length
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            this._api.dislike(this._cardId)
                .then((data) => {
                    this._likeButton.classList.remove('place__like-button_active')
                    this._likeCount.textContent = data.likes.length
                })
                .catch((err) => {
                    console.log(err)
                })
        }
} 
    handleDeleteClick() {
        this._element.remove();

        // this._api.deleteCard(this._cardId)
        //     .then(() => {
        //     this._element.remove();
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
}

    
    generateCard(userId) {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        // Добавим данные
        this._placeTitle = this._element.querySelector('.place__title');
        this._placePhoto = this._element.querySelector('.place__photo');
        this._likeButton = this._element.querySelector('.place__like-button');
        this._likeCount = this._element.querySelector('.place__like-count');
        this._removeButton = this._element.querySelector('.place__remove-button');

        if(!(this._ownerId === userId)) {
            this._removeButton.style.display = "none"
        }
        
        this._placePhoto.src = this._link;
        this._placeTitle.alt = this._name;
        this._placeTitle.textContent = this._name;

            
        this._setEventListeners();

        return this._element;

    }

    

  
    }