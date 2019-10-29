'use strict';
(function () {
  var DOM = window.domElements;
  var LOAD = window.load;
  var INPUTS = DOM.inputs;
  var SEND_URL = 'https://js.dump.academy/keksobooking';

  var pageInActive = window.pageToInactive;

  var validation = {};
  validation.settingMinPrice = function (elem) {
    var price = INPUTS.price;
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
    var timein = INPUTS.timeIn;
    var timeout = INPUTS.timeOut;
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
    if (evt) {
      INPUTS.capacity.value = '';
    }
    var guestsCount = INPUTS.rooms.value;
    if (INPUTS.rooms.value === '100') {
      guestsCount = 0;
    }
    var guests = INPUTS.guests;
    for (var i = 0; i < guests.length; i++) {
      var element = guests[i];
      var lastElement = guests[guests.length - 1];
      element.setAttribute('disabled', 'disabled');
      if (element.value <= guestsCount) {
        element.removeAttribute('disabled');
      }
      if (guestsCount !== 0) {
        lastElement.setAttribute('disabled', 'disabled');
      }
    }
  };

  var successKeydownHandler = function (evt) {
    if (evt.keyCode === 27) {
      DOM.success.remove();
    }
    document.removeEventListener('keydown', successKeydownHandler);
  };

  var successClickHandler = function () {
    DOM.success.remove();
    document.removeEventListener('click', successClickHandler);
  };

  var buttonResetClickHandler = function (evt) {
    evt.preventDefault();
    pageInActive();
  };

  var submitForm = {};
  submitForm.success = function () {
    DOM.main.prepend(DOM.success);
    document.addEventListener('click', successClickHandler);
    document.addEventListener('keydown', successKeydownHandler);
    pageInActive();
  };
  submitForm.error = function () {
    var massage = LOAD.errorMassage();
    DOM.main.prepend(massage);
  };
  submitForm.submitHandler = function (evt) {
    evt.preventDefault();
    INPUTS.address.removeAttribute('disabled');
    LOAD.sendForm(SEND_URL, DOM.form, submitForm.success, submitForm.error);
  };
  window.inputRoomsChangeHandler = validation.inputRoomsChangeHandler;
  validation.inputRoomsChangeHandler();
  validation.settingMinPrice(INPUTS.type);
  DOM.form.addEventListener('submit', submitForm.submitHandler);
  DOM.formReset.addEventListener('click', buttonResetClickHandler);
  INPUTS.type.addEventListener('input', validation.inputTypeChangeHandler);
  INPUTS.timeFildset.addEventListener('input', validation.inputTimeIChangeHandler);
  INPUTS.rooms.addEventListener('input', validation.inputRoomsChangeHandler);
})();
