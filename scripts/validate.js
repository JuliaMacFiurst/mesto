// Функция, которая принимает параметрами элементы формы и добавляет полям инпутов
// нужные обработчики
  const setEventListeners = (formElement, { inputSelector, submitButtonSelector,
    inactiveButtonClass, inputErrorClass, errorClass }) => {
    formElement.addEventListener('submit', evt => evt.preventDefault());
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(formElement, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, { inputErrorClass, errorClass });
            toggleButtonState(formElement, buttonElement, inactiveButtonClass);
        });
    });
};

// Функция которая проверяет вадидность полей
  const checkInputValidity = (formElement, inputElement, { inputErrorClass, errorClass }) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, { inputErrorClass, errorClass });
      } else {
        showInputError(formElement, inputElement, inputElement.validationMessage, { inputErrorClass, errorClass });
      }
};

// Функция, которая добавляет класс с ошибкой, добавляет уникальный класс для тега span каждого инпута,
//отвечает за показ сообщения об ошибке
  const showInputError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };

// Функция, которая удаляет класс ошибки для span и инпутов, очищает сообщение об ошибке
  const hideInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };

// Функция, которая включает и отключает активирующий кнопку класс
// Вызвать эту ф-ию в обработчике два раза: для того чтобы кнопка была не активна при
// открытии формы и чтобы сверять состояние кнопки при каждом изменении полей формы
  const toggleButtonState = (formElement, buttonElement, inactiveButtonClass) => {
    const isFormValid = formElement.checkValidity();
    buttonElement.disabled = !isFormValid; 
    buttonElement.classList.toggle(inactiveButtonClass, !isFormValid);
  };

// Функция, которая находит и перебирает все формы на странице
  const enableValidation = (config) => {
      const { 
          formSelector, inputSelector, submitButtonSelector, 
          inactiveButtonClass, inputErrorClass, errorClass
        } = config;
      const forms = document.querySelectorAll(formSelector);
      forms.forEach(form => {
          const newObj = { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }
          setEventListeners(form, newObj);
      });
  }

// Объект с коллекцией всех классов неoбходимых для валидации
  const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__sbmt-button",
    inactiveButtonClass: "popup__sbmt-button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
}

  enableValidation(validationConfig);