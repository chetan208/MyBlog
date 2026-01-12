

import { Header,Footer,ScrollToTop,About} from './components'
import { Outlet } from "react-router-dom";
import { useEffect } from 'react';
import checkAuth from './services/auth/checkAuth';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeProvider } from "./components/theme-provider"





function App() {
  window.addEventListener('load', () => {
    // 50ms delay ensures all images/fonts are loaded
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 5);
});
 
  const dispatch = useDispatch()

  useEffect(() => {

    checkAuth(dispatch)

  }, [])



  return (
    
      
       <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <Header />
        <ScrollToTop/>
        <Outlet />
        <Footer />
      </div>
    </ThemeProvider>
    
  )
}

export default App
