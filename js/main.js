'use strict';
(function () {
  var dom = window.domElements;
  window.pageToInactive = function () {
    dom.fieldsets.forEach(function (element) {
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
  };
})();
