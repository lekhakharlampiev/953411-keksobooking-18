'use strict';
//вспомогательные данные
var AVATAR_PHOTOS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var OFFER_TITLES = ['сдам квартиру', 'уютная квартира', 'просторный пентхаус', 'только славянам', 'квартира в доме с паркингом', 'квартира в самом центре', 'квартира в самом центре центра', 'квартира с мансардой'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var DESCRIIPTIONS = ['есть парковка рядом с домом', 'можно с животными но без детей', 'можно с детьми но без животных', 'можно только одним животным или только одним детям', 'воды нет но рядом есть магазин'];
var PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
//получение DOM элементов
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var template_pin = document.querySelector('#pin').content;
var pin = template_pin.querySelector('.map__pin');

//функция получения рандомного элемента из массива
var getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * (0 - arr.length)) + arr.length];
};
//функция получения рандомгного числа в заданном интервале
var getRandomNumber = function(from, to) {
    return Math.floor(Math.random() * (to - from) + from);
};
//функция генерации рандомного массива из заданного массива
var getRandomArray = function(arr) {
    var randomArr = [];
    for (var i = 0; i < getRandomNumber(1, arr.length); i++) {
        randomArr.push(arr[i]);
    }
    return randomArr;
};
//генерация шаблонного объекта с данными
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
//генерация массива с объктами данных
var generateAds = function (count) {
    var ads = [];
    for (var i = 0; i < count; i++) {
        ads.push(makeSimilarAd());
    }
    return ads;

};
//открываем карту...
map.classList.remove('map--faded');

//функция-шаблон для создания метки
var getDrawPin = function (element) {
    var clonePin = pin.cloneNode(true);
    var img = clonePin.querySelector('img');
    clonePin.style.left = element.location.x + 'px';
    clonePin.style.top = element.location.y + 'px';
    img.src = element.author.avatar;
    img.alt = element.offer.title;
    return clonePin;
};
//функция создания меток на основе массива с данными
var getSimilarAds = function (dataArray) {
    var fragment = new DocumentFragment;
    for (var i = 0; i < dataArray.length; i++) {
        fragment.prepend(getDrawPin(dataArray[i]));
    }
    return fragment
};
//отрисовка меток на карте
var render = function (element, pasteElements) {
    element.prepend(pasteElements);
}
render(mapPins, getSimilarAds(generateAds(8)));
