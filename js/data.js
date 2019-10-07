'use strict';
(function () {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    try {
      console.log(xhr.response);
    } catch (err) {
      console.error(err.massage);
    }
  });
  xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
  xhr.send();

})();
