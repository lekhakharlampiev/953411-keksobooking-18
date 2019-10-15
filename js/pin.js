'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var dataLoad = [];
  var Dom = {};
  Dom.main = document.querySelector('main');
  Dom.pinsMap = document.querySelector('.map__pins');
  Dom.templatePin = document.querySelector('#pin').content;
  Dom.pin = Dom.templatePin.querySelector('.map__pin');
  Dom.tamplateAdCard = document.querySelector('#card').content;
  Dom.adCard = Dom.tamplateAdCard.querySelector('.map__card');
  Dom.tamplateError = document.querySelector('#error').content;
  Dom.error = Dom.tamplateError.querySelector('.error');
  window.main = Dom.main;
  var buildDomFragment = function (template) {
    var fragment = new DocumentFragment();
    var clone = template.cloneNode(true);
    fragment.prepend(clone);
    return fragment;
  };

  var generatedMarks = {};
  generatedMarks.generatedTemplate = function (element) {
    var clonePin = Dom.pin.cloneNode(true);
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
    Dom.pinsMap.prepend(similarAds);
  };
  var onError = function () {
    Dom.main.prepend(window.errorMassege);
  };
  window.errorMassege = buildDomFragment(Dom.error);
  window.data = window.unLoad(URL, onSuccess, onError);
})();
