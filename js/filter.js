'use strict';
(function () {
  var dom = window.domElements;
  var filter = dom.filter;
  var generated = window.generatedMarks;
  var data = [];
  var values = [];
  var inputs = [];
  var getMaxRatingElements = function (dataArr) {
    var addSimilars = [];
    var rating = getRatingSimilars(dataArr);
    var newData = dataArr.slice();
    var maxRaitings = rating;
    var maxSimilar = Math.max.apply(null, maxRaitings);
    var index = maxRaitings.indexOf(maxSimilar);
    if (maxSimilar > 0) {
      addSimilars.push(newData[index]);
      newData.splice(index, 1);
      maxRaitings.splice(index, 1);
    }
    maxRaitings.forEach(function (item, i) {
      var max = maxSimilar;
      if (item === max) {
        addSimilars.push(newData[i]);
      }
    });
    return addSimilars;
  };
  var getRatingSimilars = function (dataArr) {
    var arr = dataArr;
    var filtered = getNewKeys(inputs);
    var ratings = [];
    arr.forEach(function (item) {
      var count = 0;
      filtered.forEach(function (elem, i) {
        var value = item.offer[elem];
        if (value < 10000) {
          value = 'low';
        }
        if (value >= 10000 && value <= 50000) {
          value = 'middle';
        }
        if (value > 50000) {
          value = 'high';
        }
        if ((value + '') === values[i]) {
          count += 1;
        }
      });
      ratings.push(count);
    });
    return ratings;
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
    window.clearMaps();
    var element = evt.currentTarget;
    getFilterValues(element);
    var newData = getMaxRatingElements(data);
    var ads = generated.buildingMarks(newData);
    dom.pinsMap.prepend(ads);
    window.renderPinCards();
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
