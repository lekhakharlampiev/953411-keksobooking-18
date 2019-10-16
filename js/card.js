'use strict';
(function () {
  var dom = window.domElements;
  var newadCard = null;
  var data = [];
  var pinButtons = [];

  var getDrawAd = function (element) {
    var clone = {};
    clone.card = dom.adCard.cloneNode(true);
    clone.avatar = clone.card.querySelector('.popup__avatar');
    clone.title = clone.card.querySelector('.popup__title');
    clone.address = clone.card.querySelector('.popup__text--address');
    clone.price = clone.card.querySelector('.popup__text--price');
    clone.type = clone.card.querySelector('.popup__type');
    clone.capacity = clone.card.querySelector('.popup__text--capacity');
    clone.checkTime = clone.card.querySelector('.popup__text--time');
    clone.features = clone.card.querySelector('.popup__features');
    clone.description = clone.card.querySelector('.popup__description');
    clone.photos = clone.card.querySelector('.popup__photos');
    clone.photo = clone.photos.querySelector('.popup__photo');
    clone.close = clone.card.querySelector('.popup__close');
    newadCard = clone.card;
    var closeClickHandler = function (evt) {
      evt.preventDefault();
      clone.card.remove();
    };
    clone.close.addEventListener('click', closeClickHandler);
    clone.avatar.src = element.author.avatar;
    var typeOfHouse = '';
    switch (element.offer.type) {
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
    var adFeature = element.offer.features;
    var allFeatures = clone.features.querySelectorAll('.popup__feature');

    var itIncludes = function (arr, elem) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
          return true;
        }
      }
      return false;
    };
    for (var i = 0; i < allFeatures.length; i++) {
      var option = allFeatures[i].getAttribute('class').slice(31);
      if (!itIncludes(adFeature, option)) {
        allFeatures[i].remove();
      }
    }

    clone.title.textContent = element.offer.title;
    clone.address.textContent = element.offer.address;
    clone.price.firstChild.data = element.offer.price + '₽';
    clone.type.textContent = typeOfHouse;
    clone.capacity.textContent = element.offer.rooms + ' комнат(а)ы для ' + element.offer.guests + ' гост(я)ей';
    clone.checkTime.textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
    clone.description.textContent = element.offer.description;

    var photosSrc = element.offer.photos;
    var photo = clone.photo.cloneNode();
    clone.photo.remove();
    for (var a = 0; a < photosSrc.length; a++) {
      var copy = photo.cloneNode();
      copy.src = photosSrc[a];
      clone.photos.prepend(copy);
    }

    return clone.card;
  };
  var pinButtonClickhandler = function (evt) {
    var title = evt.currentTarget.firstElementChild.getAttribute('alt');
    var adInfo = data.filter(function (item) {
      return item.offer.title === title;
    });
    if (newadCard !== null) {
      newadCard.remove();
    }
    var adCard = getDrawAd(adInfo[0]);
    dom.mapFilter.before(adCard);
    document.addEventListener('keydown', escKeydownHandler);
  };
  var enterKeydownHandler = function (evtEnter) {
    if (evtEnter.keyCode === 13) {
      pinButtonClickhandler(evtEnter);
    }
    evtEnter.currentTarget.removeEventListener('keydown', enterKeydownHandler);
  };
  var escKeydownHandler = function (evt) {
    if (evt.keyCode === 27) {
      newadCard.remove();
    }
    document.removeEventListener('keydown', escKeydownHandler);
  };
  window.renderPinCards = function () {
    data = window.data.slice();
    pinButtons = dom.pinsMap.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinButtons.forEach(function (elem) {
      elem.addEventListener('click', pinButtonClickhandler);
      elem.addEventListener('keydown', enterKeydownHandler);
    });
  };

})();
