'use strict';
(function () {
  // Работа с большой фотографией пользователя
  var bigPicture = document.querySelector('.big-picture');
  var image = bigPicture.querySelector('.big-picture__img img');
  var likesImage = bigPicture.querySelector('.likes-count');
  var commentsImage = bigPicture.querySelector('.comments-count');
  var captionImage = bigPicture.querySelector('.social__caption');
  var commentsCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  var commentsBlock = bigPicture.querySelector('.social__comments');
  var oneCommentTemplate = commentsBlock.querySelector('.social__comment');

  var picturesContainer = document.querySelector('.pictures');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

  // Функция создаёт один коментарий из шаблона под большой фотографией
  var createСomment = function (item) {
    var oneComment = oneCommentTemplate.cloneNode(true);
    var commentPicture = oneComment.querySelector('.social__picture');
    var commentText = oneComment.querySelector('.social__text');

    commentPicture.src = item.avatar;
    commentPicture.alt = item.name;
    commentText.textContent = item.message;

    return oneComment;
  };

  // Функция создаёт блок коментариев из шаблона под большой фотографией
  var getСomments = function (itemPhoto) {
    commentsCount.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < itemPhoto.length; i++) {
      var itemComment = createСomment(itemPhoto[i]);
      fragment.appendChild(itemComment);
    }

    commentsBlock.innerHTML = '';
    commentsBlock.appendChild(fragment);
  };

  // Функция показывает большую фотографию с лайками и коментариями
  var openBigPicture = function (data, index) {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);

    image.src = data[index].url;
    likesImage.textContent = data[index].likes;
    commentsImage.textContent = data[index].comments.length;
    captionImage.textContent = data[index].description;

    getСomments(data[index].comments);
  };

  // Открытие и закрытие просмотра фотографии в полноразмерном режиме
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  picturesContainer.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      var indexPhoto = evt.target.attributes[1].value.replace(/[^\d]/g, '');
      openBigPicture(window.picturesData, indexPhoto - 1);
    }
  });

  picturesContainer.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE && evt.target.classList.contains('picture')) {
      var indexPhoto = evt.target.firstElementChild.attributes[1].value.replace(/[^\d]/g, '');
      openBigPicture(window.picturesData, indexPhoto - 1);
    }
  });

  bigPictureClose.addEventListener('click', function () {
    closeBigPicture();
  });

})();
