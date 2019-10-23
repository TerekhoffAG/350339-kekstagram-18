'use strict';
(function () {
  // Работа с формой загрузкой и редактированием фотографией пользователя
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var form = document.querySelector('.img-upload__form');
  var imgUploadBlock = document.querySelector('.img-upload');
  var imagePreview = document.querySelector('.img-upload__preview img');
  var effectsPreview = document.querySelectorAll('.effects__preview');

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

  // функция загрузает выбранную фотографию
  var setFileLoad = function () {
    var file = formEditImgOpen.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imagePreview.src = reader.result;
        effectsPreview.forEach(function (item) {
          item.style.backgroundImage = 'url(' + reader.result + ')';
        });
      });

      reader.readAsDataURL(file);
    }
  };

  // Открытие и закрытие формы редактирования
  var onFormEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE && inputFieldHashtag !== document.activeElement && textareaField !== document.activeElement) {
      closeForm();
    }
  };

  var openForm = function () {
    formEditImg.classList.remove('hidden');
    setFileLoad();
    document.addEventListener('keydown', onFormEscPress);

    window.scale.resetValueScale();
    blockScaleButtons.addEventListener('click', window.scale.onButtonScaleClick);

    listEffects.addEventListener('click', window.effect.onListEffectsClick);
    selectorEffectLevel.classList.add('hidden');
    window.effect.resetEffects();
    pinRange.addEventListener('mousedown', window.effect.onPinRangeMousedown);

    btnSubmitForm.addEventListener('click', window.onFieldHashtagInput);
    form.addEventListener('submit', onFormSubmit);
  };

  var closeForm = function () {
    formEditImg.classList.add('hidden');
    document.removeEventListener('keydown', onFormEscPress);

    blockScaleButtons.removeEventListener('click', window.scale.onButtonScaleClick);

    listEffects.removeEventListener('click', window.effect.onListEffectsClick);
    pinRange.removeEventListener('mousedown', window.effect.onPinRangeMousedown);

    btnSubmitForm.removeEventListener('click', window.onFieldHashtagInput);
    form.removeEventListener('submit', onFormSubmit);

    formEditImgOpen.value = '';
  };

  // отправка формы на сервер
  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.upload(new FormData(form), window.openPopupSuccess, window.openPopupError);
    closeForm();
    form.reset();
  };

  formEditImgOpen.addEventListener('change', function () {
    openForm();
  });

  formEditImgClose.addEventListener('click', function () {
    closeForm();
  });
})();
