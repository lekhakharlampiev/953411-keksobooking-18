'use strict';
(function () {
  var templates = {
    pin: document.querySelector('#pin').content,
    adCard: document.querySelector('#card').content,
    errorMassage: document.querySelector('#error').content,
    successMassage: document.querySelector('#success').content
  };
  var domElements = {};
  domElements.main = document.querySelector('main');
  domElements.map = document.querySelector('.map');
  domElements.mapFilter = domElements.map.querySelector('.map__filters-container');
  domElements.pinsMap = document.querySelector('.map__pins');
  domElements.adCard = templates.adCard.querySelector('.map__card');
  domElements.mainPin = domElements.map.querySelector('.map__pin--main');
  domElements.pin = templates.pin.querySelector('.map__pin');
  domElements.error = templates.errorMassage.querySelector('.error');
  domElements.success = templates.successMassage.querySelector('.success');
  domElements.filter = {};
  domElements.filter.form = document.querySelector('.map__filters');
  domElements.filter.selects = domElements.filter.form.querySelectorAll('select');
  domElements.filter.checkbox = domElements.filter.form.querySelectorAll('.map__checkbox');
  domElements.filter.type = domElements.filter.form.querySelector('#housing-type');
  domElements.filter.price = domElements.filter.form.querySelector('#housing-price');
  domElements.filter.rooms = domElements.filter.form.querySelector('#housing-rooms');
  domElements.filter.guests = domElements.filter.form.querySelector('#housing-guests');
  domElements.form = document.querySelector('.ad-form');
  domElements.fieldsets = domElements.form.querySelectorAll('fieldset');
  domElements.formReset = domElements.form.querySelector('.ad-form__reset');
  domElements.inputs = {};
  domElements.inputs.title = domElements.form.querySelector('#title');
  domElements.inputs.address = domElements.form.querySelector('#address');
  domElements.inputs.type = domElements.form.querySelector('#type');
  domElements.inputs.price = domElements.form.querySelector('#price');
  domElements.inputs.timeFildset = domElements.form.querySelector('.ad-form__element--time');
  domElements.inputs.timeIn = domElements.form.querySelector('#timein');
  domElements.inputs.timeOut = domElements.form.querySelector('#timeout');
  domElements.inputs.rooms = domElements.form.querySelector('#room_number');
  domElements.inputs.capacity = domElements.form.querySelector('#capacity');
  domElements.inputs.guests = domElements.inputs.capacity.querySelectorAll('option');
  domElements.inputs.features = domElements.form.querySelector('.features');
  domElements.inputs.checkbox = domElements.inputs.features.querySelectorAll('input');
  domElements.inputs.description = domElements.form.querySelector('#description');
  window.domElements = domElements;
})();
