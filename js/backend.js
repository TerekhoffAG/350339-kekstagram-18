'use strict';
(function () {
  var TIMEOUT = 10000;
  var SUCCESS_CODE = 200;

  var Url = {
    LOAD: 'https://js.dump.academy/kekstagram/data'
  };

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    // xhr.addEventListener('progress', function () {
    //   if (xhr.readyState === 3 && xhr.status === SUCCESS_CODE) {
    //     console.log('LOADING', xhr.readyState);
    //   }
    // });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', Url.LOAD);
    xhr.send();
  };

})();

