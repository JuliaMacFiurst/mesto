//Находим элементы в DOM для попапа профиля
const popupProfileEdit = document.querySelector(".popup_profile-edit"); //попап профиля
const closeButton = document.querySelector(".popup__close-button"); // кнопка закрытия попапа профиля
const editButton = document.querySelector(".profile__edit-button"); // кнопка открытия попапа профиля
const profileForm = document.querySelector(".popup__form"); // форма попапа профиля
const nameInput = document.querySelector(".popup__input_type_name"); //инпут имени попапа профиля
const jobInput = document.querySelector(".popup__input_type_about"); //инпут описания попапа профиля
const nameValue = document.querySelector(".profile__name"); //имя в профиле
const jobValue = document.querySelector(".profile__about"); //описание в профиле

//Находим элементы в DOM для попапа добавления карточек
const popupAddCard = document.querySelector(".popup_add-card"); // попап добавления карточек
const addCardButton = document.querySelector(".profile__add-button"); // кнопка открытия попапа карточек
const closeAddCardButton = popupAddCard.querySelector(".popup__close-button"); // кнопка закрытия попапа карточек
const addCardForm = popupAddCard.querySelector(".popup__form"); // форма попапа карточек
const cardTitleInput = addCardForm.querySelector(".popup__input_type_card-title"); // инпут названия карточки
const cardLinkInput = addCardForm.querySelector(".popup__input_type_card-link"); // инпут изображения карточки
const cardTitle = document.querySelector(".place__title"); // название карточки
const cardImage = document.querySelector(".place__photo"); // картинка карточки
const template = document.querySelector(".card-template"); // template карточки
const placesList = document.querySelector(".places__list"); // блок places, куда вставляем карточки

// массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

// Попап профиля
// Функция открытия поп-аппа профиля
function openPopupProfile() {
  popupProfileEdit.classList.add("popup_opened");
// Значениям инпутов присваиваем текстовые значения профайла
// Чтобы функция значения заносила данные в форму
  nameInput.value = nameValue.textContent;
  jobInput.value = jobValue.textContent;
}
// Функция закрытия поп-аппа профиля
function closePopupProfile() {
  popupProfileEdit.classList.remove("popup_opened");
}
//// Функция-обработчик «отправки» формы профиля
function formSubmitHandler(evt) {
  evt.preventDefault(); //Эта строчка отменяет стандартную отправку формы.
//вставляем новые значения в profile
  nameValue.textContent = nameInput.value;
  jobValue.textContent = jobInput.value;
  closePopupProfile();
}

//Попап добавления карточек
//Функция открытия попапа добавления карточки
function openPopupAddCard() {
  popupAddCard.classList.add("popup_opened");
}

//Функция закрытия попапа добавления карточки
function closePopupAddCard() {
  popupAddCard.classList.remove("popup_opened");
}

// работа с массивом карточек создаем DOMNode
const createCardDomNode = (item) => {
  const cardTemplate = template.content.querySelector('.place').cloneNode(true); // получаем и клонируем содержимое тега template 
  cardTemplate.querySelector('.place__title').textContent = item.name; // присваиваем карточкам названия из массива
  cardTemplate.querySelector('.place__photo').src = item.link; // присваиваем карточкам картинки из массива
  cardTemplate.querySelector(".place__photo").alt = item.name;
  const deleteButton = cardTemplate.querySelector('.place__remove-button'); // реализуем удаление карточки
	deleteButton.addEventListener('click', () => {
	cardTemplate.remove();
});
  const likeButton = cardTemplate.querySelector(".place__like-button"); // реализуем лайк
  likeButton.addEventListener("click", function(evt) {
    evt.target.classList.add("place__like-button_active");
});
	
  return cardTemplate; // возвращаем массив карточек на страницу
}

  const result = initialCards.map((item) => { // создали результирующий массив с колбэком, который на каждом этапе
                                            // передает внутрь колбэка элемент массива
  return createCardDomNode(item); // создаем DOMNode для каждого элемента массива
});

// Функция обработчик "отправки" формы карточек
const submitFormHandler = (evt) => {
  evt.preventDefault();
// Вставляем новые здачения в place
const inputCard = {
  name: cardTitleInput.value,
  link: cardLinkInput.value
};
const newCard = createCardDomNode(inputCard); // добавляем карточку со значением из формы
placesList.insertAdjacentElement("afterbegin", newCard);
closePopupAddCard()
cardTitleInput.value = '';
cardLinkInput.value = '';
};

placesList.append(...result);



editButton.addEventListener("click", openPopupProfile);
addCardButton.addEventListener("click", openPopupAddCard);
closeButton.addEventListener("click", closePopupProfile);
closeAddCardButton.addEventListener("click", closePopupAddCard);
profileForm.addEventListener("submit", formSubmitHandler);
addCardForm.addEventListener("submit", submitFormHandler);

