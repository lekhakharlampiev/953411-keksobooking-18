'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var dataLoad = [];
  var dom = window.domElements;
  var buildDomFragment = function (template) {
    var fragment = new DocumentFragment();
    var clone = template.cloneNode(true);
    fragment.prepend(clone);
    return fragment;
  };

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
    var fragment = new DocumentFragment();
    for (var i = 0; i < dataArray.length; i++) {
      fragment.append(generatedMarks.generatedTemplate(dataArray[i]));
    }
    return fragment;
  };
  var onSuccess = function (data) {
    dataLoad = data;
    window.data = dataLoad;
    var similarAds = generatedMarks.buildingMarks(dataLoad);
    dom.pinsMap.prepend(similarAds);
  };
  var onError = function () {
    dom.main.prepend(window.errorMassege);
  };
  window.errorMassege = buildDomFragment(dom.error);
  window.data = window.unLoad(URL, onSuccess, onError);
})();
