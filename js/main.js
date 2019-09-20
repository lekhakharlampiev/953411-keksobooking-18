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

var getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * (0 - arr.length)) + arr.length];
};
var getRandomNumber = function(from, to) {
    return Math.floor(Math.random() * (to - from) + from);
};
var getRandomArray = function(arr) {
    var randomArr = [];
    for (var i = 0; i < getRandomNumber(1, arr.length); i++) {
        randomArr.push(arr[i]);
    }
    return randomArr;
};

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
            'x': getRandomNumber(0, 1000),
            'y': getRandomNumber(130, 630)
        }
    };
    return ad;
};

var generateAds = function (count) {
    var ads = [];
    for (var i = 0; i < count; i++) {
        ads.push(makeSimilarAd());
    }
    return ads;

};