const popupElement = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const profile = document.querySelector("profile");
const editButton = document.querySelector(".profile__edit-button");
const submitButton = document.querySelector(".popup__sbmt-button");
function togglePopup() {
  popupElement.classList.toggle("popup_opened");
}
function openPopup() {
  popupElement.classList.add("popup_opened");
}
function closePopup() {
  popupElement.classList.remove("popup_opened");
}
editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
submitButton.addEventListener("click", closePopup);
document.addEventListener("keyup", (event) => {
  if (event.keyCode === 27) {
    closePopup();
  }
});

let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".author__name");
let jobInput = document.querySelector(".author__about");

function formSubmitHandler(evt) {
  evt.preventDefault();

  let nameValue = document.querySelector(".author__name").value;
  let jobValue = document.querySelector(".author__about").value;

  document.querySelector(".profile__name").textContent = nameValue;
  document.querySelector(".profile__about").textContent = jobValue;
}

formElement.addEventListener("submit", formSubmitHandler);
