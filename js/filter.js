'use strict';

(function () {
  var VALUE_PIC = 10;

  var filterBlock = document.querySelector('.img-filters__form');
  var buttons = filterBlock.querySelectorAll('.img-filters__button');
  var picturesContainer = document.querySelector('.pictures');

  // получить случайные 10 элементов
  var getRandomData = function (data) {
    var randomData = data.slice();
    randomData.sort(function () {
      return 0.5 - Math.random();
    });
    randomData.length = VALUE_PIC;

    return randomData;
  };

  // отсортировать по коментариям
  var getDiscussedData = function (data) {
    var discussedData = data.slice();
    discussedData.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    return discussedData;
  };

  // очистить контейнер с фотографиями
  var removePictures = function () {
    var pictures = picturesContainer.querySelectorAll('.picture');

    pictures.forEach(function (item) {
      picturesContainer.removeChild(item);
    });
  };

  // активация фильтра фотографий
  var getActivFilter = window.debounce(function (param) {
    removePictures();
    window.getPicturesContainer(param);
  });

  var onButtonClick = function (evt) {
    var filterMap = {
      'filter-popular': window.picturesData,
      'filter-random': getRandomData(window.picturesData),
      'filter-discussed': getDiscussedData(window.picturesData)
    };

    buttons.forEach(function (button) {
      button.classList.toggle('img-filters__button--active', false);
    });
    evt.target.classList.add('img-filters__button--active');

    var filterData = filterMap[evt.target.id];
    getActivFilter(filterData);
  };

  filterBlock.addEventListener('click', onButtonClick);
})();
