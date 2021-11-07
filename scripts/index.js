//Находим элементы в DOM
// невидимому блоку popup присваиваем константу popupElement
const popupElement = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const profile = document.querySelector("profile");
const editButton = document.querySelector(".profile__edit-button");
const formElement = document.querySelector(".popup__form");
// Пристваиваем модификатору полей _type_name и _type_about переменные 
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_about");
// Присваиваем переменные элементам __name и __about в секции profile
let nameValue = document.querySelector(".profile__name");
let jobValue = document.querySelector(".profile__about");

// Функция открытия поп-аппа
function openPopup() {
  popupElement.classList.add("popup_opened");
  // комментарий в первом ревью: По заданию функция открытия должна ещё заносить сразу же данные в форму. 
//  Для этого значениям инпутов надо присвоить текстовые значения профайла
  let nameInput = nameValue.value;
  let jobInput = jobValue.value;
  nameInput.textContent = nameValue;
  jobInput.textContent = jobValue;
}
// Функция закрытия поп-аппа
function closePopup() {
  popupElement.classList.remove("popup_opened");
}
//// Функция-обработчик «отправки» формы
function formSubmitHandler(evt) {
  evt.preventDefault(); //Эта строчка отменяет стандартную отправку формы.
// задаем переменные newName и newJob для новых значений введенных в поля формы
  let newName = nameInput.value;
  let newJob = jobInput.value;
//вставляем новые значения в profile
  nameValue.textContent = newName;
  jobValue.textContent = newJob;
  closePopup();
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);
