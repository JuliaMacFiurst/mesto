// Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
// принимает в конструктор её данные и селектор её template-элемента;
// содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
// содержит приватные методы для каждого обработчика;
// содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
// Для каждой карточки создайте экземпляр класса Card.
import { openPopup } from './index.js'

export class Card {
    constructor(name, link) {
        this._name = name;
        this._link = link;
        this._popupOpenImage = document.querySelector(".popup_open-image");
        
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
    _setEventListeners() {
        this._element.querySelector('.place__like-button').addEventListener('click', () => {
        this._handleLikeClick();
        });
        this._element.querySelector('.place__remove-button').addEventListener('click', () => {
        this._handleDeleteClick();
    });
        this._element.querySelector('.place__photo').addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
}
    _handleLikeClick() {
        this._element.querySelector('.place__like-button').classList.toggle('place__like-button_active');
} 
    _handleDeleteClick() {
        this._element.remove();
    }
    _handleCardClick() {
        openPopup(this._popupOpenImage);
          document.querySelector(".popup__image").src = this._link;
          document.querySelector(".popup__image").alt = this._name;
          document.querySelector(".popup__caption").textContent = this._name;
      }

    generateCard() {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        this._setEventListeners();
        // Добавим данные
        this._element.querySelector('.place__photo').src = this._link;
        this._element.querySelector('.place__photo').alt = this._name;
        this._element.querySelector('.place__title').textContent = this._name;
            

            return this._element;

    }
  }
