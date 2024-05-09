import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './containers/Home'

const App: React.FC = () => {
  return (
    <>
      <Header
        title="IoT Demo Project"
        repo="https://github.com/TomNuttall/iot-temp-sensor"
      />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
