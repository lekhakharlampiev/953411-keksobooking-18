'use strict';
(function () {
  var DOM = window.domElements;
  var MARK_LOCATION = window.markLocation;

  var mapSize = {
    width: DOM.map.getBoundingClientRect().width,
    height: DOM.map.getBoundingClientRect().height
  };

  var mainPinSize = {};
  mainPinSize.width = DOM.mainPin.getBoundingClientRect().width;
  mainPinSize.height = DOM.mainPin.getBoundingClientRect().height;
  mainPinSize.lowelLimitMove = mapSize.height - MARK_LOCATION.getPinHeight(DOM.mainPin);
  mainPinSize.rightLimitMove = mapSize.width - mainPinSize.width / 2;
  mainPinSize.leftLimitMove = -(mainPinSize.width / 2);
  var makeIsActivate = function (collection) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].removeAttribute('disabled');
    }
  };

  var mainPinMousedownHandler = function (evt) {
    evt.preventDefault();
    if (DOM.map.classList.contains('map--faded')) {
      window.pageToActive();
    }
    makeIsActivate(DOM.fieldsets);
    var initialCoord = {
      x: evt.clientX,
      y: evt.clientY
    };
    var maimPinMouseMovehandler = function (moveEvt) {
      moveEvt.preventDefault();
      var top = DOM.mainPin.offsetTop;
      var left = DOM.mainPin.offsetLeft;
      var moveTop = moveEvt.clientY;
      var moveLeft = moveEvt.clientX;
      if (top <= 0) {
        top = 0;
      }
      if (top > mainPinSize.lowelLimitMove) {
        top = mainPinSize.lowelLimitMove;
      }
      if (left < mainPinSize.leftLimitMove) {
        left = mainPinSize.leftLimitMove;
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
      MARK_LOCATION.installPinAddress(DOM.mainPin, true);
      DOM.mainPin.style.top = styleTop;
      DOM.mainPin.style.left = styleLeft;
    };
    var maimPinMouseUphandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', maimPinMouseMovehandler);
      document.removeEventListener('mouseup', maimPinMouseUphandler);
    };
    document.addEventListener('mousemove', maimPinMouseMovehandler);
    document.addEventListener('mouseup', maimPinMouseUphandler);

  };

  DOM.mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  DOM.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      mainPinMousedownHandler();
    }
  });
})();
