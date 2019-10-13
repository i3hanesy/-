'use strict';

(function () {
  var registrationButton = document.querySelector('.registration__button');
  var form = document.querySelector('.form');
  var closePopupButton = document.querySelector('.form__closed');

  var openPopup = function(evt) {
    evt.preventDefault();
    form.classList.add('visual');
    document.addEventListener('keydown', onEscKeydown);    
  };

  var closePopup = function (){
    window.validation.resetUpload();
    form.classList.remove('visual');
    window.validation.formNext.classList.remove('visual');
    document.removeEventListener('keydown', onEscKeydown);
  };

  var onEscKeydown = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  registrationButton.addEventListener('click', openPopup);

  closePopupButton.addEventListener('click', closePopup);

  window.script = {
    form: form,
    closePopup: closePopup
  };

})();

