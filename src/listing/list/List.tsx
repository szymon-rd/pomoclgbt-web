import React from 'react';
import './List.css'
import {useSpring, animated} from 'react-spring'
import { Location } from '../../model/types'
import { Tile } from './Tile'

export const List = () => {
  return (
    <div className="list">
      <Tile></Tile>
      {[...Array(15)].map( n => (<Tile></Tile>))}
    </div>
  )
}
