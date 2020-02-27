import React, { Fragment } from 'react';
import './List.css'
import {useSpring, animated} from 'react-spring'
import { Location, AppState, FlagFiltersState, HelpType } from '../../model/types'
import { Tile } from './Tile'
import { connect } from 'react-redux';
import { SampleInstitutions, InstitutionsPerPage } from '../../model/constants';
import { TileMobile } from './TileMobile';
import { InstitutionService } from '../../service/institutionService';

interface ComponentProps {
  helpType: HelpType,
  filters: FlagFiltersState,
  search: string,
  location: Location,
  mobile: boolean,
  page: number
}

const institutionService = new InstitutionService()

const Component = ({helpType, filters, search, location, mobile, page}: ComponentProps) => {
  const institutions = SampleInstitutions;
  const start = page * InstitutionsPerPage;
  const end = start + InstitutionsPerPage - 1;
  return (
    <div className="list"> {
      institutionService.fetchInstitutions(
        helpType,
        filters,
        location,
        search,
        start,
        end
      ).map(ins =>
        mobile ? (<TileMobile institution={ins}></TileMobile>) : (<Tile institution={ins}></Tile>)
      )
    } </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  helpType: state.filters.helpType,
  filters: state.filters.flags,
  search: "",
  location: state.filters.city,
  mobile: state.layout.mobile,
  page: state.filters.page
})

export const List = connect(
  mapStateToProps
)(Component)
