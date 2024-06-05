import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'
import Header from './components/Header'
import Home from './containers/Home'
import { PreferenceProvider } from './context/PreferenceProvider'

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PreferenceProvider>
        <Header
          title="IoT Demo Project"
          repo="https://github.com/TomNuttall/iot-temp-sensor"
        />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </PreferenceProvider>

      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}

export default App
