import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import { AddBlog, ViewBlog, About } from './components/index.js';
import Home from './pages/Home.jsx'
import Protected from './protect.jsx';
import EditBlog from './components/Blog/EditBlog.jsx';
import BlogExplorer from './pages/BlogExplore.jsx';
import VerifyEmail from './pages/verifyImage.jsx';
import SetupProfile from './pages/SetUpProfile.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [

      { path: "/", element: (<Home />) },

      { path: "/login", element: (<Login />) },

      {
        path: "/signup",
        element: (<Signup />),

      },

      { path: '/signup/verify-account/:email', element: (<VerifyEmail />) },
      {path:'/setup-profile/:email',element:(<SetupProfile/>)},
      { path: "blog/:id", element: (<ViewBlog />) },

      { path: "/about", element: (<About />) },

      { path: "/blogs", element: (<BlogExplorer />) },
      // Protected routes
      {
        element: <Protected />, // <-- wraps all protected routes
        children: [
          { path: '/add-blog', element: <AddBlog /> },
          { path: '/edit-blog/:id', element: (<EditBlog />) }
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
