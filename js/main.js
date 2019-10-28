'use strict';
(function () {
  var dom = window.domElements;
  var inputs = dom.inputs;
  var load = window.load;
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
    toClearInputs: function () {
      inputs.title.value = '';
      inputs.type.value = 'flat';
      inputs.price.value = '';
      inputs.price.setAttribute('placeholder', '1000');
      inputs.rooms.value = '1';
      window.inputRoomsChangeHandler();
      inputs.capacity.value = '1';
      inputs.timeIn.value = '12:00';
      inputs.timeOut.value = '12:00';
      inputs.checkbox.forEach(function (elem) {
        elem.checked = false;
        elem.value = '';
      });
      inputs.description.value = '';
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
  loading.onError = function () {
    var massage = load.errorMassage();
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
    stepsDeactivation.toClearInputs();
    stepsDeactivation.toClearMaps();
    stepsDeactivation.returnPinstartCoord();
    dom.map.classList.add('map--faded');
    dom.form.classList.add('ad-form--disabled');
    markLocation.installPinAddress(dom.mainPin, false);
    makeDisabled(dom.fieldsets);
  };
  window.pageToActive = function () {
    load.unLoad(URL, loading.onSuccess, loading.onError);
  };
  window.clearMaps = stepsDeactivation.toClearMaps;
})();
