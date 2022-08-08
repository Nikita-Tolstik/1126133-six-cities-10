import React from 'react';
import { Offer } from '../../types/offers';


type PropertyHostProps = {
  offer: Offer
}


const PropertyHost: React.FC<PropertyHostProps> = ({ offer }) => (
  <div className="property__host">
    <h2 className="property__host-title">Meet the host</h2>
    <div className="property__host-user user">
      <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
        <img
          src={offer.host.avatarUrl}
          className="property__avatar user__avatar" width="74" height="74" alt="Host avatar"
        />
      </div>
      <span className="property__user-name">
        {offer.host.name}
      </span>
      <span className="property__user-status">
        {offer.host.isPro ? 'Pro' : ''}
      </span>
    </div>
    <div className="property__description">
      <p className="property__text">
        {offer.description}
      </p>
    </div>
  </div>
);

export default PropertyHost;
