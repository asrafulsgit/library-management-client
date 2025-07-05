import { Outlet } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Toastify from './utilities/Toastify'
import ScrollVehaviour from './utilities/ScrollVehaviour'

function App() {
  return (
    <>
    <ScrollVehaviour />
    <Toastify />

       <Navbar />
       <Outlet />
       <Footer />
    </>
  )
}

export default App
