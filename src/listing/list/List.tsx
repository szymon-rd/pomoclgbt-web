import React from 'react';
import './List.css'
import {useSpring, animated} from 'react-spring'
import { Location, AppState, FlagFiltersState, HelpType } from '../../model/types'
import { Tile } from './Tile'
import { connect } from 'react-redux';

interface ComponentProps {
  helpType: HelpType,
  filters: FlagFiltersState,
  search: string,
  location: Location
}

const Component = ({helpType, filters, search, location}: ComponentProps) => {
  return (
    <div className="list">
      {helpType + " " + JSON.stringify(filters) + " " + search + " " + JSON.stringify(location)}
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  helpType: state.filters.helpType,
  filters: state.filters.flags,
  search: "",
  location: state.filters.city
})

export const List = connect(
  mapStateToProps
)(Component)
