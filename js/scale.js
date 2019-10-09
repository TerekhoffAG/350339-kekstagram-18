'use strict';
(function () {
  // Редактирование размера загруженного изображения
  var Scale = {
    MIN: 25,
    MAX: 100,
    STEP: 25,
    RATIO: 100,
    TEXT_OUT_ZOOM: 'Уменьшить',
    TEXT_IN_ZOOM: 'Увеличить'
  };

  var blockScaleButtons = document.querySelector('.img-upload__scale');
  var controlValueScale = blockScaleButtons.querySelector('.scale__control--value');
  var imageUpload = document.querySelector('.img-upload__preview');

  var resetValueScale = function () {
    controlValueScale.value = Scale.MAX + '%';
    imageUpload.style.transform = '';
  };

  var onButtonScaleClick = function (evt) {
    var valueScale = parseInt(controlValueScale.value, 10);

    if (evt.target.textContent === Scale.TEXT_IN_ZOOM) {
      if (valueScale < Scale.MAX) {
        valueScale += Scale.STEP;
      }
    }

    if (evt.target.textContent === Scale.TEXT_OUT_ZOOM) {
      if (valueScale > Scale.MIN) {
        valueScale -= Scale.STEP;
      }
    }

    controlValueScale.value = valueScale + '%';
    imageUpload.style.transform = 'scale(' + (valueScale / Scale.RATIO) + ')';
  };

  window.scale = {
    resetValueScale: resetValueScale,
    onButtonScaleClick: onButtonScaleClick
  };

})();
