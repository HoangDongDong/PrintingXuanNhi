import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Pricing from './pages/Pricing';
import News from './pages/News';
import Contact from './pages/Contact';
import PrecisionPrint from './pages/PrecisionPrint';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#F8F9FD] font-sans">
        {/* Header hiển thị cố định ở đầu trang */}
        <Header />
        
        {/* Phần nội dung thay đổi theo Route */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gioi-thieu" element={<About />} />
            <Route path="/san-pham" element={<Products />} />
            <Route path="/san-pham/:id" element={<ProductDetail />} />
            <Route path="/bang-gia" element={<Pricing />} />
            <Route path="/tin-tuc" element={<News />} />
            <Route path="/lien-he" element={<Contact />} />
            <Route path="/tinh-gia" element={<PrecisionPrint />} />
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
