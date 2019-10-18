'use strict';
(function () {
  var dom = window.domElements;
  var filter = dom.filter;
  var generated = window.generatedMarks;
  var data = [];
  var values = [];
  var inputs = [];
  var getSimilarAdd = function (arr1, dataArr) {
    var ratings = [];
    dataArr.forEach(function (item) {
      var count = 0;
      arr1.forEach(function (elem, i) {
        if ((item.offer[elem] + '') === values[i]) {
          count += 1;
        }
      });
      ratings.push(count);
    });
    console.log(ratings);
  };
  var getNewKeys = function (arr) {
    return arr.map(function (item) {
      return item.substring(8);
    });
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
    var newInputs = getNewKeys(inputs);
    getSimilarAdd(newInputs, data);
    window.clearMaps();
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
