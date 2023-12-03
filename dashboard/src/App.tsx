import Header from './components/Header'
import Home from './containers/Home'

const App: React.FC = () => {
  return (
    <>
      <Header
        title="IoT Demo Project"
        repo="https://github.com/TomNuttall/iot-temp-sensor"
      />
      <Home />
    </>
  )
}

export default App
