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

// функция получения рандомного элемента из массива
var generatedRandomElement = function (arr) {
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
  var newArr = arr.slice();
  newArr.sort(function () {
    return Math.random() - 0.5;
  });
  for (var i = 0; i < count; i++) {
    randomArr.push(newArr[i]);
  }
  return randomArr;
};
// генерация шаблонного объекта с данными
var makeSimilarAd = function () {
  var positionX = generatedRandomNumber(25, map.clientWidth - 25);
  var positionY = generatedRandomNumber(130, 630);
  var ad = {
    'author': {
      'avatar': 'img/avatars/user' + generatedRandomElement(AVATAR_PHOTOS) + '.png'
    },
    'offer': {
      'title': generatedRandomElement(OFFER_TITLES),
      'address': positionX + ', ' + positionY,
      'price': generatedRandomNumber(1000, 10000),
      'type': generatedRandomElement(TYPES),
      'rooms': generatedRandomNumber(1, 6),
      'guests': generatedRandomNumber(1, 5),
      'checkin': generatedRandomElement(CHECKIN),
      'checkout': generatedRandomElement(CHECKOUT),
      'features': generatedRandomArray(FEATURES),
      'description': generatedRandomElement(DESCRIIPTIONS),
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
console.log(ads);
// открываем карту...
map.classList.remove('map--faded');

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

