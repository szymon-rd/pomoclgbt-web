import React from 'react';
import './Filters.css'
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';
import { AppState } from '../../model/types';
import Button from '@material-ui/core/Button';
import { Dispatch } from 'redux';
import { setFiltersShown } from '../../model/actions';

interface ComponentProps {
  filtersShown: boolean
  hideFilters: () => void
}

const Component = ({filtersShown, hideFilters}: ComponentProps) => {
  const componentRef = React.useRef(null)
  React.useEffect(() => {
    const handleClick = (e: any) => {
      if(
        componentRef.current &&
        !(componentRef.current as any).contains(e.target)
      ){
        hideFilters()
      }
    }
    document.addEventListener('mousedown', handleClick, false)
    return () => {
      document.removeEventListener('mousedown', handleClick, false)
    }
  }, [])

  const shownClass = filtersShown ? ['shown'] : []
  return (
    <div ref={componentRef} className={["filters"].concat(shownClass).join(' ')}>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hideFilters: () => dispatch(setFiltersShown(false))
})

const mapStateToProps = (state: AppState) => ({
  filtersShown: state.filters.filtersShown
})

export const Filters = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
