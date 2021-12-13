// Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
// принимает в конструктор её данные и селектор её template-элемента;
// содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
// содержит приватные методы для каждого обработчика;
// содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
// Для каждой карточки создайте экземпляр класса Card.

export class Card {
    constructor(name, link, deleteBnt, likeBnt) {
        this._name = name;
        this._link = link;
        
    }
    _getTemplate() {
        // забираем разметку из HTML и клонируем элемент
        const cardElement = document
        .querySelector('.card-template')
        .content
        .querySelector('.place')
        .cloneNode(true);
        // вернём DOM-элемент карточки
        return cardElement;

    }
    generateCard() {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        this._setEventListeners();
        // Добавим данные
        this._element.querySelector('.place__photo').src = this._link;
        this._element.querySelector('.place__title').textContent = this._name;
            

            return this._element;

    }
    _setEventListeners() {
        this._element.querySelector('.place__like-button').addEventListener('click', () => {
        this._handleLikeClick();
        });
        this._element.querySelector('.place__remove-button').addEventListener('click', () => {
        this._handleDeleteClick();
    });
}
    _handleLikeClick() {
        this._element.querySelector('.place__like-button').classList.toggle('place__like-button_active');
} 
    _handleDeleteClick() {
        this._element.remove();
    }
    
  }

//     constructor(data, cardSelector, cardTemplate, cardClick) {
//         this._image = data.link
//         this._title = data.title;
//         this._cardSelector = cardSelector;
//         this._cardClick = cardClick;
//         // this._isDeleted = isDeleted;
//         // this._isLiked = isLiked;

//     }
//     //Методы
//     //создания карточки и добавления ее на страницу
// _getTemplate() {
//     const cardElement = document
//     .querySelector(this._cardSelector)
//     .content
//     .querySelector(".place")
//     .cloneNode(true);
//     return cardElement;
// }
//     //лайк
// _likeCardHandler() {
//     this._likeButton.classList.toggle("place__like-button_active");
// } 
//     //удаление карточки
// _deleteCardHandler() {
//     this._card.remove();
// }
//     //слушатели событий
// _setEventListeners() {
// this._likeButton.addEventListener("click", () => {
//     this.__likeCardHandler();
// });
// this._deleteButton.addEventListener("click", () => {
//     this.__deleteCardHandler();
// });
// this._cardImage.addEventListener("click", () => {
//     this._cardClick(this._title, this._image);
// });
// }
//     //создание карточки
// createCard() {
//     this._card = this.__getTemplate();
//     this._setEventListeners()
//     this._cardImage = this._card.querySelector(".place__photo");
//     this._cardTitle = this._card.querySelector(".place__title");
//     this._deleteButton = this._card.querySelector("..place__remove-button");
//     this._likeButton = this._card.querySelector(".place__like-button");

//     this._cardImage.src = this._image;
//     this._cardImage.alt = this._title;
//     this._cardTitle.textContent = this._title;

//     return this._card;
// }
// } 