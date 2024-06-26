import { useState, useEffect } from "react"

/**
 * Generates an oscillating value based on the current value and maximum value, mapped within the range of 0 to 255.
 *
 * @param {number} currentValue - The current value.
 * @param {number} maxValue - The maximum value for the oscillation.
 * @return {number} The oscillating value between 0 and 255.
 */
function useOscillatingValue(currentValue, maxValue) {
  const [mappedValue, setMappedValue] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for forward, -1 for backward

  useEffect(() => {
    const ratio = currentValue / maxValue

    const newMappedValue = Math.round(ratio * 255)

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
