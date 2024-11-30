import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ItemProvider } from './context/ItemProvider';
import Header from './components/Header';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Favorites from './pages/Favorites';

const App: React.FC = () => {
  return (
    <ItemProvider>
      <Router>
        <div className="w-full max-w-[1000px] px-10 min-h-screen mx-auto light">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </Router>
    </ItemProvider>
  );
};

export default App;