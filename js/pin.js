'use strict';
(function () {
  var dom = window.domElements;
  var generatedMarks = {};
  generatedMarks.generatedTemplate = function (element) {
    var clonePin = dom.pin.cloneNode(true);
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
    dom.inputs.address.value = value;
  };
  markLocation.installPinAddress(dom.mainPin, false);
  window.markLocation = markLocation;
  window.generatedMarks = generatedMarks;
})();
