'use strict';
(function () {
  var Templates = {
    pin: document.querySelector('#pin').content,
    adCard: document.querySelector('#card').content,
    errorMassage: document.querySelector('#error').content,
    successMassage: document.querySelector('#success').content
  };

  var DomElements = {};
  DomElements.main = document.querySelector('main');
  DomElements.map = document.querySelector('.map');
  DomElements.mapFilter = DomElements.map.querySelector('.map__filters-container');
  DomElements.pinsMap = document.querySelector('.map__pins');
  DomElements.adCard = Templates.adCard.querySelector('.map__card');
  DomElements.mainPin = DomElements.map.querySelector('.map__pin--main');
  DomElements.pin = Templates.pin.querySelector('.map__pin');
  DomElements.error = Templates.errorMassage.querySelector('.error');
  DomElements.success = Templates.successMassage.querySelector('.success');
  DomElements.filter = {};
  DomElements.filter.form = document.querySelector('.map__filters');
  DomElements.filter.selects = DomElements.filter.form.querySelectorAll('select');
  DomElements.filter.checkbox = DomElements.filter.form.querySelectorAll('.map__checkbox');
  DomElements.filter.type = DomElements.filter.form.querySelector('#housing-type');
  DomElements.filter.price = DomElements.filter.form.querySelector('#housing-price');
  DomElements.filter.rooms = DomElements.filter.form.querySelector('#housing-rooms');
  DomElements.filter.guests = DomElements.filter.form.querySelector('#housing-guests');
  DomElements.form = document.querySelector('.ad-form');
  DomElements.fieldsets = DomElements.form.querySelectorAll('fieldset');
  DomElements.formReset = DomElements.form.querySelector('.ad-form__reset');
  DomElements.inputs = {};
  DomElements.inputs.title = DomElements.form.querySelector('#title');
  DomElements.inputs.address = DomElements.form.querySelector('#address');
  DomElements.inputs.type = DomElements.form.querySelector('#type');
  DomElements.inputs.price = DomElements.form.querySelector('#price');
  DomElements.inputs.timeFildset = DomElements.form.querySelector('.ad-form__element--time');
  DomElements.inputs.timeIn = DomElements.form.querySelector('#timein');
  DomElements.inputs.timeOut = DomElements.form.querySelector('#timeout');
  DomElements.inputs.rooms = DomElements.form.querySelector('#room_number');
  DomElements.inputs.capacity = DomElements.form.querySelector('#capacity');
  DomElements.inputs.guests = DomElements.inputs.capacity.querySelectorAll('option');
  DomElements.inputs.features = DomElements.form.querySelector('.features');
  DomElements.inputs.checkbox = DomElements.inputs.features.querySelectorAll('input');
  DomElements.inputs.description = DomElements.form.querySelector('#description');

  window.domElements = DomElements;
})();
