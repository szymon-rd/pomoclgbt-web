import React, { Fragment } from 'react';
import './List.css'
import {useSpring, animated} from 'react-spring'
import { Location, AppState, FlagFiltersState, HelpType } from '../../model/types'
import { Tile } from './Tile'
import { connect } from 'react-redux';
import { SampleInstitutions } from '../../model/constants';
import { TileMobile } from './TileMobile';

interface ComponentProps {
  helpType: HelpType,
  filters: FlagFiltersState,
  search: string,
  location: Location,
  mobile: boolean
}

const Component = ({helpType, filters, search, location, mobile}: ComponentProps) => {
  const institutions = SampleInstitutions;
  return (
    <div className="list">
      { institutions.map(ins =>
      mobile ? (<TileMobile institution={ins}></TileMobile>) : (<Tile institution={ins}></Tile>))}
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  helpType: state.filters.helpType,
  filters: state.filters.flags,
  search: "",
  location: state.filters.city,
  mobile: state.layout.mobile
})

export const List = connect(
  mapStateToProps
)(Component)
