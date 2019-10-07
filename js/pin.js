'use strict';
(function () {
  var dom = {};
  dom.pinsMap = document.querySelector('.map__pins');
  dom.template = document.querySelector('#pin').content;
  dom.pin = dom.template.querySelector('.map__pin');
  // функция-шаблон для создания метки
  var generatedPin = function (element) {
    var clonePin = dom.pin.cloneNode(true);
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
  var similarAds = getSimilarAds(window.ads);
  // отрисовка меток на карте
  dom.pinsMap.prepend(similarAds);
})();
