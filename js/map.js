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

  var getLocation = function (elem) {
    var element = elem.getBoundingClientRect();
    var coord = {};
    coord.top = element.y;
    coord.left = element.x;
    return coord;

  };
  var getPinLocation = function (pinMap, active) {
    var coordinate = pinMap.getBoundingClientRect();
    var position = getLocation(pinMap);
    var width = coordinate.width;
    var height = coordinate.height;
    if (!active) {
      return {
        top: height / 2 + position.top,
        left: width / 2 + position.left,
      };
    }
    return {
      top: height + position.top + 16, // 16 - расстояние от края элемента главной метки
      left: width / 2 + position.left // до острого кончика псевдоэлемента
    };
  };
  var installPinAddress = function (pinMap, active) {
    var coordinate = getPinLocation(pinMap, active);
    var y = Math.floor(coordinate.top);
    var x = Math.floor(coordinate.left);
    var top = y + ' расстояние до острого конца по вертикали';
    var left = x + ' расстояние до острого конца по горизонтали';
    var value = left + ', ' + top;
    dom.formAddress.value = value;
  };
  installPinAddress(dom.mainPin, false);

  var mainPinMousedownHandler = function () {
    dom.map.classList.remove('map--faded');
    dom.form.classList.remove('ad-form--disabled');
    installPinAddress(dom.mainPin, true);
    makeIsActivate(dom.fieldset);
  };

  dom.mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  dom.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      mainPinMousedownHandler();
    }
  });
})();
