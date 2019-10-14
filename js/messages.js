'use strict';
(function () {
  var mainBlock = document.querySelector('main');
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');

  window.openPopupError = function () {
    var popupError = templateError.cloneNode(true);
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

  window.openPopupSuccess = function () {
    var popupSuccess = templateSuccess.cloneNode(true);
    mainBlock.appendChild(popupSuccess);

    var closePopup = function () {
      popupSuccess.remove();

      popupSuccess.removeEventListener('click', onButtonClick);
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

    popupSuccess.addEventListener('click', onButtonClick);
    document.addEventListener('click', onSectionClick);
    document.addEventListener('keydown', onPopupEscPress);
  };

})();
