'use strict';

(function () {
  window.unLoad = function (url, onSuccess, onError) {
    var xhr = new this.XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    };
    xhr.open('GET', url);
    xhr.send();
  };
})();
