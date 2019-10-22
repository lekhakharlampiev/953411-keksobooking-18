'use strict';

(function () {
  var dom = window.domElements;
  var load = {};
  load.unLoad = function (url, onSuccess, onError) {
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
  load.sendForm = function (url, form, onSuccess, onError) {
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = function () {
      if (xhr.status === 200) {
        onSuccess();
      } else {
        onError();
      }
    };
    xhr.open('POST', url);
    xhr.send(formData);
  };
  load.closeButtonClickHandler = function (evt) {
    evt.preventDefault();
    var massage = dom.main.querySelector('.error');
    massage.remove();
    document.removeEventListener('keydown', load.errorKeydownHandler);
  };
  load.errorKeydownHandler = function (evt) {
    if (evt.keyCode === 27) {
      var massage = dom.main.querySelector('.error');
      massage.remove();
    }
    document.removeEventListener('keydown', load.errorKeydownHandler);
  };
  load.errorMassage = function () {
    var clone = dom.error.cloneNode(true);
    var closeButton = clone.querySelector('.error__button');
    closeButton.addEventListener('click', load.closeButtonClickHandler);
    document.addEventListener('keydown', load.errorKeydownHandler);
    return clone;
  };
  window.load = load;
})();
