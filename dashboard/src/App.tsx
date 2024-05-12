import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './containers/Home'
import { PreferenceProvider } from './context/PreferenceProvider'

const App: React.FC = () => {
  return (
    <PreferenceProvider>
      <Header
        title="IoT Demo Project"
        repo="https://github.com/TomNuttall/iot-temp-sensor"
      />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </PreferenceProvider>
  )
}

export default App
