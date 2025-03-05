import { useState } from 'react'

import { Routes, Route } from 'react-router';
import { BrowserRouter, NavLink } from 'react-router-dom';

import './App.css'

import PageSeminars from './components/PageSeminars'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <div >
              <BrowserRouter>
                 
                  <main>
                      <Routes>
                          <Route path="/" element={<PageSeminars />} />
                         
                      </Routes>


                  </main>
                
              </BrowserRouter>
          </div>
    </>
  )
}

export default App
