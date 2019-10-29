'use strict';
(function () {
  var DOM = window.domElements;

  var newadCard = null;
  var data = [];
  var pinButtons = [];

  // заполнение карточки объявления данными
  var getDrawAd = function (element) {
    var Clone = {};
    Clone.card = DOM.adCard.cloneNode(true);
    Clone.avatar = Clone.card.querySelector('.popup__avatar');
    Clone.title = Clone.card.querySelector('.popup__title');
    Clone.address = Clone.card.querySelector('.popup__text--address');
    Clone.price = Clone.card.querySelector('.popup__text--price');
    Clone.type = Clone.card.querySelector('.popup__type');
    Clone.capacity = Clone.card.querySelector('.popup__text--capacity');
    Clone.checkTime = Clone.card.querySelector('.popup__text--time');
    Clone.features = Clone.card.querySelector('.popup__features');
    Clone.description = Clone.card.querySelector('.popup__description');
    Clone.photos = Clone.card.querySelector('.popup__photos');
    Clone.photo = Clone.photos.querySelector('.popup__photo');
    Clone.close = Clone.card.querySelector('.popup__close');
    var closeClickHandler = function (evt) {
      evt.preventDefault();
      Clone.card.remove();
      Clone.close.removeEventListener('click', closeClickHandler);
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
      Clone.photo.remove();
      srcArr.forEach(function (elem) {
        var photo = Clone.photo.cloneNode(true);
        photo.src = elem;
        Clone.photos.prepend(photo);
      });
    };
    getPhotos(element.offer.photos);
    var typeOfHouse = getTranslationType(element.offer.type);
    var dataFeature = element.offer.features;
    var features = Clone.features.querySelectorAll('.popup__feature');
    Clone.close.addEventListener('click', closeClickHandler);
    features.forEach(function (elem) {
      var option = elem.getAttribute('class').slice(31);
      if (!dataFeature.includes(option)) {
        elem.remove();
      }
    });
    newadCard = Clone.card;
    Clone.avatar.src = element.author.avatar;
    Clone.title.textContent = element.offer.title;
    Clone.address.textContent = element.offer.address;
    Clone.price.firstChild.data = element.offer.price + '₽';
    Clone.type.textContent = typeOfHouse;
    Clone.capacity.textContent = element.offer.rooms + ' комнат(а)ы для ' + element.offer.guests + ' гост(я)ей';
    Clone.checkTime.textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
    Clone.description.textContent = element.offer.description;
    return Clone.card;
  };

  var pinButtonClickHandler = function (evt) {
    var title = evt.currentTarget.firstElementChild.getAttribute('alt');
    var adInfo = data.filter(function (item) {
      return item.offer.title === title;
    });
    if (newadCard !== null) {
      newadCard.remove(); // если была открыта карточка то она удаляется
    }
    var adCard = getDrawAd(adInfo[0]);
    DOM.mapFilter.before(adCard); // отрисовка карточки выбранного объявления
    document.addEventListener('keydown', escKeydownHandler);
  };

  var enterKeydownHandler = function (evtEnter) {
    if (evtEnter.keyCode === 13) {
      pinButtonClickHandler(evtEnter);
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
    data = window.data;
    pinButtons = DOM.pinsMap.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinButtons.forEach(function (elem) {
      elem.addEventListener('click', pinButtonClickHandler);
      elem.addEventListener('keydown', enterKeydownHandler);
    });
  };

})();
