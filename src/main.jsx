import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";


import { AddBlog, ViewBlog, About } from './components/index.js';
import Home from './pages/Home.jsx'
import Protected from './protect.jsx';
import EditBlog from './components/Blog/EditBlog.jsx';
import BlogExplorer from './pages/BlogExplore.jsx';
import VerifyEmail from './components/Auth/VerifyEmail.jsx';

import AuthPage from './pages/AuthPage.jsx';
import LoginForm from './components/Auth/LoginForm.jsx';
import Setup from './components/Auth/Setup.jsx';
import SignupForm from './components/Auth/SignupForm.jsx';
import SettingsPage from './pages/Settings.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [

      { path: "/", element: (<Home />) },

    

     

      {
        path:'/user',
        element:<AuthPage/>,
        children:[
          {path:'signup',element:(<SignupForm/>)},
          {path:'login',element:(<LoginForm/>)},
          {path:'verify/:email',element:(<VerifyEmail/>)},
          {path:'setup/:email',element:(<Setup/>)}
        ]
      },


      
      { path: "blog/:id", element: (<ViewBlog />) },

      { path: "/about", element: (<About />) },

      { path: "/blogs", element: (<BlogExplorer />) },
      // Protected routes
      {
        element: <Protected />, // <-- wraps all protected routes
        children: [
          { path: '/add-blog', element: <AddBlog /> },
          { path: '/edit-blog/:id', element: (<EditBlog />) },
          {path:'/settings',element: <SettingsPage/>}
        ],
      },



    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>


)
