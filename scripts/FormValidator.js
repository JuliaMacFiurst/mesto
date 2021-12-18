export class FormValidator {
  constructor(form, validationConfig) {
     this._validationConfig = validationConfig;
     this._form = form;
     this._input = this._form.querySelector(this._validationConfig.inputSelector);
     this._sbmtButton = this._form.querySelector(this._validationConfig.submitButtonSelector);
     this._inactiveButtonClass = this._form.querySelector(this._validationConfig.inactiveButtonClass);
     this._inputList = Array.from(this._form.querySelectorAll(this._validationConfig.inputSelector));
  }
  _showInputError (input) {
     const errorElement = this._form.querySelector(`.${input.id}-error`);
     input.classList.add(this._validationConfig.inputErrorClass);
     errorElement.textContent = input.validationMessage;
     input.classList.add(this._validationConfig.errorClass);
  }
  
  _hideInputError (input) {
     const errorElement = this._form.querySelector(`.${input.id}-error`);
     input.classList.remove(this._validationConfig.inputErrorClass);
     input.classList.remove(this._validationConfig.errorClass);
     errorElement.textContent = '';
  }
  
  _checkInputValidity(input) {
      if(!input.validity.valid){
       this._showInputError(input);
    } else {
       this._hideInputError(input);
    }
  }

  _toggleButtonState() {
      this._sbmtButton.disabled = !this._form.checkValidity();
      this._sbmtButton.classList.toggle(this._validationConfig.inactiveButtonClass, !this._form.checkValidity());
  }

  _setEventListeners () {
      this._form.addEventListener('submit', evt => evt.preventDefault());
      this._form.addEventListener('input', () => this._toggleButtonState());

      this._inputList.forEach((input) => {
        input.addEventListener('input', () => {
          this._checkInputValidity(input);
        });
      });
     this._toggleButtonState();
  }

  resetValidation(){
   this._toggleButtonState();
   
   this._inputList.forEach((inputElement) => {
   this._hideInputError(inputElement);
});
}
  
  enableValidation () {
       this._setEventListeners();
     }
}

