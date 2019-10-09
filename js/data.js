'use strict';
(function () {
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

  window.data = arrayMockData;

})();