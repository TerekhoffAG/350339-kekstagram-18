'use strict';
(function () {
  // Наложение эффектов на фотографию
  var RangeBlock = {
    PADDING: 20,
    MAX: 100,
    MIN: 0,
    RATIO: 100
  };

  var Ratio = {
    LEVEL: 100,
    LEVEL_BLUR: 0.05,
    LEVEL_HEAT: 0.02,
    SHIFT: 1
  };

  var imageUpload = document.querySelector('.img-upload__preview');
  var selectorEffectLevel = document.querySelector('.effect-level');

  var lineRange = document.querySelector('.effect-level__line');
  var pinRange = document.querySelector('.effect-level__pin');
  var depthRange = document.querySelector('.effect-level__depth');
  var inputEffectLevel = document.querySelector('.effect-level__value');

  var classEffect = '';

  // сброс эффектов фотографии к начальному значению
  var resetEffects = function () {
    if (classEffect !== '') {
      imageUpload.classList.remove(classEffect);
      imageUpload.style.filter = null;
    }

    pinRange.style.left = RangeBlock.MAX + '%';
    depthRange.style.width = pinRange.style.left;
    inputEffectLevel.value = RangeBlock.MAX;
  };

  // применение эффекта к фотографии
  var onListEffectsClick = function (evt) {
    if (evt.target.nodeName === 'INPUT') {
      var valueInput = evt.target.value;
      resetEffects();

      var flagShowPin = valueInput === 'none';
      selectorEffectLevel.classList.toggle('hidden', flagShowPin);

      if (valueInput !== 'none') {
        classEffect = 'effects__preview--' + valueInput;
        imageUpload.classList.add(classEffect);
      }
    }
  };

  // уровень наложеногго эффекта - работа с ползунком
  var getLevelEffect = function (levelEffect, className) {
    var classImageUpload = {
      'effects__preview--chrome': 'grayscale(' + (levelEffect / Ratio.LEVEL) + ')',
      'effects__preview--sepia': 'sepia(' + (levelEffect / Ratio.LEVEL) + ')',
      'effects__preview--marvin': 'invert(' + levelEffect + '%)',
      'effects__preview--phobos': 'blur(' + (levelEffect * Ratio.LEVEL_BLUR) + 'px)',
      'effects__preview--heat': 'brightness(' + (Ratio.SHIFT + levelEffect * Ratio.LEVEL_HEAT) + ')'
    };

    var result = classImageUpload[className];
    imageUpload.style.filter = result;
  };

  var movePinRange = function (evt) {
    var LimitMovementX = {
      min: lineRange.offsetLeft - RangeBlock.PADDING,
      max: lineRange.offsetLeft + lineRange.offsetWidth - RangeBlock.PADDING
    };

    var pinRangeCoord = pinRange.offsetLeft + evt.movementX;
    var pinRangePercent = (pinRangeCoord * RangeBlock.RATIO) / lineRange.offsetWidth;

    if (pinRangeCoord < LimitMovementX.min) {
      pinRangePercent = RangeBlock.MIN;
    } else if (pinRangeCoord > LimitMovementX.max) {
      pinRangePercent = RangeBlock.MAX;
    }

    var intPinRangePercent = Math.round(pinRangePercent);

    inputEffectLevel.value = intPinRangePercent;
    pinRange.style.left = pinRangePercent + '%';
    depthRange.style.width = pinRange.style.left;
    getLevelEffect(intPinRangePercent, classEffect);
  };

  var onPinRangeMousedown = function () {

    var onPinRangeMouseMove = function (evt) {
      movePinRange(evt);
    };

    var onPinRangeMouseUp = function () {
      document.removeEventListener('mousemove', onPinRangeMouseMove);
      document.removeEventListener('mouseup', onPinRangeMouseUp);
    };

    document.addEventListener('mousemove', onPinRangeMouseMove);
    document.addEventListener('mouseup', onPinRangeMouseUp);
  };

  window.effect = {
    resetEffects: resetEffects,
    onListEffectsClick: onListEffectsClick,
    onPinRangeMousedown: onPinRangeMousedown
  };

})();
