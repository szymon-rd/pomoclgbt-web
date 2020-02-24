import React from 'react';
import { connect } from 'react-redux';
import { AppState } from './model/types';
import { Action, setMobile as setMobileState} from './model/actions';

interface ComponentProps {
  setMobileState: (mobile: boolean) => void
}
const Component = ({setMobileState}: ComponentProps) => {

  const [mobile, setMobile] = React.useState(false)

  const handleResize = () => {
    const width = window.innerWidth
    const currentMobile = width < 728
    if(mobile != currentMobile) {
      setMobile(currentMobile)
      setMobileState(currentMobile)
    }
  }

  React.useEffect(() => {
    handleResize()
  }, [])

  React.useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
    <div></div>
  )
}


export const MobileSiteIndicator = connect(
  (state) => ({}),
  (dispatch) => ({
    setMobileState: (mobile: boolean) => dispatch(setMobileState(mobile))
  })
)(Component)
