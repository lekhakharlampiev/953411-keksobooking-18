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
    var closeClickHandler = function (evt) {
      evt.preventDefault();
      clone.card.remove();
      clone.close.removeEventListener('click', closeClickHandler);
    };
    var getTranslationType = function (type) {
      var translate = '';
      switch (type) {
        case 'bungalo':
          translate = 'Бунгало';
          break;
        case 'palace':
          translate = 'Дворец';
          break;
        case 'house':
          translate = 'Дом';
          break;
        case 'flat':
          translate = 'Квартира';
          break;
      }
      return translate;
    };
    var getPhotos = function (srcArr) {
      clone.photo.remove();
      srcArr.forEach(function (elem) {
        var photo = clone.photo.cloneNode(true);
        photo.src = elem;
        clone.photos.prepend(photo);
      });
    };
    getPhotos(element.offer.photos);
    var typeOfHouse = getTranslationType(element.offer.type);
    var dataFeature = element.offer.features;
    var features = clone.features.querySelectorAll('.popup__feature');
    clone.close.addEventListener('click', closeClickHandler);
    features.forEach(function (elem) {
      var option = elem.getAttribute('class').slice(31);
      if (!dataFeature.includes(option)) {
        elem.remove();
      }
    });
    newadCard = clone.card;
    clone.avatar.src = element.author.avatar;
    clone.title.textContent = element.offer.title;
    clone.address.textContent = element.offer.address;
    clone.price.firstChild.data = element.offer.price + '₽';
    clone.type.textContent = typeOfHouse;
    clone.capacity.textContent = element.offer.rooms + ' комнат(а)ы для ' + element.offer.guests + ' гост(я)ей';
    clone.checkTime.textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
    clone.description.textContent = element.offer.description;
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
