'use strict';
(function () {
  var dom = window.domElements;
  var filter = dom.filter;
  var generated = window.generatedMarks;
  var data = [];
  var getRatingOfSimilar = function () {
    var filterValues = getAllValuesInputs();
    var interData = data;
    var rating = [];
    var isIncludes = function (arr1, arr2) {
      var count = 0;
      arr1.forEach(function (elem) {
        if (arr2.includes(elem)) {
          count += 1;
        }
      });
      return count; 
    };
    var getElemRating = function (item, index) {
      var rang = 0
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
      if (isIncludes(filterValues.features, features) > 0) {
        rang += isIncludes(filterValues.features, features);
      }
      var result = [rang, index];
      return result;
    };
    interData.forEach(function (elem, i) {
      rating.push(getElemRating(elem, i));
    });
    console.log(rating);
  }
  var getValue = {
    selectValue: function (element) {
      var input = element;
      var value = input.value;
      if (value === 'any') {
        value = '';
      }
      return value;
    },
    checkboxValue: function () {
      var checked = filter.form.querySelectorAll('.map__checkbox:checked');
      var values = [];
      checked.forEach(function (elem) {
        values.push(elem.value);
      });
      return values;
    }
  };
  var getAllValuesInputs = function () {
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
  }
  var filterInputHandler = function (evt) {
    var element = evt.currentTarget;
    getRatingOfSimilar();
    // var ads = generated.buildingMarks(newData);
    // window.clearMaps();
    // dom.pinsMap.prepend(ads);
    // window.renderPinCards();
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
