'use strict';
(function () {
  var Dom = {};
  Dom.map = document.querySelector('.map');
  Dom.form = document.querySelector('.ad-form');
  Dom.fieldset = Dom.form.querySelectorAll('fieldset');
  Dom.formAddress = Dom.form.querySelector('input[name="address"]');
  Dom.mainPin = Dom.map.querySelector('.map__pin--main');

  var makeIsActivate = function (collection) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].removeAttribute('disabled');
    }
  };
  var mainPinMousedownHandler = function (evt) {
    evt.preventDefault();
    Dom.map.classList.remove('map--faded');
    Dom.form.classList.remove('ad-form--disabled');
    markLocation.installPinAddress(Dom.mainPin, true);
    window.renderPinCards();
    makeIsActivate(Dom.fieldset);
    var initialCoord = {
      x: evt.clientX,
      y: evt.clientY
    };
    var maimPinMouseMovehandler = function (moveEvt) {
      moveEvt.preventDefault();
      var offset = {
        x: initialCoord.x - moveEvt.clientX,
        y: initialCoord.y - moveEvt.clientY
      };
      initialCoord = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      markLocation.installPinAddress(Dom.mainPin, true);
      Dom.mainPin.style.top = (Dom.mainPin.offsetTop - offset.y) + 'px';
      Dom.mainPin.style.left = (Dom.mainPin.offsetLeft - offset.x) + 'px';
    };
    var maimPinMouseUphandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', maimPinMouseMovehandler);
      document.removeEventListener('mouseup', maimPinMouseUphandler);
    };
    document.addEventListener('mousemove', maimPinMouseMovehandler);
    document.addEventListener('mouseup', maimPinMouseUphandler);

  };
  Dom.mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  Dom.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      mainPinMousedownHandler();
    }
  });
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
    var img = Dom.mainPin.querySelector('img'); // из высоты картинки внутри  метки без отступов +
    var pinAfterStyle = getComputedStyle(mark, '::after'); // высота псевдоэлемента
    var imgHeight = img.clientHeight;
    var afterHeight = parseInt(pinAfterStyle.height, 10);
    var pinHeight = afterHeight + imgHeight;
    return pinHeight;
  };
  markLocation.installPinAddress = function (pinMap, active) {
    var coordinate = markLocation.getMarkCoord(pinMap, active);
    var y = Math.floor(coordinate.y);
    var x = Math.floor(coordinate.x);
    var top = y;
    var left = x;
    if (active) {
      top = y;
      left = x;
    }
    var value = left + ', ' + top;
    Dom.formAddress.value = value;
  };
  markLocation.installPinAddress(Dom.mainPin, false);
  window.markLocation = markLocation;
})();
