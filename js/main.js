'use strict';
(function () {
  var dom = window.domElements;
  var markLocation = window.markLocation;
  var generated = window.generatedMarks;
  window.data = [];
  var URL = 'https://js.dump.academy/keksobooking/data';
  var makeDisabled = function (collection) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].setAttribute('disabled', 'disabled');
    }
  };
  makeDisabled(dom.fieldsets);
  window.makeDisabled = makeDisabled;
  var startCoord = {
    x: dom.mainPin.style.left,
    y: dom.mainPin.style.top
  };
  var stepsDeactivation = {
    toClearInputs: function (container) {
      container.forEach(function (element) {
        var inputs = element.querySelectorAll('[name]');
        var length = inputs.length;
        if (length === 1) {
          inputs[0].value = '';
        }
        if (length > 1) {
          inputs.forEach(function (elem) {
            if (elem.checked) {
              elem.checked = false;
            }
            elem.value = '';
          });
        }
      });
    },
    toClearMaps: function () {
      var allPins = dom.pinsMap.querySelectorAll('.map__pin:not(.map__pin--main)');
      var adCard = document.querySelector('.map__card');
      if (adCard) {
        adCard.remove();
      }
      allPins.forEach(function (elem) {
        elem.remove();
      });
    },
    returnPinstartCoord: function () {
      var x = startCoord.x;
      var y = startCoord.y;
      dom.mainPin.style.top = y;
      dom.mainPin.style.left = x;
    },
  };
  var loading = {};
  loading.closeButtonclickHandler = function (evt) {
    evt.preventDefault();
    var massage = dom.main.querySelector('.error');
    massage.remove();
  };
  loading.errorMassage = function () {
    var clone = dom.error.cloneNode(true);
    var closeButton = clone.querySelector('.error__button');
    closeButton.addEventListener('click', loading.closeButtonclickHandler);
    return clone;
  };
  loading.onError = function () {
    var massage = loading.errorMassage();
    dom.main.prepend(massage);
  };
  loading.onSuccess = function (data) {
    var dataLoad = data;
    window.data = dataLoad;
    var ads = generated.buildingMarks(data);
    dom.pinsMap.prepend(ads);
    dom.map.classList.remove('map--faded');
    dom.form.classList.remove('ad-form--disabled');
    window.renderPinCards();
    markLocation.installPinAddress(dom.mainPin, true);
    window.startingFilter();
  };
  window.pageToInactive = function () {
    stepsDeactivation.toClearInputs(dom.fieldsets);
    stepsDeactivation.toClearMaps();
    stepsDeactivation.returnPinstartCoord();
    dom.map.classList.add('map--faded');
    dom.form.classList.add('ad-form--disabled');
    makeDisabled(dom.fieldsets);
  };
  window.pageToActive = function () {
    window.unLoad(URL, loading.onSuccess, loading.onError);
  };
  window.clearMaps = stepsDeactivation.toClearMaps;
})();
