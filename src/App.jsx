import React, { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import useOscillatingValue from "./hooks/useOscillatingValue"
import ColorService from "./service/ColorService"

const App = () => {
  const [time, setTime] = useState({
    hours: new Date().getHours().toString().padStart(2, "0"),
    minutes: new Date().getMinutes().toString().padStart(2, "0"),
    seconds: new Date().getSeconds().toString().padStart(2, "0"),
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime({
        hours: new Date().getHours().toString().padStart(2, "0"),
        minutes: new Date().getMinutes().toString().padStart(2, "0"),
        seconds: new Date().getSeconds().toString().padStart(2, "0"),
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const red = useOscillatingValue(time.hours, 23)
  const green = useOscillatingValue(time.minutes, 59)
  const blue = useOscillatingValue(time.seconds, 59)

  const backgroundColor = `rgb(${Math.floor(red)}, ${Math.floor(
    green
  )}, ${Math.floor(blue)})`

  const textColor = useMemo(
    () => ColorService.getContrastingColor(red, green, blue),
    [red, green, blue]
  )

  return (
    <motion.div
      className="w-screen h-screen flex items-center justify-center"
      animate={{ backgroundColor }}
      transition={{ duration: 1 }}
    >
      <div
        className="h-full absolute flex flex-col justify-center z-[2] opacity-40"
        style={{ color: textColor }}
      >
        <div className="kanit-bold text-[240px]">
          {time.hours}:{time.minutes}:{time.seconds}
        </div>
      </div>
      <div
        className="absolute bottom-4 right-4 text-right flex flex-col gap-1 z-[4]"
        style={{ color: textColor }}
      >
        <div className="kanit-medium text-[40px] leading-[40px]">
          "RGB Clock"
        </div>
      </div>
    </motion.div>
  )
}

export default App
