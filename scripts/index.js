//Находим элементы в DOM для попапа профиля 
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
const template = document.querySelector(".card-template"); // template карточки
const placesList = document.querySelector(".places__list"); // блок places, куда вставляем карточки

//Находим элементы в DOM для попапа открытия картинок
const popupOpenImage = document.querySelector(".popup_open-image"); //попап открытия картинок
const popupImage = document.querySelector(".popup__image"); // картинка в попапе
const popupCaption = document.querySelector(".popup__caption"); // подпись к картинке в попапе

const popup = document.querySelector(".popup");

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

// ПОПАП ПРОФИЛЯ
// Функция открытия поп-аппа профиля
function openPopupProfile() {
  popupProfileEdit = document.querySelector(".popup_profile-edit").classList.add("popup_opened");
// Значениям инпутов присваиваем текстовые значения профайла
// Чтобы функция значения заносила данные в форму
  nameInput.value = nameValue.textContent;
  jobInput.value = jobValue.textContent;
};

//// Функция-обработчик «отправки» формы профиля
function formSubmitHandler(evt) {
  evt.preventDefault(); //Эта строчка отменяет стандартную отправку формы.
//вставляем новые значения в profile
  nameValue.textContent = nameInput.value;
  jobValue.textContent = jobInput.value;
};

//ПОПАП ДОБАВЛЕНИЯ КАРТОЧЕК
//Функция открытия попапа добавления карточки
function openPopupAddCard() {
  popupAddCard.classList.add("popup_opened");
};

// Функция создания карточки и добавления ее на страницу
const createCardDomNode = (item) => {
  const cardTemplate = template.content.querySelector('.place').cloneNode(true); // получаем и клонируем содержимое тега template 
  cardTemplate.querySelector('.place__title').textContent = item.name; // присваиваем карточкам названия из массива
  cardTemplate.querySelector('.place__photo').src = item.link; // присваиваем карточкам картинки из массива
  cardTemplate.querySelector(".place__photo").alt = item.name; // присваиваем альты картинок

  const deleteButton = cardTemplate.querySelector('.place__remove-button'); // реализуем удаление карточки
	deleteButton.addEventListener('click', () => {
	cardTemplate.remove();
});
  const likeButton = cardTemplate.querySelector(".place__like-button"); // реализуем лайк
  likeButton.addEventListener("click", function(evt) {
    evt.target.classList.toggle("place__like-button_active");
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
cardTitleInput.value = '';
cardLinkInput.value = '';

};

placesList.append(...result);

//ПОПАП ОТКРЫТИЯ КАРТИНОК
//Функция открытия попапа открытия карточек

const placeImage = document.querySelectorAll(".place__photo").forEach(item => {
  item.addEventListener("click", () => {
    popupOpenImage.classList.add("popup_opened");

    const popupSrc = item.src;
    popupImage.src = popupSrc;

    const altText = item.alt;
    popupCaption.textContent = altText;
  });
});

//глобальная функция закрытия попапов
const closeButton = document.querySelectorAll(".popup__close-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".popup").classList.remove("popup_opened");
  });
});

//глобальная функция закрытия попапов по нажатию на сабмит
const sbmtButton = document.querySelectorAll(".popup__sbmt-button").forEach((btn) => {
  btn.addEventListener("click", () =>{
    btn.closest(".popup").classList.remove("popup_opened");
  });
});

editButton.addEventListener("click", openPopupProfile);
addCardButton.addEventListener("click", openPopupAddCard);
profileForm.addEventListener("submit", formSubmitHandler);
addCardForm.addEventListener("submit", submitFormHandler);


