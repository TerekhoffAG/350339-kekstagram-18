'use strict';
(function () {
  var Hashtag = {
    TOTAL: 5,
    LENGTH: 20,
    MIN_LENGTH: 1,
    RATIO: 2,
    INDEX_FALSE: -1
  };

  var inputFieldHashtag = document.querySelector('.text__hashtags');

  var onFieldHashtagInput = function () {
    if (inputFieldHashtag.value) {
      var arrHashtags = inputFieldHashtag.value.trim().toLowerCase().split(' ');
      var textError = '';

      inputFieldHashtag.addEventListener('input', function () {
        inputFieldHashtag.setCustomValidity('');
        inputFieldHashtag.style.border = '2px solid transparent';
      });

      if (arrHashtags.length > Hashtag.TOTAL) {
        textError = 'Нельзя указать больше 5 хэш-тегов';
      }

      for (var i = 0; i < arrHashtags.length; i++) {
        if (arrHashtags[i].charAt(0) !== '#') {
          textError = 'Хэштег должен начинаться с символа #';
        }
        if (arrHashtags[i].charAt(0) === '#' && arrHashtags[i].length === Hashtag.MIN_LENGTH) {
          textError = 'Хеш-тег не может состоять только из одной #';
        }
        if (arrHashtags[i].split('#').length > Hashtag.RATIO) {
          textError = 'Хеш-теги разделяются пробелами';
        }
        if (arrHashtags[i].length > Hashtag.LENGTH) {
          textError = 'Максимальная длина хэш-тега 20 символов, включая #';
        }
        var indexHashtag = arrHashtags.indexOf(arrHashtags[i], i + 1);
        if (indexHashtag !== Hashtag.INDEX_FALSE) {
          textError = 'Один и тот же хэш-тег не может быть использован дважды';
        }
      }

      inputFieldHashtag.setCustomValidity(textError);

      if (textError) {
        inputFieldHashtag.style.border = '2px solid red';
      }
    }
  };

  window.onFieldHashtagInput = onFieldHashtagInput;
})();
