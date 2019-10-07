'use strict';
// вспомогательные данные
var AVATAR_PHOTOS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var OFFER_TITLES = ['сдам квартиру', 'уютная квартира', 'просторный пентхаус', 'только славянам', 'квартира в доме с паркингом', 'квартира в самом центре', 'квартира в самом центре центра', 'квартира с мансардой'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIIPTIONS = ['есть парковка рядом с домом', 'можно с животными но без детей', 'можно с детьми но без животных', 'можно только одним животным или только одним детям', 'воды нет но рядом есть магазин'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// получение DOM элементов
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var templatePpin = document.querySelector('#pin').content;
var pin = templatePpin.querySelector('.map__pin');
var adForm = document.querySelector('.ad-form');
var fieldset = adForm.querySelectorAll('fieldset');

// установка всем полям disabled
var makeIsDisabled = function (collection) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].setAttribute('disabled', 'disabled');
  }
};

makeIsDisabled(fieldset);

var makeIsActivate = function (collection) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].removeAttribute('disabled');
  }
};

// функция получения рандомного элемента из массива
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};
// функция получения рандомгного числа в заданном интервале
var generatedRandomNumber = function (from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
};
// функция генерации массива случайной длинны из заданного массива
var generatedRandomArray = function (arr) {
  var randomArr = [];
  var count = generatedRandomNumber(1, arr.length);
  var copyArr = arr.slice();
  for (var i = 0; i < count; i++) {
    var randomElement = getRandomElement(copyArr);
    copyArr = copyArr.filter(function (item) {
      return randomElement !== item;
    });
    randomArr.push(randomElement);
  }
  return randomArr;
};
// генерация шаблонного объекта с данными
var makeSimilarAd = function () {
  var positionX = generatedRandomNumber(25, map.clientWidth - 25);
  var positionY = generatedRandomNumber(130, 630);
  var ad = {
    'author': {
      'avatar': 'img/avatars/user' + getRandomElement(AVATAR_PHOTOS) + '.png'
    },
    'offer': {
      'title': getRandomElement(OFFER_TITLES),
      'address': positionX + ', ' + positionY,
      'price': generatedRandomNumber(1000, 10000),
      'type': getRandomElement(TYPES),
      'rooms': generatedRandomNumber(1, 6),
      'guests': generatedRandomNumber(1, 5),
      'checkin': getRandomElement(CHECKIN),
      'checkout': getRandomElement(CHECKOUT),
      'features': generatedRandomArray(FEATURES),
      'description': getRandomElement(DESCRIIPTIONS),
      'photos': generatedRandomArray(PHOTOS),
    },
    'location': {
      'x': positionX,
      'y': positionY
    }
  };
  return ad;
};
// генерация массива с объктами данных
var generatedAds = function (count) {
  var arr = [];
  for (var i = 0; i < count; i++) {
    arr.push(makeSimilarAd());
  }
  return arr;

};
var ads = generatedAds(8);
// функция-шаблон для создания метки
var generatedPin = function (element) {
  var clonePin = pin.cloneNode(true);
  var img = clonePin.querySelector('img');
  clonePin.style.left = element.location.x + 25 + 'px';
  clonePin.style.top = element.location.y + 70 + 'px';
  img.src = element.author.avatar;
  img.alt = element.offer.title;
  return clonePin;
};
// функция создания меток на основе массива с данными
var getSimilarAds = function (dataArray) {
  var fragment = new DocumentFragment();
  for (var i = 0; i < dataArray.length; i++) {
    fragment.prepend(generatedPin(dataArray[i]));
  }
  return fragment;
};
var similarAds = getSimilarAds(ads);
// отрисовка меток на карте
mapPins.prepend(similarAds);

