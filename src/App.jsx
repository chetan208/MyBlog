
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Header,Footer,ScrollToTop,About} from './components'
import { Outlet } from "react-router-dom";
import { useEffect } from 'react';
import checkAuth from './services/auth/checkAuth';
import { useDispatch, useSelector } from 'react-redux';






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
