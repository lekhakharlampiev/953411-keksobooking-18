'use strict';
(function () {
  var dom = window.domElements;
  var load = window.load;
  var inputs = dom.inputs;
  var sendURL = 'https://js.dump.academy/keksobooking';
  var makeDisabled = window.makeDisabled;
  var validation = {};
  var pageInActive = window.pageToInactive;
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
  validation.inputRoomsChangeHandler = function () {
    var guestsCount = inputs.rooms.value;
    if (inputs.rooms.value === '100') {
      guestsCount = 0;
    }
    var guests = inputs.guests;
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
      dom.success.remove();
    }
    document.removeEventListener('keydown', successKeydownHandler);
  };
  var successClickHandler = function () {
    dom.success.remove();
    document.removeEventListener('click', successClickHandler);
  };
  var buttonResetClickHandler = function (evt) {
    evt.preventDefault();
    pageInActive();
  };
  var submitForm = {};
  submitForm.success = function () {
    dom.main.prepend(dom.success);
    document.addEventListener('click', successClickHandler);
    document.addEventListener('keydown', successKeydownHandler);
    window.pageToInactive();
  };
  submitForm.error = function () {
    var massage = load.errorMassage();
    dom.main.prepend(massage);
  };
  submitForm.submitHandler = function (evt) {
    evt.preventDefault();
    inputs.address.removeAttribute('disabled');
    load.sendForm(sendURL, dom.form, submitForm.success, submitForm.error);
  };
  window.inputRoomsChangeHandler = validation.inputRoomsChangeHandler;
  validation.inputRoomsChangeHandler();
  validation.settingMinPrice(inputs.type);
  dom.form.addEventListener('submit', submitForm.submitHandler);
  dom.formReset.addEventListener('click', buttonResetClickHandler);
  inputs.type.addEventListener('input', validation.inputTypeChangeHandler);
  inputs.timeFildset.addEventListener('input', validation.inputTimeIChangeHandler);
  inputs.rooms.addEventListener('input', validation.inputRoomsChangeHandler);
})();
