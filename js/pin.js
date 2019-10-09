'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var Dom = {};
  Dom.main = document.querySelector('main');
  Dom.pinsMap = document.querySelector('.map__pins');
  Dom.templatePin = document.querySelector('#pin').content;
  Dom.pin = Dom.templatePin.querySelector('.map__pin');
  Dom.tamplateError = document.querySelector('#error').content;
  Dom.error = Dom.tamplateError.querySelector('.error');
  // функция-шаблон для создания метки
  var generatedPin = function (element) {
    var clonePin = Dom.pin.cloneNode(true);
    var img = clonePin.querySelector('img');
    clonePin.style.left = element.location.x + 25 + 'px';
    clonePin.style.top = element.location.y + 70 + 'px';
    img.src = element.author.avatar;
    img.alt = element.offer.title;
    return clonePin;
  };
  // функция создания меток на основе массива с данными
  var getSimilarAds = function (dataArray) {
    var fragment = new DocumentFragment();
    for (var i = 0; i < dataArray.length; i++) {
      fragment.prepend(generatedPin(dataArray[i]));
    }
    return fragment;
  };
  // сообщение об ошибке загрузки данных
  var showErrorMassege = function () {
    var fragment = new DocumentFragment();
    var clone = Dom.error.cloneNode(true);
    fragment.prepend(clone);
    return fragment;
  };
  var onSuccess = function (data) {
    var similarAds = getSimilarAds(data);
    Dom.pinsMap.prepend(similarAds);
  };
  var onError = function () {
    Dom.main.prepend(errorMassege);
  };
  var errorMassege = showErrorMassege();
  window.unLoad(URL, onSuccess, onError);
})();
