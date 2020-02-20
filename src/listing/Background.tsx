import React from 'react';
import {useSprings, animated, useSpring} from 'react-spring'

const rainbow = [
  {id: 0, color: "#ca3733"},
  {id: 1, color: "#68307d"},
  {id: 2, color: "#4561a7"},
  {id: 3, color: "#397c45"},
  {id: 4, color: "#efe44e"},
  {id: 5, color: "#e78d3e"},
  {id: 6, color: "#ca3733"},
]

const partialSums = (a: number[]): number[] => {
  var sum = 0;
  var sums: number[] = []
  for (const v of a) {
    sums.push(sum)
    sum += v;
  }
  return sums
}

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

  const duration = 70
  const springsStart: any = useSprings(rainbow.length, rainbow.map(({id, color}) => ({
    from: {
      scale: 0,
    },
    to: {
      scale: 1,
    },
    delay: id * duration,
  })))

  const springMiddle = useSpring({
    from: {
      scale: 0,
    },
    scale: 1,
    delay: rainbow.length * duration,
  })

  const springsEnd: any = useSprings(rainbow.length, rainbow.map(({id, color}) => ({
    from: {
      scale: 0,
    },
    to: {
      scale: 1,
    },
    delay: (id + rainbow.length) * duration,
  })))


  const stripWidth = 0.03
  const positions: number[] = partialSums(rainbow.map(p => stripWidth))

  return (
    <div className="background">
      {rainbow.map(({id, color}) => (
          <animated.div className="bcTile" style={{
            left: dimensions.width * positions[id] - dimensions.height,
            width: dimensions.width * stripWidth,
            top: -dimensions.height,
            position: "fixed",
            bottom: 0,
            backgroundColor: color,
            transform: springsStart[id].scale.interpolate((s: number) => `skewX(45deg) scaleY(${s})`),
          }}></animated.div>
        )
      ).concat(
        <animated.div className="bcTile" style={{
            left: dimensions.width * (stripWidth * rainbow.length) - dimensions.height,
            right: dimensions.width * (stripWidth * rainbow.length),
            top: -dimensions.height,
            position: "fixed",
            bottom: 0,
            backgroundColor: "#FFFFFF",
            transform: springMiddle.scale.interpolate((s: any) => `skewX(45deg) scaleY(${s})`),
          }}></animated.div>
      ).concat(
        rainbow.map(({id, color}) => (
          <animated.div className="bcTile" style={{
            right: dimensions.width * positions[id],
            width: dimensions.width * stripWidth,
            top: -dimensions.height,
            position: "fixed",
            bottom: 0,
            backgroundColor: color,
            transform: springsEnd[rainbow.length - id - 1].scale.interpolate((s: number) => `skewX(45deg) scaleY(${s})`),
          }}></animated.div>
        ))
      )}
    </div>
  )
}
