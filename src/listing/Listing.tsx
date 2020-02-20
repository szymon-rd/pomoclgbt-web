import React from 'react';
import './Listing.css'
import { Background } from './Background';
import {useSpring, animated} from 'react-spring'
import { Location } from '../model/types'
import {useParams} from "react-router-dom";
import { List } from "./list/List"
import { Hamburger } from "./Hamburger"
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { appStore } from "../model/state"
import { Filters } from './filters/Filters'

export interface ListingProps {
  city: Location
}

export const Listing = () => {
  const [listVisible, setListVisible] = React.useState(false)


  const listFadeIn = useSpring({
     opacity: listVisible ? 1 : 0
  })

  React.useEffect(() => {
    const timers = [
      setTimeout(() => setListVisible(true), 1000),
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
      <animated.div style={listFadeIn} className="listingView">
        {listVisible && (<List></List>)}
        <Hamburger></Hamburger>
        <Filters></Filters>
      </animated.div>
    </div>
  )
}
