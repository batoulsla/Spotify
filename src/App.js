import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/home'
import Albums from './components/Albums'

import Search from './components/search'

const App = () => {
  return (
    <div>
      <Router basename="/">
        <div style={{ paddingTop: '25px' }}>
          <Routes>
            {/* HomePage */}
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />

            {/* New Route for  Albums */}
            <Route path="/artist/:artistId/albums" element={<Albums />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