var mainPin = map.querySelector('.map__pin--main');
// var inputAddress = adForm.querySelector('input[name="address"]');
var form = {};
form.input = {};
form.input.address = adForm.querySelector('input[name="address"]');
form.input.type = adForm.querySelector('#type');
form.input.price = adForm.querySelector('#price');
form.input.timeFildset = adForm.querySelector('.ad-form__element--time');
form.input.timeIn = adForm.querySelector('#timein');
form.input.timeOut = adForm.querySelector('#timeout');
form.input.rooms = adForm.querySelector('#room_number');
form.input.capacity = adForm.querySelector('#capacity');
form.input.guests = form.input.capacity.querySelectorAll('option');

var getLocation = function (elem) {
  var element = elem.getBoundingClientRect();
  var coord = {};
  coord.top = element.y;
  coord.left = element.x;
  return coord;

};
var getPinTipHeight = function () {
  var pinAfter = getComputedStyle(mainPin, '::after');
  var afterHeight = parseInt(pinAfter.borderTopWidth, 10);
  return afterHeight;
};
var getMainPinHeight = function () {
  var pinAfterHeaight = getPinTipHeight();
  var img = mainPin.querySelector('img');
  var imgHeight = img.clientHeight;
  var pinHeight = pinAfterHeaight + imgHeight;
  return pinHeight;
};
var getPinLocation = function (pinMap, active) {
  var coordinate = pinMap.getBoundingClientRect();
  var position = getLocation(pinMap);
  var activePinHeight = getMainPinHeight();
  var width = coordinate.width;
  var height = coordinate.height;
  if (!active) {
    return {
      top: height / 2 + position.top,
      left: width / 2 + position.left,
    };
  }
  return {
    top: activePinHeight + position.top, // 16 - расстояние от края элемента главной метки
    left: width / 2 + position.left // до острого кончика псевдоэлемента
  };
};
var installPinAddress = function (pinMap, active) {
  var coordinate = getPinLocation(pinMap, active);
  var y = Math.floor(coordinate.top);
  var x = Math.floor(coordinate.left);
  var top = y;
  var left = x;
  if (active) {
    top = y + ' расстояние до острого конца по вертикали';
    left = x + ' расстояние до острого конца по горизонтали';
  }
  var value = left + ', ' + top;
  form.input.address.value = value;
};
installPinAddress(mainPin, false);

var mainPinMousedownHandler = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  installPinAddress(mainPin, true);
  makeIsActivate(fieldset);
};

mainPin.addEventListener('mousedown', mainPinMousedownHandler);
mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    mainPinMousedownHandler();
  }
});
// зависимость поля " Цена за ночь" от "Тип жилья"
var settingMinPrice = function (elem) {
  var price = form.input.price;
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
settingMinPrice(form.input.type);
var inputTypeChangeHandler = function (evt) {
  var changeElem = evt.target;
  settingMinPrice(changeElem);
};
form.input.type.addEventListener('input', inputTypeChangeHandler);

// синхронизация полей Время заезда/выезда
var inputTimeIChangeHandler = function (evt) {
  var time;
  var timein = form.input.timeIn;
  var timeout = form.input.timeOut;
  if (evt.target === timein) {
    time = timein.value;
    timeout.value = time;
  }
  if (evt.target === timeout) {
    time = timeout.value;
    timein.value = time;
  }
};
form.input.timeFildset.addEventListener('input', inputTimeIChangeHandler);
// синхронизация значений полей Количество комнат/Количество мест
makeIsDisabled(form.input.guests);
var inputRoomsChangeHandler = function (evt) {
  makeIsDisabled(form.input.guests);
  form.input.capacity.value = '';
  var options = form.input.guests;
  var rooms = evt.target.value;
  var lastElement = options.length - 1;
  if (rooms === '100') {
    options[lastElement].removeAttribute('disabled');
  }
  var isDiabled = function (number) {
    for (var i = number; i < lastElement; i++) {
      options[i].removeAttribute('disabled');
    }
  };
  for (var i = 0; i < options.length; i++) {
    if (rooms === options[i].value) {
      isDiabled(i);
    }
  }
};
form.input.rooms.addEventListener('input', inputRoomsChangeHandler);
