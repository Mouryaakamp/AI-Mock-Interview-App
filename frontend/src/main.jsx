import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Usecontext from './context/Usecontext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Usecontext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Usecontext>
  </React.StrictMode>,

)
