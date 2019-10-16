'use strict';
(function () {
  var dom = window.domElements;
  var inputs = dom.inputs;
  var sendURL = 'https://js.dump.academy/keksobooking';

  var makeIsDisabled = function (collection) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].setAttribute('disabled', 'disabled');
    }
  };
  makeIsDisabled(dom.fieldsets);
  // makeIsDisabled(inputs.guests);

  var validation = {};
  validation.settingMinPrice = function (elem) {
    var price = inputs.price;
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
    var timein = inputs.timeIn;
    var timeout = inputs.timeOut;
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
    makeIsDisabled(inputs.guests);
    inputs.capacity.value = '';
    var options = inputs.guests;
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
    console.log('success');
  };
  submitForm.error = function () {
    window.main.prepend(window.errorMassege);
  };
  submitForm.submitHandler = function (evt) {
    evt.preventDefault();
    inputs.address.removeAttribute('disabled');
    window.sendForm(sendURL, dom.form, submitForm.success, submitForm.error);
  };
  validation.settingMinPrice(inputs.type);
  dom.form.addEventListener('submit', submitForm.submitHandler);
  inputs.type.addEventListener('input', validation.inputTypeChangeHandler);
  inputs.timeFildset.addEventListener('input', validation.inputTimeIChangeHandler);
  inputs.rooms.addEventListener('input', validation.inputRoomsChangeHandler);
})();
