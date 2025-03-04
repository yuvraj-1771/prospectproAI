import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatScreen from './pages/ChatScreen';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatScreen />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;