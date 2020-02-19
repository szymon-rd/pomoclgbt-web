import React from 'react';
import './Listing.css'
import { Background } from './Background';
import {useSpring, animated} from 'react-spring'
import { Location } from '../model/types'
import {useParams} from "react-router-dom";
import { List } from "./list/List"

export interface ListingProps {
  city: Location
}

export const Listing = () => {

  const [labelVisible, setLabelVisible] = React.useState(false)
  const [listVisible, setListVisible] = React.useState(true)

  const labelFadeIn = useSpring({
     opacity: labelVisible ? 0 : 0
  })

  const listFadeIn = useSpring({
     opacity: listVisible ? 1 : 1
  })

  React.useEffect(() => {
    const timers = [
      setTimeout(() => setLabelVisible(true), 1000),
      setTimeout(() => setLabelVisible(false), 3000),
      setTimeout(() => setListVisible(true), 3500),
    ]
    return () => {
      timers.forEach(
        timer => clearTimeout(timer)
      )
    }
  }, [])


  return (
    <div>
      <Background></Background>
      <animated.div style={labelFadeIn} className="labelView">
        <div className="helpLabel">Pomoc i organizacje w Krakowie</div>
      </animated.div>
      <animated.div style={listFadeIn} className="listingView">
        {listVisible && (<List></List>)}
      </animated.div>
    </div>
  )
}
