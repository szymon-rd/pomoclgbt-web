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
import {HelpType, Cities} from "../model/types"

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));


export const Welcome = () => {
  const classes = useStyles();

  const [type, setType] = useState(HelpType.NONE);
  const [city, setCity] = useState(null as any)

  const cityStyle = useSpring({opacity: type == HelpType.NONE ? 0 : 1})
  const lawStyle = useSpring({opacity: type != HelpType.EMOTIONS ? 1 : 0.3})
  const emotionsStyle = useSpring({opacity: type != HelpType.LAW ? 1 : 0.3})
  const continueStyle = useSpring({opacity: city == null ? 0 : 1})

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
          {type == HelpType.EMOTIONS ?
            ("Terapeuci, psychologowie, organizacje pomocy, psychiatrzy, ...")
            : ("Prawnicy, kancelarie, organizacje pomocy, ...")}
         </div>
          <Autocomplete
            id="combo-box-demo"
            options={Cities}
            className="selectCity"
            getOptionLabel={option => option}
            style={{ width: 300 }}
            onChange={setCity}
            renderInput={params => (
              <TextField {...params} label="Skąd jesteś?" color="primary" variant="outlined" fullWidth />
            )}
          />
        </animated.div>
      ) : <Fragment></Fragment>}
      <div className="continue">
        {(city != null) ? (
        <Link to="/list">
          <AnimatedButton style={continueStyle} size="large" variant="contained" color="primary" className={classes.margin}>
              Dalej
          </AnimatedButton>
        </Link>
        ) : <Fragment></Fragment>}
      </div>
    </div>
  )
}
