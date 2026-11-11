import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Layout from './Layout.jsx'
import Home from "./Components/Home/Home.jsx"
import About from './Components/About/About.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'


const router =createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={< Layout />}>
    <Route path='' element={< Home />}/>
    <Route path='about' element={< About />}/>

    </Route>
    
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
