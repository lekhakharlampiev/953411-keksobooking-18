'use strict';
// вспомогательные данные
var AVATAR_PHOTOS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var OFFER_TITLES = ['сдам квартиру', 'уютная квартира', 'просторный пентхаус', 'только славянам', 'квартира в доме с паркингом', 'квартира в самом центре', 'квартира в самом центре центра', 'квартира с мансардой'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'conditioner', 'washer', 'elevator'];
var DESCRIIPTIONS = ['есть парковка рядом с домом', 'можно с животными но без детей', 'можно с детьми но без животных', 'можно только одним животным или только одним детям', 'воды нет но рядом есть магазин'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
// получение DOM элементов
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var templatePpin = document.querySelector('#pin').content;
var pin = templatePpin.querySelector('.map__pin');
var templateCard = document.querySelector('#card').content;
var cardAd = templateCard.querySelector('.map__card');

// функция получения рандомного элемента из массива
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * (0 - arr.length) + arr.length)];
};
// функция получения рандомгного числа в заданном интервале
var getRandomNumber = function (from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
};
// функция генерации рандомного массива из заданного массива
var getRandomArray = function (arr) {
  var randomArr = [];
  for (var i = 0; i < getRandomNumber(1, arr.length); i++) {
    randomArr.push(arr[i]);
  }
  return randomArr;
};
// генерация шаблонного объекта с данными
var makeSimilarAd = function () {
  var ad = {
    'author': {
      'avatar': 'img/avatars/user' + getRandomElement(AVATAR_PHOTOS) + '.png'
    },
    'offer': {
      'title': getRandomElement(OFFER_TITLES),
      'address': getRandomNumber(100, 1000) + ', ' + getRandomNumber(100, 1000),
      'price': getRandomNumber(1000, 10000),
      'type': getRandomElement(TYPES),
      'rooms': getRandomNumber(1, 6),
      'guests': getRandomNumber(1, 5),
      'checkin': getRandomElement(CHECKIN),
      'checkout': getRandomElement(CHECKOUT),
      'features': getRandomArray(FEATURES),
      'description': getRandomElement(DESCRIIPTIONS),
      'photos': getRandomElement(PHOTOS),
    },
    'location': {
      'x': getRandomNumber(0, map.clientWidth),
      'y': getRandomNumber(130, 630)
    }
  };
  return ad;
};
// генерация массива с объктами данных
var generateAds = function (count) {
  var arr = [];
  for (var i = 0; i < count; i++) {
    arr.push(makeSimilarAd());
  }
  return arr;

};
var ads = generateAds(8);
// открываем карту...
map.classList.remove('map--faded');

// функция-шаблон для создания метки
var getDrawPin = function (element) {
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
    fragment.prepend(getDrawPin(dataArray[i]));
  }
  return fragment;
};
// отрисовка меток на карте
var render = function (element, pasteElements) {
  element.prepend(pasteElements);
};
render(mapPins, getSimilarAds(ads));

var getDrawAd = function (element) {
  var cloneCard = cardAd.cloneNode(true);
  var popupTitle = cloneCard.querySelector('.popup__title');
  var popupAddress = cloneCard.querySelector('.popup__text--address');
  var popupPrice = cloneCard.querySelector('.popup__text--price');
  var popupType = cloneCard.querySelector('.popup__type');
  var popupCapacity = cloneCard.querySelector('.popup__text--capacity');
  var popupCheckTime = cloneCard.querySelector('.popup__text--time');
  var popupFeatures = cloneCard.querySelector('.popup__features');
  var popupDescription = cloneCard.querySelector('.popup__description');
  var popupPhotos = cloneCard.querySelector('.popup__photos');
  var typeOfHouse = '';
  switch(element.offer.type) {
    case 'bungalo':
      typeOfHouse = 'Бунгало';
      break;
    case 'palace':
      typeOfHouse = 'Дворец';
      break;
    case 'house':
      typeOfHouse = 'Дом';
      break;
    case 'flat':
      typeOfHouse = 'Квартира';
      break;  
  }
  var wifi = popupFeatures.querySelector('.popup__feature--wifi');
  var dishwasher = popupFeatures.querySelector('.popup__feature--wifi');
  var parking = popupFeatures.querySelector('.popup__feature--parking');
  var washer = popupFeatures.querySelector('.popup__feature--washer');
  var elevator = popupFeatures.querySelector('.popup__feature--elevator');
  var dishwasher = popupFeatures.querySelector('.popup__feature--dishwasher');
  console.log(dishwasher);

  popupTitle.textContent = element.offer.title;
  popupAddress.textContent = element.offer.address;
  popupPrice.firstChild.data = element.offer.price + '&#x20bd;';
  popupType.textContent = typeOfHouse;
  popupCapacity.textContent = element.offer.rooms + ' комнат(а)ы для ' + element.offer.guests + ' гост(я)ей';
  popupCheckTime.textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
  console.log(element.offer.features);
  return cloneCard;
};
console.log(getDrawAd(ads[0]));