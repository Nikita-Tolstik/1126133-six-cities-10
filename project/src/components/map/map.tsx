import React, { useRef } from 'react';
import { Marker } from 'leaflet';
import { City } from '../../const';
import { Offers } from '../../types/offers';
import { getActiveCityLocation } from '../../utils/utils';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import useChangeLocation from '../../hooks/use-change-location';
import useAddMarker from '../../hooks/use-add-marker';
import useRemoveMarker from '../../hooks/use-remove-marker';


type MapProps = {
  activeCity: City;
  activeCityOffers: Offers;
  activeCardId: number | null;
};


const Map: React.FC<MapProps> = (props) => {
  const { activeCityOffers, activeCity, activeCardId } = props;

  const activeCityLocation = getActiveCityLocation(activeCity, activeCityOffers);

  const mapRef = useRef(null);
  const prevActiveCityRef = useRef<City>(activeCity);
  const prevMarkersRef = useRef<Marker[]>([]);
  const prevActiveId = useRef<number | null>(activeCardId);

  const map = useMap(mapRef, activeCityLocation);

  useRemoveMarker(
    prevMarkersRef,
    map,
    activeCardId,
    prevActiveId
  );

  useChangeLocation(
    prevActiveCityRef,
    prevMarkersRef,
    activeCity,
    activeCityLocation,
    map
  );

  useAddMarker(
    prevMarkersRef,
    activeCityOffers,
    map,
    activeCardId
  );

  return (
    <section className="cities__map map"
      ref={mapRef}
    >
    </section>
  );
};

export default Map;
