import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50">
        {/* Header hiển thị cố định ở đầu trang */}
        <Header />
        
        {/* Phần nội dung thay đổi theo Route */}
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        
        {/* Footer hiển thị cố định ở chân trang */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
