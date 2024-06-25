import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

const App = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  const red = Math.floor((hours / 23) * 255)
  const green = Math.floor((minutes / 59) * 255)
  const blue = Math.floor((seconds / 59) * 255)

  const backgroundColor = `rgb(${red}, ${green}, ${blue})`
  const hourRotation = (hours / 12) * 360
  const minuteRotation = (minutes / 60) * 360
  const secondRotation = (seconds / 60) * 360

  return (
    <motion.div
      className="w-screen h-screen flex items-center justify-center"
      animate={{ backgroundColor }}
      transition={{ duration: 1 }}
    >
      <div className="flex space-x-4">
        <Triangle rotation={hourRotation} color="red" />
        <Triangle rotation={minuteRotation} color="green" />
        <Triangle rotation={secondRotation} color="blue" />
      </div>
    </motion.div>
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
        className="w-16 h-16 border-black border-2 border-l-8 border-r-8 border-b-60 "
        style={{ borderBottomColor: color }}
      ></div>
    </motion.div>
  )
}

export default App
