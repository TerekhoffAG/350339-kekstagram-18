'use strict';
(function () {
  var mainBlock = document.querySelector('main');
  var templateMessage = document.querySelector('#error').content.querySelector('.error');

  window.openPopupError = function () {
    var popupError = templateMessage.cloneNode(true);
    mainBlock.appendChild(popupError);

    var closePopup = function () {
      popupError.remove();

      popupError.removeEventListener('click', onButtonClick);
      document.removeEventListener('click', onSectionClick);
      document.removeEventListener('keydown', onPopupEscPress);
    };

    var onButtonClick = function (evt) {
      if (evt.target.nodeName === 'BUTTON') {
        closePopup();
      }
    };

    var onSectionClick = function (evt) {
      if (evt.target.nodeName === 'SECTION') {
        closePopup();
      }
    };

    var onPopupEscPress = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        closePopup();
      }
    };

    popupError.addEventListener('click', onButtonClick);
    document.addEventListener('click', onSectionClick);
    document.addEventListener('keydown', onPopupEscPress);
  };

})();
