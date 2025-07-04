import { Outlet } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Toastify from './utilities/Toastify'

function App() {
  return (
    <>
    <Toastify />

       <Navbar />
       <Outlet />
       <Footer />
    </>
  )
}

export default App
