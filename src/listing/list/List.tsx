import React, { Fragment } from 'react';
import './List.css'
import {useSpring, animated} from 'react-spring'
import { Location, AppState, FlagFiltersState, HelpType } from '../../model/types'
import { Tile } from './Tile'
import { connect } from 'react-redux';
import { SampleInstitutions } from '../../model/constants';

interface ComponentProps {
  helpType: HelpType,
  filters: FlagFiltersState,
  search: string,
  location: Location
}

const Component = ({helpType, filters, search, location}: ComponentProps) => {
  const institutions = SampleInstitutions;
  return (
    <div className="list">
      {institutions.map(ins => (
        <Tile institution={ins}></Tile>
      ))}
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
