import './index.css';

import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  editButton,
  profileForm,
  nameInput,
  jobInput,
  addCardButton,
  addCardForm,
  cardTitleInput,
  cardLinkInput,
  validationConfig,
  initialCards,
  cardTemplate,
  cardsContainerSelector,
  popupOpenImageSelector,
  popupAddCardSelector,
  popupProfileEditSelector,
  profileNameSelector,
  profileAboutSelector,
  formValidators
} from '../utils/constants.js'

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
