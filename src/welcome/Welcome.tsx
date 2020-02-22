import React, { useState, Fragment } from 'react';
import {useSpring, animated} from 'react-spring'
import './Welcome.css'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GavelIcon from '@material-ui/icons/Gavel';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Link
} from "react-router-dom";
import {HelpType} from "../model/types"
import {Cities, HelpFilters, HelpFiltersForType, helpFiltersArrayToState} from "../model/constants"
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import { Action, setLocation, setType as setHelpType, setFilterFlags } from '../model/actions';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const filtersQuery = (type: HelpType, filters: boolean[]): string => {
 return HelpFiltersForType[type].filter(
    filter => filters[filter.id]
  ).map(
    filter => `${filter.label}=true`
  ).join('&')
}

interface ComponentProps {
  dispatch: (action: Action) => void
}

const Component = ({dispatch}: ComponentProps) => {
  const classes = useStyles();

  const [type, setType] = useState(HelpType.NONE);
  const [city, setCity] = useState(null as any)
  const [filters, setFilters] = useState(HelpFilters.map(a => true))

  const cityStyle = useSpring({opacity: type == HelpType.NONE ? 0 : 1})
  const lawStyle = useSpring({opacity: type != HelpType.EMOTIONS ? 1 : 0.3})
  const emotionsStyle = useSpring({opacity: type != HelpType.LAW ? 1 : 0.3})
  const continueStyle = useSpring({opacity: city == null ? 0 : 1})

  const onCityChange = (event: any, values: any) => {
    setCity(values)
  }

  const updateState = () => {
    dispatch(setLocation(city))
    dispatch(setHelpType(type))
    dispatch(setFilterFlags(helpFiltersArrayToState(filters)))
  }

  const AnimatedButton = animated(Button);
  return (
    <div className="welcome">
      <div className="header">
        Jakiej pomocy szukasz?
      </div>
      <div className="selectType">
        <div className="emotionsBtn">
          <AnimatedButton style={emotionsStyle} onClick={() => setType(HelpType.EMOTIONS)} size="large" variant="contained" color="primary" className={classes.margin}>
            <FavoriteIcon /> &nbsp;&nbsp; Emocje
          </AnimatedButton>
        </div>
        <div className="lawBtn">
          <AnimatedButton style={lawStyle} onClick={() => setType(HelpType.LAW)} size="large" variant="contained" color="primary" className={classes.margin}>
            <GavelIcon /> &nbsp;&nbsp; Prawo
          </AnimatedButton>
        </div>
      </div>
      {(type != HelpType.NONE) ? (
       <animated.div className="cityStage" style={cityStyle}>
         <div>
          {HelpFiltersForType[type].map(filter =>  (
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters[filter.id]}
                  onChange={() => {
                    var arr = filters.slice()
                    arr[filter.id] = !arr[filter.id]
                    setFilters(arr)
                  }}
                  value="checkedB"
                  color="primary"
                />
              }
              label={filter.name}
            />
          ))}
         </div>
          <Autocomplete
            id="combo-box-demo"
            options={Cities}
            className="selectCity"
            getOptionLabel={option => option?.name as string}
            style={{ width: 300 }}
            onChange={onCityChange}
            renderInput={params => (
              <TextField {...params} label="Skąd jesteś?" color="primary" variant="outlined" fullWidth />
            )}
          />
        </animated.div>
      ) : <Fragment></Fragment>}
      <div className="continue">
        {(city != null) ? (
        <Link onClick={() => {updateState()}} to={`/list?city=${city.id}&type=${type}&${filtersQuery(type, filters)}`}>
          <AnimatedButton style={continueStyle} size="large" variant="contained" color="primary" className={classes.margin}>
              Dalej
          </AnimatedButton>
        </Link>
        ) : <Fragment></Fragment>}
      </div>
    </div>
  )
}

export const Welcome = connect(
  () => ({}),
  (dispatch) => ({dispatch})
)(Component)
