'use strict';
(function () {
  var DOM = window.domElements;
  var INPUTS = DOM.inputs;
  var FILTER = DOM.filter;
  var LOAD = window.load;
  var MARK_LOCATION = window.markLocation;
  var GENERATED = window.generatedMarks;
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.data = [];

  var makeDisabled = function (collection) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].setAttribute('disabled', 'disabled');
    }
  };

  makeDisabled(DOM.fieldsets);
  window.makeDisabled = makeDisabled;
  var startCoord = {
    x: DOM.mainPin.style.left,
    y: DOM.mainPin.style.top
  };

  var stepsDeactivation = {
    toClearInputs: function () {
      INPUTS.title.value = '';
      INPUTS.type.value = 'flat';
      INPUTS.price.value = '';
      INPUTS.price.setAttribute('placeholder', '1000');
      INPUTS.rooms.value = '1';
      window.inputRoomsChangeHandler();
      INPUTS.capacity.value = '1';
      INPUTS.timeIn.value = '12:00';
      INPUTS.timeOut.value = '12:00';
      INPUTS.checkbox.forEach(function (elem) {
        elem.checked = false;
        elem.value = '';
      });
      INPUTS.description.value = '';
    },
    toCleanFilter: function () {
      var selects = FILTER.selects;
      var checkbox = FILTER.checkbox;
      selects.forEach(function (select) {
        select.value = 'any';
      });
      checkbox.forEach(function (chekbox) {
        chekbox.checked = false;
      });
    },
    toClearMaps: function () {
      var allPins = DOM.pinsMap.querySelectorAll('.map__pin:not(.map__pin--main)');
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
      DOM.mainPin.style.top = y;
      DOM.mainPin.style.left = x;
    },
  };

  var loading = {};
  loading.onError = function () {
    var massage = DOM.errorMassage();
    DOM.main.prepend(massage);
  };
  loading.onSuccess = function (data) {
    var dataLoad = data;
    window.data = dataLoad;
    var ads = GENERATED.buildingMarks(data);
    DOM.pinsMap.append(ads);
    DOM.map.classList.remove('map--faded');
    DOM.form.classList.remove('ad-form--disabled');
    window.renderPinCards();
    MARK_LOCATION.installPinAddress(DOM.mainPin, true);
    window.startingFilter();
  };
  // переход страницы в неактивное состояние
  window.pageToInactive = function () {
    stepsDeactivation.toClearInputs();
    stepsDeactivation.toCleanFilter();
    stepsDeactivation.toClearMaps();
    stepsDeactivation.returnPinstartCoord();
    DOM.map.classList.add('map--faded');
    DOM.form.classList.add('ad-form--disabled');
    MARK_LOCATION.installPinAddress(DOM.mainPin, false);
    makeDisabled(DOM.fieldsets);
  };
  // переход страницы в активное состояние
  window.pageToActive = function () {
    LOAD.unLoad(URL, loading.onSuccess, loading.onError);
  };

  window.clearMaps = stepsDeactivation.toClearMaps;
})();
