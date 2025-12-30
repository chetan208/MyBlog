import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import  store  from "./store/store.js";
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

import { AddBlog, ViewBlog } from './components/index.js';
import Home from './pages/Home.jsx'
import Protected from './protect.jsx';

const router= createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:"/",
        element:(<Home />)
      },

      {
        path:"/login",
        element: (<Login/>)
      },

      {
        path:"/signup",
        element:(<Signup/>)
      },

      {
        path:"/add-blog",
        element:(
        
          <Protected authentication={true}>
              <AddBlog />
          </Protected>
        

        )
      },

      {
        path:"blog/:id",
        element:(
              <ViewBlog />
        )
      },

    ]
  }
])

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
       <RouterProvider router={router}/>
    </Provider>
   
  
)
