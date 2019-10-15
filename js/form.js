'use strict';
(function () {
  var form = {};
  form.adForm = document.querySelector('.ad-form');
  form.fildsets = form.adForm.querySelectorAll('fieldset');
  form.input = {};
  form.input.address = form.adForm.querySelector('input[name="address"]');
  form.input.type = form.adForm.querySelector('#type');
  form.input.price = form.adForm.querySelector('#price');
  form.input.timeFildset = form.adForm.querySelector('.ad-form__element--time');
  form.input.timeIn = form.adForm.querySelector('#timein');
  form.input.timeOut = form.adForm.querySelector('#timeout');
  form.input.rooms = form.adForm.querySelector('#room_number');
  form.input.capacity = form.adForm.querySelector('#capacity');
  form.input.guests = form.input.capacity.querySelectorAll('option');
  form.sendURL = 'https://js.dump.academy/keksobooking';

  var makeIsDisabled = function (collection) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].setAttribute('disabled', 'disabled');
    }
  };
  makeIsDisabled(form.fildsets);
  makeIsDisabled(form.input.guests);

  var validation = {};
  validation.settingMinPrice = function (elem) {
    var price = form.input.price;
    var minPrice = 0;
    if (elem.value === 'house') {
      minPrice = 5000;
    }
    if (elem.value === 'flat') {
      minPrice = 1000;
    }
    if (elem.value === 'palace') {
      minPrice = 10000;
    }
    price.setAttribute('placeholder', minPrice);
    price.setAttribute('min', minPrice);
  };
  validation.inputTypeChangeHandler = function (evt) {
    var changeElem = evt.target;
    validation.settingMinPrice(changeElem);
  };
  validation.inputTimeIChangeHandler = function (evt) {
    var time;
    var timein = form.input.timeIn;
    var timeout = form.input.timeOut;
    if (evt.target === timein) {
      time = timein.value;
      timeout.value = time;
    }
    if (evt.target === timeout) {
      time = timeout.value;
      timein.value = time;
    }
  };
  validation.inputRoomsChangeHandler = function (evt) {
    makeIsDisabled(form.input.guests);
    form.input.capacity.value = '';
    var options = form.input.guests;
    var rooms = evt.target.value;
    var lastElement = options.length - 1;
    if (rooms === '100') {
      options[lastElement].removeAttribute('disabled');
    }
    var isDiabled = function (number) {
      for (var i = number; i < lastElement; i++) {
        options[i].removeAttribute('disabled');
      }
    };
    for (var i = 0; i < options.length; i++) {
      if (rooms === options[i].value) {
        isDiabled(i);
      }
    }
  };
  var submitForm = {};
  submitForm.success = function () {
  };
  submitForm.error = function () {
    window.main.prepend(window.errorMassege);
  };
  submitForm.submitHandler = function (evt) {
    evt.preventDefault();
    form.input.address.removeAttribute('disabled');
    window.sendForm(form.sendURL, form.adForm, submitForm.success, submitForm.error);
  };
  validation.settingMinPrice(form.input.type);
  form.adForm.addEventListener('submit', submitForm.submitHandler);
  form.input.type.addEventListener('input', validation.inputTypeChangeHandler);
  form.input.timeFildset.addEventListener('input', validation.inputTimeIChangeHandler);
  form.input.rooms.addEventListener('input', validation.inputRoomsChangeHandler);
})();
