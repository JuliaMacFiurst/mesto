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
  formValidators,
  popupConfirmDelete,
  deleteButton,
  confirmDeleteForm,
  popupConfirmDeleteSelector
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

let userId = null;

const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
  headers: {
  authorization: 'ca130fc9-c3f6-47a9-975b-5e5cd566bdde',
  'Content-Type': 'application/json'
  }
});

// getDataFromApi();

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
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link); 
}



const popupWithConfirm = new PopupConfirmDelete(popupConfirmDeleteSelector);
popupWithConfirm.setEventListeners();

 

  // {
  //   handleSubmit: (data) => {
  //     api.deleteCard(data)
  //       .then(() => {
  //         cardItem.deleteCard();
  //       })
  //       .then(() => {
  //         cardItem = null;
  //       })
  //       .catch((err) => console.log(err))
  //       popupWithConfirm.close();
  //   }  
  // })

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
        api.deleteCard(data._id)
        .then(() => {
        card.handleDeleteClick()
        popupWithConfirm.close()
      })
        .catch(err => {console.log(err)})
      }

    )
    popupWithConfirm.open()
  }

  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard(userId);

  // console.log(userInfo.setUserId())
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
      api.addUserCard(data.cardTitle, data.cardLink)
      .then(( res ) => {
// likes: [], _id: "61f532d078c41501972df434", name: "TEST", link: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24…G90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80", owner: {…}, createdAt: "2022-01-29T12:28:00.801Z" }
        console.log(res);
        const cardElement = createCard(res);
        //const cardElement = createCard({ name:data.cardTitle, link:data.cardLink });
        cardsList.addItem(cardElement, "prepend");
      })
      
      popupAddCardForm.close()
  }
});
  
// ПОПАП ПРОФИЛЯ

const userInfo = new UserInfo({
  name: profileNameSelector,
  about: profileAboutSelector,
  avatar: profileAvatarSelector
},
userId);

const profileEditPopup = new PopupWithForm(
  popupProfileEditSelector, {
    handleSubmit: (data) => {  
      api.setUserInfoApi(data.userName, data.userAbout)
      .then((data) => {
        userInfo.setUserInfo(data);  
      })
      .catch((err) => console.log(err))
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