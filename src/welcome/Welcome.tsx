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
import {HelpType, Cities, HelpSubTypes, AllSubTypes} from "../model/types"
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const subTypesQuery = (type: HelpType, subtypes: boolean[]): string => {
 return HelpSubTypes[type].filter(
    type => subtypes[type.id]
  ).map(
    type => `${type.label}=true`
  ).join('&')
}

export const Welcome = () => {
  const classes = useStyles();

  const [type, setType] = useState(HelpType.NONE);
  const [city, setCity] = useState(null as any)
  const [subtypes, setSubtypes] = useState(AllSubTypes.map(a => true))

  const cityStyle = useSpring({opacity: type == HelpType.NONE ? 0 : 1})
  const lawStyle = useSpring({opacity: type != HelpType.EMOTIONS ? 1 : 0.3})
  const emotionsStyle = useSpring({opacity: type != HelpType.LAW ? 1 : 0.3})
  const continueStyle = useSpring({opacity: city == null ? 0 : 1})

  const onCityChange = (event: any, values: any) => {
    setCity(values)
  }

  const AnimatedButton = animated(Button);
  console.log(city?.values)
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
          {HelpSubTypes[type].map(subType =>  (
            <FormControlLabel
              control={
                <Checkbox
                  checked={subtypes[subType.id]}
                  onChange={() => {
                    var arr = subtypes.slice()
                    arr[subType.id] = !arr[subType.id]
                    console.log(arr)
                    setSubtypes(arr)
                  }}
                  value="checkedB"
                  color="primary"
                />
              }
              label={subType.name}
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
        <Link to={`/list?city=${city.id}&type=${type}&${subTypesQuery(type, subtypes)}`}>
          <AnimatedButton style={continueStyle} size="large" variant="contained" color="primary" className={classes.margin}>
              Dalej
          </AnimatedButton>
        </Link>
        ) : <Fragment></Fragment>}
      </div>
    </div>
  )
}
