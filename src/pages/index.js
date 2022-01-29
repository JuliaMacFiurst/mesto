import './index.css';

import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'
import PopupConfirmDelete from '../components/PopupConfirmDelete.js';

import {
  editButton,
  profileForm,
  nameInput,
  jobInput,
  addCardButton,
  addCardForm,
  validationConfig,
  cardTemplate,
  cardsContainerSelector,
  popupOpenImageSelector,
  popupAddCardSelector,
  popupProfileEditSelector,
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector,
  popupAvatarSelector,
  formValidators,
  popupConfirmDeleteSelector,
  avatarEditButton,
  avatarForm
} from '../utils/constants.js'

let userId = null;

const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
  headers: {
  authorization: 'ca130fc9-c3f6-47a9-975b-5e5cd566bdde',
  'Content-Type': 'application/json'
  }
});

    api.getAllData()
      .then(([data, userData]) => {
        userId = userData._id;
        userInfo.setUserInfo(userData);
        userInfo.setAvatar(userData.avatar);
        
        cardsList.renderItems(data);
      })
      .catch(err => {
        console.log(`Ошибка загрузки данных: ${err}`)
      })


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

const popupWithConfirm = new PopupConfirmDelete(popupConfirmDeleteSelector);

const userInfo = new UserInfo({
  name: profileNameSelector,
  about: profileAboutSelector,
  avatar: profileAvatarSelector
},
userId);

function handleCardClick(name, link) {
  popupWithImage.open(name, link); 
}

function createCard(data) {
  // Создадим экземпляр карточки
  const card = new Card
  (
  { 
      data: data,
      handleCardClick,
  },
      cardTemplate,
      api
  );
  
  card._handleLike = () => card.handleLikeClick();
  card._handleDelete = () => {
    popupWithConfirm.submitDeleteAction(
      () => {
        popupWithConfirm.renderDeletionLoading(true)
        api.deleteCard(data._id)
        .then(() => {
        card.handleDeleteClick()
        
      })
        .catch(err => {console.log(err)})
        .finally(() => {
          popupWithConfirm.renderDeletionLoading(false)
          popupWithConfirm.close()
        })
      }
    )
    popupWithConfirm.open()
  }

  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard(userId);
  return cardElement;
}

const cardsList = new Section({
  renderer: (data) => {
    cardsList.addItem(createCard(data));
  }
}, cardsContainerSelector);

// ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ

const popupAddCardForm = new PopupWithForm(
  popupAddCardSelector, 
  { handleSubmit: (data) => {
      popupAddCardForm.renderLoading(true); 
      api.addUserCard(data.cardTitle, data.cardLink)
      .then(( res ) => {
        const cardElement = createCard(res);
        cardsList.addItem(cardElement, "prepend");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupAddCardForm.renderLoading(false);
        popupAddCardForm.close()
      }) 
  }
});
  
// ПОПАП ПРОФИЛЯ

const profileEditPopup = new PopupWithForm(
  popupProfileEditSelector, {
    handleSubmit: (data) => { 
      profileEditPopup.renderLoading(true); 
      api.setUserInfoApi(data.userName, data.userAbout)
      .then((data) => {
        userInfo.setUserInfo(data);  
      })
      .catch((err) => console.log(err))
      .finally(() => {
      profileEditPopup.renderLoading(false)
      profileEditPopup.close();
    })
    }
  });

  function handleProfileSubmit() {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.about;
  }
  
  // ПОПАП АВАТАРА ПРОФИЛЯ
  const popupEditAvatar = new PopupWithForm(
    popupAvatarSelector,
    { handleSubmit: (data) => {
      popupEditAvatar.renderLoading(true)
      api.setUserAvatar(data)
        .then((data) => {
          // console.log(data)
          userInfo.setAvatar(data.avatar)
          popupEditAvatar.close()
        })
        .catch((err) => console.log(err))
        .finally(() => {
          popupEditAvatar.renderLoading(false)
        })
    }
  });
  
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
avatarEditButton.addEventListener("click", () => {
  popupEditAvatar.open();
  formValidators[ avatarForm.name ].resetValidation();
})
popupAddCardForm.setEventListeners();
profileEditPopup.setEventListeners();
popupEditAvatar.setEventListeners();
popupWithImage.setEventListeners();
popupWithConfirm.setEventListeners();