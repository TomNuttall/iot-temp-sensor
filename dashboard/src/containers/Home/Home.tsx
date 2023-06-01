import { useEffect, useState } from 'react'
import TempChart from '../../components/TempChart'

const Home = () => {
  const [tempData, setTempData] = useState([])

  useEffect(() => {
    const fetchTempData = async () => {
      const response = await fetch('https://api.iot.tomnuttall.dev')
      const jsonData = await response.json()
      setTempData(jsonData)
    }

    fetchTempData()
  }, [])

  return (
    <>
      <TempChart tempData={tempData} />
    </>
  )
}

export default Home
