'use strict';

// Константы для мок данных
var QUANTITY_PHOTO = 25;
var FOLDER_PHOTO = 'photos/';
var FILE_EXTENSION_PHOTO = '.jpg';
var PATTERN_PATH_AVATAR = 'img/avatar-';
var FILE_EXTENSION_AVATAR = '.svg';
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var ARRAY_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var ARRAY_NAMES = ['Оля', 'Коля', 'Лада', 'Влад', 'Маша', 'Миша'];

// Генератор случайных целых натуральных чисел
var getRandomIntNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция возвращает полный путь до файла
var getPathFile = function (folder, increment, extension) {
  return folder + increment + extension;
};

// Функция возвращает объект - коментарий гостя
var getCommentGuest = function (namePhoto, namesGuests, commentsGuests) {
  var pathAvatar = getPathFile(PATTERN_PATH_AVATAR, namePhoto, FILE_EXTENSION_AVATAR);
  var messageGuest = commentsGuests [getRandomIntNumber(0, commentsGuests.length - 1)];
  var nameGuest = namesGuests [getRandomIntNumber(0, namesGuests.length - 1)];

  return {
    avatar: pathAvatar,
    message: messageGuest,
    name: nameGuest
  };
};

// Функция возвращает массив объектов - коментарии гостей
var createCommentsGuests = function (namesGuests, commentsGuests) {
  var arrayCommentsGuests = [];
  var quantityGuests = getRandomIntNumber(1, namesGuests.length);

  for (var i = 1; i <= quantityGuests; i++) {
    var iii = getRandomIntNumber(1, 6);
    var itemComment = getCommentGuest(iii, namesGuests, commentsGuests);
    arrayCommentsGuests.push(itemComment);
  }

  return arrayCommentsGuests;
};

// Функция возвращает объект - описание под фотографией пользователя
var createDescription = function (namePhoto) {
  var pathPhoto = getPathFile(FOLDER_PHOTO, namePhoto, FILE_EXTENSION_PHOTO);
  var likesGuests = getRandomIntNumber(MIN_LIKES, MAX_LIKES);
  var commentsGuests = createCommentsGuests(ARRAY_NAMES, ARRAY_COMMENTS);

  return {
    url: pathPhoto,
    description: 'Hi lOl',
    likes: likesGuests,
    comments: commentsGuests
  };
};

// Функция возвращает массив объектов - описании под фотографиями пользователей
var createArrayDescriptions = function (quantityItems) {
  var arrayDescriptions = [];

  for (var i = 1; i <= quantityItems; i++) {
    var itemDescription = createDescription(i);
    arrayDescriptions.push(itemDescription);
  }

  return arrayDescriptions;
};

// Массив объектов - описание под фотографией пользователя
var arrayMockData = createArrayDescriptions(QUANTITY_PHOTO);

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
var getPicturesContainer = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arrayMockData.length; i++) {
    var itemPicture = createNewPicture(arrayMockData[i]);
    fragment.appendChild(itemPicture);
  }

  picturesContainer.appendChild(fragment);
};

getPicturesContainer();

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
var showBigPicture = function (picture) {
  picture.classList.add('hidden');
  // picture.classList.remove('hidden'); заменить эту строку после раздела модули
  image.src = arrayMockData[0].url;
  likesImage.textContent = arrayMockData[0].likes;
  commentsImage.textContent = arrayMockData[0].comments.length;
  captionImage.textContent = arrayMockData[0].description;

  getСomments(arrayMockData[0].comments);
};

showBigPicture(bigPicture);

// Работа с формой загрузкой и редактированием фотографией пользователя

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

// Наложение эффектов на фотографию
var listEffects = document.querySelector('.effects__list');
// var imageUpload = document.querySelector('.img-upload__preview');
var selectorEffectLevel = document.querySelector('.effect-level');
// var inputEffectLevel = document.querySelector('.effect-level__value');

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
var lineRange = document.querySelector('.effect-level__line');
var pinRange = document.querySelector('.effect-level__pin');
var depthRange = document.querySelector('.effect-level__depth');
var inputEffectLevel = document.querySelector('.effect-level__value');

var RangeBlock = {
  PADDING: 20,
  MAX: 100,
  MIN: 0,
  RATIO: 100
};

var RATIO_LEVEL = 100;
var RATIO_LEVEL_BLUR = 0.05;
var RATIO_LEVEL_HEAT = 0.02;
var VALUE_SHIFT = 1;

var getLevelEffect = function (levelEffect, className) {
  var classImageUpload = {
    'effects__preview--chrome': 'grayscale(' + (levelEffect / RATIO_LEVEL) + ')',
    'effects__preview--sepia': 'sepia(' + (levelEffect / RATIO_LEVEL) + ')',
    'effects__preview--marvin': 'invert(' + levelEffect + '%)',
    'effects__preview--phobos': 'blur(' + (levelEffect * RATIO_LEVEL_BLUR) + 'px)',
    'effects__preview--heat': 'brightness(' + (VALUE_SHIFT + levelEffect * RATIO_LEVEL_HEAT) + ')'
  };

  var result = classImageUpload[className];
  imageUpload.style.filter = result;
};

var movePinRange = function (evt) {
  var limitMovementX = {
    min: lineRange.offsetLeft - RangeBlock.PADDING,
    max: lineRange.offsetLeft + lineRange.offsetWidth - RangeBlock.PADDING
  };

  var pinRangeCoord = pinRange.offsetLeft + evt.movementX;
  var pinRangePercent = (pinRangeCoord * RangeBlock.RATIO) / lineRange.offsetWidth;

  if (pinRangeCoord < limitMovementX.min) {
    pinRangePercent = RangeBlock.MIN;
  } else if (pinRangeCoord > limitMovementX.max) {
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

// Открытие и закрытие формы редактирования
var ESC_KEYCODE = 27;

var imgUploadBlock = document.querySelector('.img-upload');

var formEditImg = imgUploadBlock.querySelector('.img-upload__overlay');
var formEditImgOpen = imgUploadBlock.querySelector('#upload-file');
var formEditImgClose = imgUploadBlock.querySelector('#upload-cancel');

var onFormEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeForm();
  }
};

var openForm = function () {
  formEditImg.classList.remove('hidden');
  document.addEventListener('keydown', onFormEscPress);

  resetValueScale();
  blockScaleButtons.addEventListener('click', onButtonScaleClick);

  listEffects.addEventListener('click', onListEffectsClick);
  selectorEffectLevel.classList.add('hidden');
  resetEffects();

  pinRange.addEventListener('mousedown', onPinRangeMousedown);
};

var closeForm = function () {
  formEditImg.classList.add('hidden');
  document.removeEventListener('keydown', onFormEscPress);
  formEditImgOpen.value = '';

  blockScaleButtons.removeEventListener('click', onButtonScaleClick);

  listEffects.removeEventListener('click', onListEffectsClick);

  pinRange.removeEventListener('mousedown', onPinRangeMousedown);
};

formEditImgOpen.addEventListener('change', function () {
  openForm();
});

formEditImgClose.addEventListener('click', function () {
  closeForm();
});


