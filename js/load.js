'use strict';

(function () {
  window.unLoad = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
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
  window.sendForm = function(url, form) {
    var formToSend = form;
    var formData = new FormData(formToSend);
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', url);
    xhr.send(formData);
  }
})();
