'use strict';
(function () {
  var dom = window.domElements;
  var filter = dom.filter;
  var data = [];
  var values = [];
  var inputs = [];
  var filterInputHandler = function (evt) {
    var id = evt.currentTarget.getAttribute('id');
    if (inputs.includes(id)) {
      console.log('содержит');
      console.log(index);
      var index = inputs.indexOf(id);
      inputs.splice(index, 1);
      values.splice(index, 1);
    }
    inputs.push(evt.currentTarget.id);
    values.push(evt.currentTarget.value);
    console.log(values);
    console.log(inputs);
  };
  var addListener = function (elem) {
    elem.forEach(function (item) {
      item.addEventListener('input', filterInputHandler);
    });
  };
  window.startingFilter = function () {
    addListener(filter.selects);
    data = window.data;
    console.log(data);
  };

})();
