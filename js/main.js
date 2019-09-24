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
  picture.classList.remove('hidden');

  image.src = arrayMockData[0].url;
  likesImage.textContent = arrayMockData[0].likes;
  commentsImage.textContent = arrayMockData[0].comments.length;
  captionImage.textContent = arrayMockData[0].description;

  getСomments(arrayMockData[0].comments);
};

showBigPicture(bigPicture);
