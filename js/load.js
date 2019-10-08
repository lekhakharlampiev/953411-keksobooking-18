'use strict';

(function () {
  window.unLoad = function (url, onSuccess) {
    var xhr = new this.XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      }
    };
    xhr.open('GET', url);
    xhr.send();
  };
})();
