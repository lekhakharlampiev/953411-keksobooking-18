'use strict';
(function () {
  var dom = window.domElements;
  var filter = dom.filter;
  var generated = window.generatedMarks;
  var data = [];
  var values = [];
  var inputs = [];
  var getNewData = function (arr) {
    var result = data.filter(function (item) {
      return item.offer.type === arr.type;
    });
    return result;
  };
  var getResult = function () {
    var result = {};
    inputs.forEach(function (id, i) {
      var key = id.substring(8);
      result[key] = values[i];
    });
    return result;
  };
  var getFilterValues = function (elem) {
    var id = elem.getAttribute('id');
    var value = elem.value;
    if (inputs.includes(id) || value === 'any') {
      var index = inputs.indexOf(id);
      inputs.splice(index, 1);
      values.splice(index, 1);
    }
    if (value !== 'any') {
      inputs.push(elem.id);
      values.push(elem.value);
    }
  };
  var filterInputHandler = function (evt) {
    var element = evt.currentTarget;
    getFilterValues(element);
    var sortObject = getResult();
    var newData = data;
    if (element.value !== 'any') {
      newData = getNewData(sortObject);
    }
    window.clearMaps();
    var ads = generated.buildingMarks(newData);
    dom.pinsMap.prepend(ads);
  };
  var addListener = function (elem) {
    elem.forEach(function (item) {
      item.addEventListener('input', filterInputHandler);
    });
  };
  window.startingFilter = function () {
    addListener(filter.selects);
    data = window.data;
  };

})();
