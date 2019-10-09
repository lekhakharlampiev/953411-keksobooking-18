'use strict';
(function () {
  var dom = {};
  dom.map = document.querySelector('.map');
  dom.form = document.querySelector('.ad-form');
  dom.fieldset = dom.form.querySelectorAll('fieldset');
  dom.formAddress = dom.form.querySelector('input[name="address"]');
  dom.mainPin = dom.map.querySelector('.map__pin--main');

  var makeIsActivate = function (collection) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].removeAttribute('disabled');
    }
  };
  var markLocation = {};
  markLocation.getMarkCoord = function (mark, active) {
    var markRect = mark.getBoundingClientRect();
    var parameters = {
      markX: markRect.x,
      markY: markRect.y,
      halfHeight: markRect.height / 2,
      halfWidth: markRect.width / 2,
      pinHeight: markLocation.getPinHeight(mark),
    };
    var markCoordinate = {};
    markCoordinate.x = parameters.markX + parameters.halfWidth;
    markCoordinate.y = active ? parameters.markY + parameters.pinHeight : parameters.markY + parameters.halfHeight;
    return markCoordinate;
  };
  markLocation.getPinHeight = function (mark) { // высота главной метки состоит
    var img = dom.mainPin.querySelector('img'); // из высоты картинки внутри  метки без отступов +
    var pinAfterStyle = getComputedStyle(mark, '::after'); // высота псевдоэлемента
    var imgHeight = img.clientHeight;
    var afterHeight = parseInt(pinAfterStyle.height, 10);
    var pinHeight = afterHeight + imgHeight;
    return pinHeight;
  };
  var installPinAddress = function (pinMap, active) {
    var coordinate = markLocation.getMarkCoord(pinMap, active);
    var y = Math.floor(coordinate.y);
    var x = Math.floor(coordinate.x);
    var top = y;
    var left = x;
    if (active) {
      top = y + ' расстояние до острого конца по вертикали';
      left = x + ' расстояние до острого конца по горизонтали';
    }
    var value = left + ', ' + top;
    dom.formAddress.value = value;
  };
  var mainPinMousedownHandler = function () {
    dom.map.classList.remove('map--faded');
    dom.form.classList.remove('ad-form--disabled');
    installPinAddress(dom.mainPin, true);
    makeIsActivate(dom.fieldset);
  };
  installPinAddress(dom.mainPin, false);
  dom.mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  dom.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      mainPinMousedownHandler();
    }
  });
})();
