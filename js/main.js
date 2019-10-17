'use strict';
(function () {
  var dom = window.domElements;
  var startCoord = {
    x: dom.mainPin.getBoundingClientRect().x,
    y: dom.mainPin.getBoundingClientRect().y
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
      dom.adCard.remove();
      allPins.forEach(function (elem) {
        elem.remove();
      });
    },
    returnPinstartCoord: function () {
      var x = startCoord.x + 'px';
      var y = startCoord.y + 'px';
      dom.mainPin.style.top = y;
      dom.mainPin.style.left = x;
    },
  };
  window.pageToInactive = function () {
    stepsDeactivation.toClearInputs(dom.fieldsets);
    stepsDeactivation.toClearMaps();
    stepsDeactivation.returnPinstartCoord();
    dom.map.classList.add('map--faded');
  };
})();
