import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Detail from './Pages/Detail'
import Home from './Pages/Home'
import Header from './Components/Header'
import Footer from './Components/Footer'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinId" element={<Detail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App