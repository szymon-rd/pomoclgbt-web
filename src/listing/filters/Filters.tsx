import React from 'react';
import './Filters.css'
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Dispatch } from 'redux';
import { setFiltersShown, setFilterFlags, setLocation, setType } from '../../model/actions';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Link
} from "react-router-dom";
import {AppState, FlagFiltersState, HelpType, HelpFilter} from "../../model/types"
import {HelpFiltersForType, Cities, HelpFilters} from "../../model/constants"
import {getHelpFilters} from "../../model/selectors"
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { Location } from '../../model/types'

const FadeInDuration = 600

interface ComponentProps {
  hideFilters: () => void,
  setFilterFlags: (filters: FlagFiltersState) => void,
  setLocation: (location: Location) => void,
  setSearch: (search: string) => void,
  setHelpType: (helpType: HelpType) => void,
  filtersShown: boolean
  helpType: HelpType,
  location: Location,
  filters: FlagFiltersState,
  search: string
}

const Component = ({
  hideFilters,
  setFilterFlags,
  setLocation,
  setSearch,
  setHelpType,
  filtersShown,
  helpType,
  location,
  filters,
  search
}: ComponentProps) => {

  const [currentHelpType, setCurrentHelpType] = React.useState(helpType)
  const [currentLocation, setCurrentLocation] = React.useState(location)
  const [currentFilters, setCurrentFilters] = React.useState(filters)
  const [currentSearch, setCurrentSearch] = React.useState(search)

  const setValuesAndClose = () => {
    setFilterFlags(currentFilters)
    setLocation(currentLocation)
    setHelpType(currentHelpType)
    setSearch(currentSearch)
    hideFilters()
  }

  const componentRef = React.useRef(null)

  React.useEffect(() => {
    const handleClick = (e: any) => {
      if(
        (componentRef.current &&
        !(componentRef.current as any).contains(e.target)) &&
        !(e.target.id.startsWith('location-combo-option'))
      ){
        hideFilters()
      }
    }
    document.addEventListener('mousedown', handleClick, false)
    return () => {
      document.removeEventListener('mousedown', handleClick, false)
    }
  }, [])

  const [showOptions, setShowOptions] = React.useState(false);
  React.useEffect(() => {
    if(!filtersShown) setShowOptions(false)
    else {
      const timer = setTimeout(() => setShowOptions(true), FadeInDuration)
      return () => clearTimeout(timer)
    }
  }, [filtersShown])

  const shownClass = filtersShown ? ['shown'] : []
  return (
    <div ref={componentRef} className={["filters"].concat(shownClass).join(' ')}>
      {showOptions && (
        <div className="filtersGroup">
          <div className="buttons">
            <Button className="button" variant="contained" onClick={hideFilters}>Anuluj</Button>
            <Button className="button" variant="contained" onClick={setValuesAndClose} color="primary">Wyszukaj</Button>
          </div>
          <div className="search">
            <a>Szukaj:</a>
            <TextField
              onChange={(ev) => {setCurrentSearch(ev.target.value)}}
              className="inputSearch"
              id="standard-basic"
              label=""
              value={currentSearch}
            />
          </div>
          <div className="helpType">
            <a>Typ pomocy:</a>
            <ButtonGroup className="helpTypeButtons" color="primary" aria-label="outlined primary button group">
              <Button
                onClick={() => {setCurrentHelpType(HelpType.EMOTIONS)}}
                variant={currentHelpType == HelpType.EMOTIONS ? "contained" : "outlined"}
              >
                Emocje
              </Button>
              <Button
                onClick={() => {setCurrentHelpType(HelpType.LAW)}}
                variant={currentHelpType == HelpType.LAW ? "contained" : "outlined"}
              >
                Prawo
              </Button>
            </ButtonGroup>
          </div>
          <div className="city">
            <a>Miasto</a>
            <Autocomplete
              id="location-combo"
              options={Cities}
              className="selectCity"
              getOptionLabel={option => option?.name as string}
              onChange={(event: any, value: any) => { setCurrentLocation(value) }}
              value={currentLocation}
              renderInput={params => (
                <TextField {...params} label="" color="primary" variant="standard" fullWidth />
              )}
            />
          </div>
          <div className="options">
            <a>Filtry</a>
            <FormGroup>
              {HelpFiltersForType[currentHelpType].map(filter => (
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={currentFilters[filter.stateVar]}
                      onChange={() => {
                        const stateCopy = {...currentFilters}
                        stateCopy[filter.stateVar] = !stateCopy[filter.stateVar]
                        setCurrentFilters(stateCopy)
                      }}
                    />
                  }
                  label={filter.name}
                />
              ))}
            </FormGroup>
          </div>
        </div>
      )}
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hideFilters: () => dispatch(setFiltersShown(false)),
  setFilterFlags: (flags: FlagFiltersState) => dispatch(setFilterFlags(flags)),
  setLocation: (location: Location) => dispatch(setLocation(location)),
  setHelpType: (helpType: HelpType) => dispatch(setType(helpType)),
  setSearch: (search: string) => {}
})

const mapStateToProps = (state: AppState) => ({
  filtersShown: state.filters.filtersShown,
  helpType: state.filters.helpType,
  location: state.filters.city,
  filters: state.filters.flags,
  search: ""
})

export const Filters = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
