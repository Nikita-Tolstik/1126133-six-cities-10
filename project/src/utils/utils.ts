import { Offers, Offer, Location } from '../types/offers';
import { City, MapClass, month, SortType } from '../const';

const MULTIPLIER_RATING = 20;
const FIRST_LETTER = 0;
const START_INDEX = 1;


const getUniqueCities = (offers: Offers): string[] => {
  const cities = offers.map((offer) => offer.city.name);
  const uniqueCities = Array.from(new Set(cities));

  return uniqueCities;
};


const getActiveCityLocation = (city: City, offers: Offers): Location => {
  const offersActiveCity = getActiveCityOffers(city, offers);
  const [offer] = offersActiveCity;

  return {
    latitude: offer.city.location.latitude,
    longitude: offer.city.location.longitude,
    zoom: offer.city.location.zoom
  };
};


const getActiveOfferLocation = (offers: Offers): Location => {
  const [activeOffer] = offers;

  return {
    latitude: activeOffer.location.latitude,
    longitude: activeOffer.location.longitude,
    zoom: activeOffer.location.zoom
  };
};


export const getCountStars = (rating: number): string => `${Math.round(rating) * MULTIPLIER_RATING}%`;


export const getActiveCityOffers = (city: City, offers: Offers): Offers => offers.filter((offer) => city === offer.city.name);


export const capitalizeFirstLetter = (text: string): string => text.charAt(FIRST_LETTER).toUpperCase() + text.slice(START_INDEX);


export const getFormatDate = (date: string): string => {
  const formDate = new Date(date);
  const year = formDate.getFullYear();
  const numMonth = formDate.getMonth();

  return `${month[numMonth]} ${year}`;
};


export const getLocation = (city: City, offers: Offers, mapClass: MapClass): Location => {

  if (mapClass === MapClass.Property) {
    return getActiveOfferLocation(offers);
  }

  return getActiveCityLocation(city, offers);
};


export const getCitiesOffers = (offers: Offers): [string, Offer[]][] => {
  const сities = getUniqueCities(offers);
  const sortedCities = сities.sort();
  const cityOffersMap = new Map();

  sortedCities.forEach((city) => {
    const cityOffers = offers.filter((offer) => city === offer.city.name);
    cityOffersMap.set(city, cityOffers);
  });

  return Array.from(cityOffersMap);
};


export const getSortedOffers = (sortType: SortType, offers: Offers): Offers => {
  const offersCopy = [...offers];

  switch (sortType) {
    case SortType.Popular:
      return offersCopy;

    case SortType.PriceLowToHigh:
      return offersCopy.sort((a, b) => a.price - b.price);

    case SortType.PriceHighToLow:
      return offersCopy.sort((a, b) => b.price - a.price);

    case SortType.TopRatedFirst:
      return offersCopy.sort((a, b) => b.rating - a.rating);
  }
};
