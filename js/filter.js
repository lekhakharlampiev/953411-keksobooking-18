'use strict';
(function () {
  var dom = window.domElements;
  var filter = dom.filter;
  var generated = window.generatedMarks;
  var data = [];
  var selected = 0;
  var timeoutID;

  var getValue = {};
  getValue.selectValue = function (element) {
    var input = element;
    var value = input.value;
    if (value === 'any') {
      value = '';
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
    if (inputType !== '') {
      selected += 1;
    }
    var inputPrice = getValue.selectValue(filter.price);
    if (inputPrice !== '') {
      selected += 1;
    }
    var inputRooms = getValue.selectValue(filter.rooms);
    if (inputRooms !== '') {
      selected += 1;
    }
    var inputGuest = getValue.selectValue(filter.guests);
    if (inputGuest !== '') {
      selected += 1;
    }
    var inputsFeatures = getValue.checkboxValue();
    if (inputsFeatures.length > 0) {
      selected += 1;
    }
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
    var count = 0;
    for (var i = arr.length - 1; i > 0; i--) {
      var next = arr[i - 1];
      var current = arr[i];
      if (next[0] < current[0] || next[0] < selected) {
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
  maxSimilarAdds.getElemRating = function (item, index, filterValues) {
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
    var filterValues = getValue.getAllValueInputs();
    interData.forEach(function (elem, i) {
      rating.push(maxSimilarAdds.getElemRating(elem, i, filterValues));
    });
    var maxRatings = maxSimilarAdds.getMaxRatitg(rating);
    return maxRatings;
  };
  maxSimilarAdds.getSimilarAdds = function () {
    var maxrating = maxSimilarAdds.getRating();
    var adds = data;
    var filtredData = [];
    maxrating.forEach(function (elem) {
      var index = elem[1];
      filtredData.push(adds[index]);
    });
    return filtredData;
  };

  var filterInputHandler = function () {
    selected = 0;
    if (timeoutID) {
      window.clearTimeout(timeoutID);
    }
    timeoutID = window.setTimeout(function () {
      window.clearMaps();
      var filterdData = maxSimilarAdds.getSimilarAdds();
      var ads = generated.buildingMarks(filterdData);
      dom.pinsMap.prepend(ads);
      window.renderPinCards();
    }, 500);
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
