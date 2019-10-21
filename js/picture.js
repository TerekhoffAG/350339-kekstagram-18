'use strict';
(function () {
  // Работа с большой фотографией пользователя
  var LIMIT_PIC = 5;

  var counter;
  var comments;
  var cutComments;

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
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < itemPhoto.length; i++) {
      var itemComment = createСomment(itemPhoto[i]);
      fragment.appendChild(itemComment);
    }

    commentsBlock.innerHTML = '';
    commentsBlock.appendChild(fragment);
  };

  // Функция-обработчик добовляет по 5 коментариев под фотографией
  var onLoaderClick = function () {
    if (comments.length - counter > LIMIT_PIC) {
      counter += LIMIT_PIC;
      cutComments = comments.slice(0, counter);
    } else {
      cutComments = comments;
      commentsLoader.classList.add('visually-hidden');
    }

    getСomments(cutComments);
    commentsCount.childNodes[0].textContent = cutComments.length + ' из ';
  };

  // Функция показывает большую фотографию с лайками и коментариями
  var openBigPicture = function (data, index) {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);

    image.src = data[index].url;
    likesImage.textContent = data[index].likes;
    commentsImage.textContent = data[index].comments.length;
    captionImage.textContent = data[index].description;

    counter = LIMIT_PIC;
    comments = data[index].comments;

    if (data[index].comments.length <= LIMIT_PIC) {
      commentsCount.classList.add('visually-hidden');
      commentsLoader.classList.add('visually-hidden');

      getСomments(data[index].comments);
    } else {
      cutComments = comments.slice(0, counter);
      getСomments(cutComments);

      commentsLoader.addEventListener('click', onLoaderClick);
    }
  };

  // Открытие и закрытие просмотра фотографии в полноразмерном режиме
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    commentsCount.classList.remove('visually-hidden');
    commentsLoader.classList.remove('visually-hidden');
    commentsCount.childNodes[0].textContent = '5 из ';

    document.removeEventListener('keydown', onPopupEscPress);
    commentsLoader.removeEventListener('click', onLoaderClick);
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
