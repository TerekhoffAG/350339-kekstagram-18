'use strict';
(function () {
  // Переменные для создание DOM элементов
  var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
  var photo = templatePicture.querySelector('img');
  var comments = templatePicture.querySelector('.picture__comments');
  var likes = templatePicture.querySelector('.picture__likes');
  var picturesContainer = document.querySelector('.pictures');

  // Функция создаёт объект DOM на основе шаблона - фотография пользователя
  var createNewPicture = function (pictureDescription) {
    photo.src = pictureDescription.url;
    comments.textContent = pictureDescription.comments.length;
    likes.textContent = pictureDescription.likes;

    return templatePicture.cloneNode(true);
  };

  // Функция вставляет в разметку объекты DOM - фотография пользователя
  var getPicturesContainer = function (data) {
    window.picturesData = data;

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      var itemPicture = createNewPicture(data[i]);
      fragment.appendChild(itemPicture);
    }

    picturesContainer.appendChild(fragment);
  };

  // загрузка данных с сервера
  window.load(getPicturesContainer, window.openPopupError);

})();
