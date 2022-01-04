import Card from './Card.js'
import FormValidator from './FormValidator.js'
import Section from './Section.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

//Находим элементы в DOM для попапа профиля
const popupProfileEdit = document.querySelector(".popup_profile-edit"); // попап профиля
const editButton = document.querySelector(".profile__edit-button"); // кнопка открытия попапа профиля
const profileForm = document.querySelector(".popup__form"); // форма попапа профиля
const nameInput = document.querySelector(".popup__input_type_name"); //инпут имени попапа профиля
const jobInput = document.querySelector(".popup__input_type_about"); //инпут описания попапа профиля
const nameValue = document.querySelector(".profile__name"); //имя в профиле
const jobValue = document.querySelector(".profile__about"); //описание в профиле

//Находим элементы в DOM для попапа добавления карточек
const popupAddCard = document.querySelector(".popup_add-card"); // попап добавления карточек
const addCardButton = document.querySelector(".profile__add-button"); // кнопка открытия попапа карточек
const addCardForm = popupAddCard.querySelector(".popup__form"); // форма попапа карточек
const cardTitleInput = addCardForm.querySelector(".popup__input_type_card-title"); // инпут названия карточки
const cardLinkInput = addCardForm.querySelector(".popup__input_type_card-link"); // инпут изображения карточки
const popupCardSbmtButton = popupAddCard.querySelector(".popup__sbmt-button"); //кнопка сабмита карточек
const popupImage = document.querySelector(".popup__image"); //картинка из попапа открытия карточки
const popupCaption = document.querySelector(".popup__caption"); // подпись картинки в попапе

const popups = document.querySelectorAll(".popup"); // все попапы
const popupOpenImage = document.querySelector(".popup_open-image");
// Объект с коллекцией всех классов неoбходимых для валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__sbmt-button",
  inactiveButtonClass: "popup__sbmt-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}

// массив карточек
const initialCards = [
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

const cardTemplate = document.querySelector(".card-template").content; // template карточки
const placesList = document.querySelector(".places__list"); // блок places, куда вставляем карточки

const cardsContainerSelector = ".places__list" // селектор контейнера карточек
const popupOpenImageSelector = ".popup_open-image" // cелектор попапа с картинкой
const popupFormSelector = ".popup__form" // селектор формы попапа
const popupAddCardSelector = ".popup_add-card" // селектор попапа добавления карточек
const popupProfileEditSelector = ".popup_profile-edit" // селектор попапа профиля
const profileNameSelector = ".profile__name" // селектор поля имени пользователя
const profileAboutSelector = ".profile__about" // селектор поля информации о пользователе

const formValidators = {}

// Включение валидации
const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, validationConfig)
   // вот тут в объект записываем под именем формы
    formValidators[ formElement.name] = validator;
   validator.enableValidation();
  });
};

enableValidation(validationConfig);

const userInfo = new UserInfo({
  name: profileNameSelector,
  info: profileAboutSelector
});

const handleCardClick = (name, link) => popupImage.open(name, link);

const popupWithImage = new PopupWithImage(popupOpenImageSelector);
popupWithImage.setEventListeners();

function createCard(item) {
  // Создадим экземпляр карточки
  const card = new Card(
    item.name,
     item.link,
      cardTemplate,
       handleCardClick);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard(placesList);
  return cardElement;
}

initialCards.forEach((item) => {
  // Добавляем в DOM
  placesList.append(createCard(item));
}); 

const cardRenderer = (item) => {
  const cardElement = createCard(item);
  cardList.addItem(cardElement, "append");
};

const cardList = new Section ({ 
  items: initialCards, 
  renderer: cardRenderer 
}, 
  cardsContainerSelector
  );


//ВАЛИДАЦИЯ ФОРМ
// const profileFormValidator = new FormValidator(profileForm, validationConfig);
// profileFormValidator.enableValidation();
// const addCardFormValidator = new FormValidator(addCardForm, validationConfig);
// addCardFormValidator.enableValidation();


 


const popupAddCardForm = new PopupWithForm(
  popupAddCardSelector,
  popupFormSelector);

const profileEditPopup = new PopupWithForm(popupProfileEditSelector, popupFormSelector)



//ПОПАП ДОБАВЛЕНИЯ КАРТОЧЕК
// Функция обработчик "отправки" формы карточек
function handleCardSubmit(evt){
  evt.preventDefault();
  // Вставляем новые здачения в place
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  const item = {
      name, link
  }
  placesList.prepend(createCard(item));

  closePopup(popupAddCard);
  cardTitleInput.value = "";
  cardLinkInput.value = "";
}

// ПОПАП ПРОФИЛЯ
// function setPopupProfile() {
//   openPopup(popupProfileEdit);
//   // Значениям инпутов присваиваем текстовые значения профайла
//   // Чтобы функция значения заносила данные в форму
//   nameInput.value = nameValue.textContent;
//   jobInput.value = jobValue.textContent;
// }

//// Функция-обработчик «отправки» формы профиля
// function handleProfileSubmit(evt) {
//   evt.preventDefault(); //Эта строчка отменяет стандартную отправку формы.
//   //вставляем новые значения в profile
//   nameValue.textContent = nameInput.value;
//   jobValue.textContent = jobInput.value;
//   closePopup(popupProfileEdit);
 
//   nameInput.value = '';
//   jobInput.value = '';
// }

// // Функция открытия всех попапов
// function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   document.addEventListener("keydown", closeByEscape);
// }



//Функция закрытия всех попапов
// function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closeByEscape);
// }


// Функция закрытия попапов кликом на Escape
// function closeByEscape(evt) {
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_opened");
//     closePopup(openedPopup);
//   }
// }

// Функция закрытия попапов кликом на крестик или оверлей
// popups.forEach((popup) => {
//   popup.addEventListener("click", (evt) => {
//     if (evt.target.classList.contains("popup_opened")) {
//       closePopup(popup);
//     }
//     if (evt.target.classList.contains("popup__close-button")) {
//       closePopup(popup);
//     }
//   });
// });

//Слушатели
editButton.addEventListener("click", () => {
  setPopupProfile();
  formValidators[ profileForm.name ].resetValidation();
});
addCardButton.addEventListener("click", () => {
  popupAddCard.open();
  cardTitleInput.value = "";
  cardLinkInput.value = "";
  formValidators[ addCardForm.name ].resetValidation();
});
// profileForm.addEventListener("submit", setUserInfo);
addCardForm.addEventListener("submit", handleCardSubmit);

