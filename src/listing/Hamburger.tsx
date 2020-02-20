import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { setFiltersShown } from '../model/actions';
import { AppState } from '../model/types';

interface ComponentProps {
  onClick: any
}

const Component = ({onClick} : ComponentProps) => {
  return (
    <div className="hamburger" onClick={() => onClick()}>
      <MenuIcon></MenuIcon>
    </div>
  )
}

const mapStateToProps = (state: AppState) => {
  return {}
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClick: () => dispatch(setFiltersShown(true))
  }
}

export const Hamburger = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
