'use strict';
(function () {
  // Работа с формой загрузкой и редактированием фотографией пользователя
  var imgUploadBlock = document.querySelector('.img-upload');

  var formEditImg = imgUploadBlock.querySelector('.img-upload__overlay');
  var formEditImgOpen = imgUploadBlock.querySelector('#upload-file');
  var formEditImgClose = imgUploadBlock.querySelector('#upload-cancel');

  var textareaField = imgUploadBlock.querySelector('.text__description');
  var btnSubmitForm = imgUploadBlock.querySelector('.img-upload__submit');

  var blockScaleButtons = document.querySelector('.img-upload__scale');

  var listEffects = document.querySelector('.effects__list');
  var selectorEffectLevel = document.querySelector('.effect-level');
  var pinRange = document.querySelector('.effect-level__pin');

  var inputFieldHashtag = document.querySelector('.text__hashtags');

  // Открытие и закрытие формы редактирования
  var onFormEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE && inputFieldHashtag !== document.activeElement && textareaField !== document.activeElement) {
      closeForm();
    }
  };

  var openForm = function () {
    formEditImg.classList.remove('hidden');
    document.addEventListener('keydown', onFormEscPress);

    window.scale.resetValueScale();
    blockScaleButtons.addEventListener('click', window.scale.onButtonScaleClick);

    listEffects.addEventListener('click', window.effect.onListEffectsClick);
    selectorEffectLevel.classList.add('hidden');
    window.effect.resetEffects();
    pinRange.addEventListener('mousedown', window.effect.onPinRangeMousedown);

    btnSubmitForm.addEventListener('click', window.onFieldHashtagInput);
  };

  var closeForm = function () {
    formEditImg.classList.add('hidden');
    document.removeEventListener('keydown', onFormEscPress);

    blockScaleButtons.removeEventListener('click', window.scale.onButtonScaleClick);

    listEffects.removeEventListener('click', window.effect.onListEffectsClick);
    pinRange.removeEventListener('mousedown', window.effect.onPinRangeMousedown);

    btnSubmitForm.removeEventListener('click', window.onFieldHashtagInput);

    formEditImgOpen.value = '';
  };

  formEditImgOpen.addEventListener('change', function () {
    openForm();
  });

  formEditImgClose.addEventListener('click', function () {
    closeForm();
  });

})();
