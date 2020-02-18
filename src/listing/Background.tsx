import React from 'react';
import {useSprings, animated} from 'react-spring'

const rainbow = [
  {id: 0, color: "#e40303"},
  {id: 1, color: "#ff8c00"},
  {id: 2, color: "#ffed00"},
  {id: 3, color: "#008026"},
  {id: 4, color: "#004dff"},
  {id: 5, color: "#750787"}
]
export const Background = () => {
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  React.useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })



  const stripWidth = dimensions.width / rainbow.length
  const springs = useSprings(rainbow.length, rainbow.map(({id, color}) => ({
    from: {
      top: dimensions.height,
    },
    to: {
      top: 0,
    },
    delay: id * 150,
  })))

  return (
    <div className="background">
      {rainbow.map(({id, color}) => (
          <animated.div className="bcTile" style={{
            left: stripWidth * id,
            width: stripWidth,
            position: "absolute",
            bottom: 0,
            backgroundColor: color,
            ...springs[id],
          }}></animated.div>
        )
      )}
    </div>
  )
}
