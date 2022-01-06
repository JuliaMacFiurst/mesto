//Находим элементы в DOM для попапа профиля
export const editButton = document.querySelector(".profile__edit-button"); // кнопка открытия попапа профиля
export const profileForm = document.querySelector(".popup__form"); // форма попапа профиля
export const nameInput = document.querySelector(".popup__input_type_name"); //инпут имени попапа профиля
export const jobInput = document.querySelector(".popup__input_type_about"); //инпут описания попапа профиля

//Находим элементы в DOM для попапа добавления карточек
export const popupAddCard = document.querySelector(".popup_add-card"); // попап добавления карточек
export const addCardButton = document.querySelector(".profile__add-button"); // кнопка открытия попапа карточек
export const addCardForm = popupAddCard.querySelector(".popup__form"); // форма попапа карточек
export const cardTitleInput = addCardForm.querySelector(".popup__input_type_card-title"); // инпут названия карточки
export const cardLinkInput = addCardForm.querySelector(".popup__input_type_card-link"); // инпут изображения карточки

// Объект с коллекцией всех классов неoбходимых для валидации
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__sbmt-button",
  inactiveButtonClass: "popup__sbmt-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}

// массив карточек
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const cardTemplate = document.querySelector(".card-template").content; // template карточки

export const cardsContainerSelector = ".places__list" // селектор контейнера карточек
export const popupOpenImageSelector = ".popup_open-image" // cелектор попапа с картинкой
export const popupAddCardSelector = ".popup_add-card" // селектор попапа добавления карточек
export const popupProfileEditSelector = ".popup_profile-edit" // селектор попапа профиля
export const profileNameSelector = ".profile__name" // селектор поля имени пользователя
export const profileAboutSelector = ".profile__about" // селектор поля информации о пользователе

export const formValidators = {}