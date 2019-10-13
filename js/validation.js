'use strict';

(function () {

  var formUpload = document.querySelector('.form__upload');
  var formNext = formUpload.querySelector('.form__next--wrapper');
  var buttonSubmit = formNext.querySelector('button');
  var errorMassage = document.querySelectorAll('.error-massage');
  var registrationButton = document.querySelector('.registration__button');

  function CustomValidation() {
    this.invalidities = [];
    this.validityChecks = [];
    this.validityChecksPassword = [];
  }

  CustomValidation.prototype = {
    addInvalidity: function(message) {
      this.invalidities.push(message);
    },

    getInvalidities: function() {
      return this.invalidities.join('. \n');
    },

    checkValidity: function(input) {

      for (var i = 0; i < this.validityChecks.length; i++ ) {
        var isInvalid = this.validityChecks[i].isInvalid(input);

   
        if(isInvalid) {
          this.addInvalidity(this.validityChecks[i].invalidityMessage);
          this.validityChecks[i].element.classList.remove('visually-hidden');
          userNamefeld.classList.add('invalid');
        } else {
          this.validityChecks[i].element.classList.add('visually-hidden');
          userNamefeld.classList.remove('invalid');
        }
      }

      for (var i = 0; i < this.validityChecksPassword.length; i++ ) {
        var isInvalid = this.validityChecksPassword[i].isInvalid(input);

        if(isInvalid) {
          this.addInvalidity(this.validityChecksPassword[i].invalidityMessage);
          this.validityChecksPassword[i].element.classList.add('validation__false');
          this.validityChecksPassword[i].element.classList.remove('validation__ok');
        } else {
          this.validityChecksPassword[i].element.classList.add('validation__ok');
          this.validityChecksPassword[i].element.classList.remove('validation__false');
        }
      }

    }
  };

    var emailValidityChecks = [
      {
        isInvalid: function(input) {
        return input.value === '';

        },
        invalidityMessage: 'Введите E-mail',
        element: document.querySelector('label[for="e-mail"] p:nth-of-type(1)')
      },
      {
        isInvalid: function(input) {
        return !input.value.match(/[@]/g);

        },
        invalidityMessage: 'E-mail должен содержать символ "@"',
        element: document.querySelector('label[for="e-mail"] p:nth-of-type(2)')
      }      
    ];
    
    var userNameValidityChecks = [

      {
        isInvalid: function(input) {
        return input.value === '';

        },
        invalidityMessage: 'Введите Никнейм',
        element: document.querySelector('label[for="user-name"] p:nth-of-type(1)')
      },
  
      {
        isInvalid: function(input) {
          var firstLetter = input.value.charAt(0).match(/[^a-zA-Z]/g);
          return firstLetter ? true : false;

        },
        invalidityMessage: 'Ник-нейм должен начинаться только с буквы',
        element: document.querySelector('label[for="user-name"] p:nth-of-type(2)')
      },
      {
        isInvalid: function(input) {
          return input.value.length < 3;

        },
        invalidityMessage: 'Ник-нейм должен содержать минимум 3 символа',
        element: document.querySelector('label[for="user-name"] p:nth-of-type(3)')
      },
      {
        isInvalid: function(input) {
          var illegalCharacters = input.value.match(/[^a-zA-Z0-9_;]/g);
          return illegalCharacters ? true : false;
        },
        invalidityMessage: 'Ник-нейм должен содержать только буквы, цифры, cимволы (_) и (;)',
        element: document.querySelector('label[for="user-name"] p:nth-of-type(4)')

      }

    ]; 

      var passwordFeldValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value.length < 6 | input.value.length > 32;
      },
      invalidityMessage: 'Пароль должен содержать от 6 до 32 символов',
      element: document.querySelector('label[for="password"] .validation-list li:nth-of-type(1) input[type="checkbox"]')
    },
    {
      isInvalid: function(input) {
        return !input.value.match(/[0-9]/g);
      },
      invalidityMessage: 'Пароль должен содержать цифру',
      element: document.querySelector('label[for="password"] .validation-list li:nth-of-type(2) input[type="checkbox"]')
    },
    {
      isInvalid: function(input) {
        return !input.value.match(/[a-z]/g) | !input.value.match(/[A-Z]/g);
      },
      invalidityMessage: 'Пароль должен содержать заглавную и строчную буквы',
      element: document.querySelector('label[for="password"] .validation-list li:nth-of-type(3) input[type="checkbox"]')
    },
    {
      isInvalid: function(input) {
        return passwordFeld.value === userNamefeld.value;
      },
      invalidityMessage: 'Пароль не должен совпадать с Никнеймом',
      element: document.querySelector('label[for="password"] .validation-list li:nth-of-type(4) p')
    }
  ];

  var passwordRepeatFeldValidityChecks = [
    {
      isInvalid: function() {
        return passwordRepeatFeld.value != passwordFeld.value;
      },
      invalidityMessage: 'Введённые пароли не совпадают',
      element: document.querySelector('label[for="password-again"] p')
    }
  ];  


    function checkInput (input) {

    input.CustomValidation.invalidities = [];

    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }

    var lastTimeout = setTimeout(function(){
      input.CustomValidation.checkValidity(input);
    }, 2000);

    if (input.CustomValidation.invalidities.length == 0 && input.value != '' ) {
    
    input.setCustomValidity('');

    } else {

      var message = input.CustomValidation.getInvalidities();
      input.setCustomValidity(message);
    }

    for (var i = 0; i < inputs.length; i++ ) {
      if (input.CustomValidation.invalidities.length === 0 && inputs[i].value !== "") {
        buttonNext.removeAttribute("disabled");
      } else {
        buttonNext.setAttribute("disabled", "disabled");
      }
    };
  };

  var emailFeld = document.querySelector('#e-mail');
  var userNamefeld = document.querySelector('#user-name');  
  var passwordFeld = document.querySelector('#password');
  var passwordRepeatFeld = document.querySelector('#password-again');
  var agreementInput = document.querySelector('#agreement');

  emailFeld.CustomValidation = new CustomValidation();
  emailFeld.CustomValidation.validityChecks = emailValidityChecks;

  userNamefeld.CustomValidation = new CustomValidation();
  userNamefeld.CustomValidation.validityChecks = userNameValidityChecks;

  passwordFeld.CustomValidation = new CustomValidation();
  passwordFeld.CustomValidation.validityChecksPassword = passwordFeldValidityChecks;

  passwordRepeatFeld.CustomValidation = new CustomValidation();
  passwordRepeatFeld.CustomValidation.validityChecks = passwordRepeatFeldValidityChecks;

  var resetUpload = function () {
    formUpload.reset();
    for (var i = 0; i < errorMassage.length; i++) {
      errorMassage[i].classList.add('visually-hidden');
    }
    for (var j = 0; j < passwordFeldValidityChecks.length; j++) {
      passwordFeldValidityChecks[j].element.classList.remove('validation__ok');
      passwordFeldValidityChecks[j].element.classList.remove('validation__false');
    }
  };

  var inputs = document.querySelectorAll('input[required]:not([type="checkbox"])');
  var buttonNext = formUpload.querySelector('button:nth-of-type(1)');

  for (var i = 0; i < inputs.length; i++ ) {

    inputs[i].addEventListener('input', function() {
          checkInput(this);
    });
  };


  formUpload.addEventListener('submit', function(evt) {
    evt.preventDefault();
    for (var i = 0; i < inputs.length; i++) {
      checkInput(inputs[i]);
      formNext.classList.add('visual');
    };
  });  

  buttonSubmit.addEventListener('click', function(evt) {
    evt.preventDefault();

    var object = {};
    var formData = new FormData(formUpload);

    formData.forEach(function(value, key) {
      object[key] = value;
    });

    var json = JSON.stringify(object);
    console.log(json);

    window.script.closePopup();
    registrationButton.style.backgroundColor = '#82b3d9';
    registrationButton.setAttribute('disabled', 'disabled');
  });

  window.validation = {
    formNext: formNext,
    resetUpload: resetUpload
  };
})();
