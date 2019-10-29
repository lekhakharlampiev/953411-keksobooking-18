'use strict';
(function () {
  var DOM = window.domElements;

  var generatedMarks = {};
  generatedMarks.generatedTemplate = function (element) {
    var clonePin = DOM.pin.cloneNode(true);
    var img = clonePin.querySelector('img');
    clonePin.style.left = element.location.x + 25 + 'px';
    clonePin.style.top = element.location.y + 70 + 'px';
    img.src = element.author.avatar;
    img.alt = element.offer.title;
    return clonePin;
  };
  generatedMarks.buildingMarks = function (dataArray) {
    var dataLength = dataArray.length > 5 ? 5 : dataArray.length;
    var fragment = new DocumentFragment();
    for (var i = 0; i < dataLength; i++) {
      fragment.append(generatedMarks.generatedTemplate(dataArray[i]));
    }
    return fragment;
  };

  var markLocation = {};
  markLocation.getMarkCoord = function (mark, active) {
    var markRect = mark.getBoundingClientRect();
    var parameters = {
      markX: markRect.x + pageXOffset,
      markY: markRect.y + pageYOffset,
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
    var img = DOM.mainPin.querySelector('img'); // из высоты картинки внутри  метки без отступов +
    var pinAfterStyle = getComputedStyle(mark, '::after'); // высота псевдоэлемента
    var imgHeight = img.clientHeight;
    var afterHeight = parseInt(pinAfterStyle.height, 10);
    var pinHeight = afterHeight + imgHeight;
    window.mainPinHeigth = pinHeight;
    return pinHeight;
  };
  markLocation.installPinAddress = function (pinMap, active) {
    var coordinate = markLocation.getMarkCoord(pinMap, active);
    var y = Math.floor(coordinate.y);
    var x = Math.floor(coordinate.x);
    var top = y;
    if (y < 130) {
      top = 130;
    }
    if (y > 630) {
      top = 630;
    }
    var left = x;
    var value = left + ', ' + top;
    DOM.inputs.address.value = value;
  };


  window.markLocation = markLocation;
  window.generatedMarks = generatedMarks;
})();
