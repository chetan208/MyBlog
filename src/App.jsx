
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Header,Footer } from './components'
import { Outlet } from "react-router-dom";
import { useEffect } from 'react';
import checkAuth from './services/auth/checkAuth';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from "./components";




function App() {
 

  const dispatch = useDispatch()

  useEffect(() => {

    checkAuth(dispatch)

  }, [])

  

  return (
    <>
      <div>
        <Header />
        <ScrollToTop/>
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default App
