'use strict';
(function () {
  var dom = window.domElements;
  var markLocation = window.markLocation;
  var mapSize = {
    width: dom.map.getBoundingClientRect().width,
    height: dom.map.getBoundingClientRect().height
  };
  var mainPinSize = {};
  mainPinSize.width = dom.mainPin.getBoundingClientRect().width;
  mainPinSize.height = dom.mainPin.getBoundingClientRect().height;
  mainPinSize.lowelLimitMove = mapSize.height - mainPinSize.height;
  mainPinSize.rightLimitMove = mapSize.width - mainPinSize.width;
  var makeIsActivate = function (collection) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].removeAttribute('disabled');
    }
  };
  var mainPinMousedownHandler = function (evt) {
    evt.preventDefault();
    window.pageToActive();
    makeIsActivate(dom.fieldsets);
    var initialCoord = {
      x: evt.clientX,
      y: evt.clientY
    };
    var maimPinMouseMovehandler = function (moveEvt) {
      moveEvt.preventDefault();
      var top = dom.mainPin.offsetTop;
      var left = dom.mainPin.offsetLeft;
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
      markLocation.installPinAddress(dom.mainPin, true);
      dom.mainPin.style.top = styleTop;
      dom.mainPin.style.left = styleLeft;
    };
    var maimPinMouseUphandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', maimPinMouseMovehandler);
      document.removeEventListener('mouseup', maimPinMouseUphandler);
    };
    document.addEventListener('mousemove', maimPinMouseMovehandler);
    document.addEventListener('mouseup', maimPinMouseUphandler);

  };
  dom.mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  dom.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      mainPinMousedownHandler();
    }
  });
})();
