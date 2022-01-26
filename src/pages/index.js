import './index.css';

import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'

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
  // initialCards,
  cardTemplate,
  cardsContainerSelector,
  popupOpenImageSelector,
  popupAddCardSelector,
  popupProfileEditSelector,
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector,
  formValidators
} from '../utils/constants.js'

// fetch('https://mesto.nomoreparties.co/v1/cohort-34/cards', {
//   headers: {
//     authorization: 'ca130fc9-c3f6-47a9-975b-5e5cd566bdde'
//   }
// })
//   .then(res => res.json())
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => console.log(err));

const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
  headers: {
  authorization: 'ca130fc9-c3f6-47a9-975b-5e5cd566bdde',
  'Content-Type': 'application/json'
  }
});

getDataFromApi();

function getDataFromApi() {
    api.getAllData()
      .then(([data, userData]) => {
        cardsList.renderItems(data, userData._id);
        userInfo.setUserInfo(userData.name, userData.about);
        userInfo.setAvatar(userData.avatar);
      })
      .catch(err => {
        console.log(`Ошибка загрузки данных: ${err}`)
      })
  }


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

const popupWithImage = new PopupWithImage(popupOpenImageSelector);
popupWithImage.setEventListeners();

function handleCardClick (name, link) {
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
  renderer: (data, userId) => {
    cardsList.addItem(createCard(data, userId));
  }
}, cardsContainerSelector);



// ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ



const popupAddCardForm = new PopupWithForm(
  popupAddCardSelector, 
  { handleSubmit: (data) => {
      const cardElement = createCard({ name:data.cardTitle, link:data.cardLink });
      cardsList.addItem(cardElement, "prepend");
      popupAddCardForm.close()
  }
});
  
// ПОПАП ПРОФИЛЯ

const userInfo = new UserInfo({
  name: profileNameSelector,
  about: profileAboutSelector,
  avatar: profileAvatarSelector
});

const profileEditPopup = new PopupWithForm(
  popupProfileEditSelector, {
    handleSubmit: (data) => {
      api.setUserInfoApi(data.userName, data.userAbout)
      .then((name, about) => {
        userInfo.setUserInfo(name, about);
        
      })
      profileEditPopup.close();
    }
  });

  function handleProfileSubmit() {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.about;
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
profileEditPopup.setEventListeners();
