'use strict';
(function () {
  var dom = window.domElements;
  var filter = dom.filter;
  var generated = window.generatedMarks;
  var data = [];

  var getValue = {};
  getValue.selectValue = function (element) {
    var input = element;
    var value = '';
    if (value !== 'any') {
      value = input.value;
    }
    return value;
  };
  getValue.checkboxValue = function () {
    var checked = filter.form.querySelectorAll('.map__checkbox:checked');
    var values = [];
    checked.forEach(function (elem) {
      values.push(elem.value);
    });
    return values;
  };
  getValue.getAllValueInputs = function () {
    var inputType = getValue.selectValue(filter.type);
    var inputPrice = getValue.selectValue(filter.price);
    var inputRooms = getValue.selectValue(filter.rooms);
    var inputGuest = getValue.selectValue(filter.guests);
    var inputsFeatures = getValue.checkboxValue();
    var filterValues = {
      type: inputType,
      price: inputPrice,
      rooms: inputRooms,
      guests: inputGuest,
      features: inputsFeatures
    };
    return filterValues;
  };

  var maxSimilarAdds = {};
  maxSimilarAdds.getMaxRatitg = function (rating) {
    var arr = rating.sort(function (a, b) {
      return a[0] - b[0];
    });
    console.log(arr, 'arr');
    var count = 0;
    for (var i = arr.length - 1; i > 0; i--) {
      var next = arr[i - 1];
      var current = arr[i];
      if (next[0] < current[0]) {
        count = i;
        break;
      }
    }
    var maxRatings = arr.slice(count);
    return maxRatings;
  };
  maxSimilarAdds.isIncludes = function (arr1, arr2) {
    var count = 0;
    arr1.forEach(function (elem) {
      if (arr2.includes(elem)) {
        count += 1;
      }
    });
    return count;
  };
  maxSimilarAdds.getElemRating = function (item, index) {
    var filterValues = getValue.getAllValueInputs();
    var rang = 0;
    var type = item.offer.type;
    var price = item.offer.price;
    var rooms = item.offer.rooms + '';
    var guests = item.offer.guests + '';
    var features = item.offer.features;
    var priceVal;
    if (price < 10000) {
      priceVal = 'low';
    }
    if (price >= 10000 && price <= 50000) {
      priceVal = 'middle';
    }
    if (price > 50000) {
      priceVal = 'high';
    }
    if (filterValues.type === type) {
      rang += 1;
    }
    if (filterValues.price === priceVal) {
      rang += 1;
    }
    if (filterValues.rooms === rooms) {
      rang += 1;
    }
    if (filterValues.guests === guests) {
      rang += 1;
    }
    if (filterValues.price === priceVal) {
      rang += 1;
    }
    if (maxSimilarAdds.isIncludes(filterValues.features, features) > 0) {
      rang += maxSimilarAdds.isIncludes(filterValues.features, features);
    }
    var result = [rang, index];
    return result;
  };
  maxSimilarAdds.getRating = function () {
    var interData = data;
    var rating = [];
    interData.forEach(function (elem, i) {
      rating.push(maxSimilarAdds.getElemRating(elem, i));
    });
    var maxRatings = maxSimilarAdds.getMaxRatitg(rating);
    return maxRatings;
  };
  maxSimilarAdds.getSimilarAdds = function () {
    var maxrating = maxSimilarAdds.getRating();
    console.log(maxrating);
    var adds = data;
    var filtredData = [];
    maxrating.forEach(function (elem) {
      var index = elem[1];
      filtredData.push(adds[index]);
    });
    return filtredData;
  };

  var filterInputHandler = function () {
    window.clearMaps();
    var filterdData = maxSimilarAdds.getSimilarAdds();
    var ads = generated.buildingMarks(filterdData);
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
    addListener(filter.checkbox);
    data = window.data;
  };
})();
