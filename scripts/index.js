import Card from './Card.js'
import FormValidator from './FormValidator.js'
import Section from './Section.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

//Находим элементы в DOM для попапа профиля
const editButton = document.querySelector(".profile__edit-button"); // кнопка открытия попапа профиля
const profileForm = document.querySelector(".popup__form"); // форма попапа профиля
const nameInput = document.querySelector(".popup__input_type_name"); //инпут имени попапа профиля
const jobInput = document.querySelector(".popup__input_type_about"); //инпут описания попапа профиля

//Находим элементы в DOM для попапа добавления карточек
const popupAddCard = document.querySelector(".popup_add-card"); // попап добавления карточек
const addCardButton = document.querySelector(".profile__add-button"); // кнопка открытия попапа карточек
const addCardForm = popupAddCard.querySelector(".popup__form"); // форма попапа карточек
const cardTitleInput = addCardForm.querySelector(".popup__input_type_card-title"); // инпут названия карточки
const cardLinkInput = addCardForm.querySelector(".popup__input_type_card-link"); // инпут изображения карточки

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

const cardsContainerSelector = ".places__list" // селектор контейнера карточек
const popupOpenImageSelector = ".popup_open-image" // cелектор попапа с картинкой
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

// ПОПАП ОТКРЫТИЯ КАРТИНКИ

function handleCardClick (name, link) {
  const popupWithImage = new PopupWithImage(popupOpenImageSelector);
  popupWithImage.open(name, link); 
}


function createCard(item) {
  // Создадим экземпляр карточки
  const card = new Card(
    item.name,
     item.link,
      cardTemplate,
       handleCardClick);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  return cardElement;
}

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  }
}, cardsContainerSelector);

// ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ

const popupAddCardForm = new PopupWithForm(
  popupAddCardSelector, 
  { handleSubmit: () => {
      const inputImageName = cardTitleInput.value;
      const inputImageLink = cardLinkInput.value;
      const cardElement = createCard({ name:inputImageName, link:inputImageLink });
      cardsList.addItem(cardElement, "prepend");
      popupAddCardForm.close()
  }
});
  
// ПОПАП ПРОФИЛЯ

const userInfo = new UserInfo({
  name: profileNameSelector,
  info: profileAboutSelector
});

const profileEditPopup = new PopupWithForm(
  popupProfileEditSelector, {
    handleSubmit: () => {
      const inputUserName = nameInput.value;
      const inputUserInfo = jobInput.value;

      userInfo.setUserInfo(inputUserName, inputUserInfo);
      profileEditPopup.close();
    }
  });

  function handleProfileSubmit() {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.info;
  }

//Слушатели
editButton.addEventListener("click", () => {
  handleProfileSubmit();
  formValidators[ profileForm.name ].resetValidation();
  profileEditPopup.open();
});
addCardButton.addEventListener("click", () => {
  popupAddCardForm.open();
  formValidators[ addCardForm.name ].resetValidation();
});
popupAddCardForm.setEventListeners();
cardsList.renderItems();
profileEditPopup.setEventListeners();
