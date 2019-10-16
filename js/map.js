'use strict';
(function () {
  var Dom = {};
  Dom.map = document.querySelector('.map');
  Dom.form = document.querySelector('.ad-form');
  Dom.fieldset = Dom.form.querySelectorAll('fieldset');
  Dom.formAddress = Dom.form.querySelector('input[name="address"]');
  Dom.mainPin = Dom.map.querySelector('.map__pin--main');
  var mapSize = {
    width: Dom.map.getBoundingClientRect().width,
    height: Dom.map.getBoundingClientRect().height
  };
  var mainPinSize = {};
  mainPinSize.width = Dom.mainPin.getBoundingClientRect().width;
  mainPinSize.height = Dom.mainPin.getBoundingClientRect().height;
  mainPinSize.lowelLimitMove = mapSize.height - mainPinSize.height;
  mainPinSize.rightLimitMove = mapSize.width - mainPinSize.width;
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
      var top = Dom.mainPin.offsetTop;
      var left = Dom.mainPin.offsetLeft;
      var moveTop = moveEvt.clientY;
      var moveLeft = moveEvt.clientX;
      if (top <= 0) {
        top = 0;
      }
      if (top > mainPinSize.lowelLimitMove) {
        top = mainPinSize.lowelLimitMove;
      }
      if (left < 0) {
        left = 0;
      }
      if (left > mainPinSize.rightLimitMove) {
        left = mainPinSize.rightLimitMove;
      }
      var offset = {
        x: initialCoord.x - moveLeft,
        y: initialCoord.y - moveTop
      };
      initialCoord = {
        x: moveLeft,
        y: moveTop
      };
      var styleTop = (top - offset.y) + 'px';
      var styleLeft = (left - offset.x) + 'px';
      markLocation.installPinAddress(Dom.mainPin, true);
      Dom.mainPin.style.top = styleTop;
      Dom.mainPin.style.left = styleLeft;
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
    mainPinSize.height = pinHeight;
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
