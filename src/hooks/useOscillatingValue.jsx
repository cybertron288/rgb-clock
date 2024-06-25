import { useState, useEffect } from "react"

function useOscillatingValue(currentValue, maxValue) {
  const [mappedValue, setMappedValue] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for forward, -1 for backward

  useEffect(() => {
    // Calculate the ratio of the current value to the max value
    const ratio = currentValue / maxValue

    // Calculate the mapped value between 0 and 255
    const newMappedValue = Math.round(ratio * 255)

    // Update the mapped value based on the direction
    if (direction === 1) {
      setMappedValue(newMappedValue)
      if (currentValue === maxValue) {
        setDirection(-1)
      }
    } else {
      setMappedValue(255 - newMappedValue)
      if (currentValue === maxValue) {
        setDirection(1)
      }
    }
  }, [currentValue, maxValue, direction])

  return mappedValue
}

export default useOscillatingValue
