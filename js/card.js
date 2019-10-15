'use strict';
(function () {
  var Dom = {};
  Dom.map = document.querySelector('.map');
  Dom.mapFilter = Dom.map.querySelector('.map__filters-container');
  Dom.mapPins = Dom.map.querySelector('.map__pins');
  Dom.cardTamplate = document.querySelector('#card').content;
  Dom.card = Dom.cardTamplate.querySelector('.map__card');
  var data = [];
  var promo = document.querySelector('.promo');
  var pinButtonClickhandler = function (evt) {
    Dom.mapFilter.before(Dom.card);
    console.log(evt.currentTarget);
  };
  promo.addEventListener('click', function () {
    data = window.data.slice();
    console.log(data);
    var pinButtons = Dom.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinButtons.forEach(function (elem) {
      elem.addEventListener('click', pinButtonClickhandler);
    });
  });

})();
