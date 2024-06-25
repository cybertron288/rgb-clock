import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import useOscillatingValue from "./hooks/useOscillatingValue"
import ColorService from "./service/ColorService"

const App = () => {
  const [hours, setHours] = useState(new Date().getHours())
  const [minutes, setMinutes] = useState(new Date().getMinutes())
  const [seconds, setSeconds] = useState(new Date().getSeconds())

  const { getContrastingColor } = ColorService

  useEffect(() => {
    const interval = setInterval(() => {
      setHours(new Date().getHours())
      setMinutes(new Date().getMinutes())
      setSeconds(new Date().getSeconds())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const red = useOscillatingValue(hours, 23)
  const green = useOscillatingValue(minutes, 59)
  const blue = useOscillatingValue(seconds, 59)

  const backgroundColor = `rgb(${Math.floor(red)}, ${Math.floor(
    green
  )}, ${Math.floor(blue)})`
  const hourRotation = (hours / 12) * 360
  const minuteRotation = (minutes / 60) * 360
  const secondRotation = (seconds / 60) * 360

  return (
    <>
      <motion.div
        className="w-screen h-screen flex items-center justify-center"
        animate={{ backgroundColor }}
        transition={{ duration: 1 }}
      >
        {/* <div className="flex space-x-4 relative z-10">
          <Triangle rotation={hourRotation} color="red" />
          <Triangle rotation={minuteRotation} color="green" />
          <Triangle rotation={secondRotation} color="blue" />
        </div> */}
        <div className="h-full absolute flex flex-col justify-center z-[2] opacity-40">
          <div className="kanit-bold text-[240px]">
            {hours}:{minutes}:{seconds}
          </div>
        </div>
        <div
          className={`absolute bottom-4 right-4 text-right flex flex-col gap-1 z-[4] text-[${getContrastingColor(
            red,
            green,
            blue
          )}] z-2`}
        >
          <div className="kanit-medium text-[40px] leading-[40px]">
            "RGB Clock"
          </div>
        </div>
      </motion.div>
    </>
  )
}

const Triangle = ({ rotation, color }) => {
  return (
    <motion.div
      className="w-60 h-60 flex items-center justify-center"
      animate={{ rotate: rotation }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div
        className="w-16 h-16 border-black border-2 border-b-60"
        style={{ borderBottomColor: color }}
      ></div>
    </motion.div>
  )
}

export default App
