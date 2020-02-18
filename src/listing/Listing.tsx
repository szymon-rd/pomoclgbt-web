import React from 'react';
import './Listing.css'
import { Background } from './Background';
import {useSpring, animated} from 'react-spring'
import { Location } from '../model/types'
import {useParams} from "react-router-dom";

export interface ListingProps {
  city: Location
}

export const Listing = () => {

  const viewFadeIn = useSpring({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    },
    delay: 1500
  })


  return (
    <div>
      <Background></Background>
      <animated.div style={viewFadeIn} className="listingView">
        <div className="helpLabel">Pomoc i organizacje w Krakowie</div>
      </animated.div>
    </div>
  )
}
