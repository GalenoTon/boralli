// src/App.tsx
// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Estabelecimentos from './pages/Estabelecimentos';
import Estabelecimento from './pages/Estabelecimento';
import Produtos from './pages/Produtos';
import Produto from './pages/Produto';
import Promocoes from './pages/Promocoes';
import Promocao from './pages/Promocao';
import Favoritos from './pages/Favoritos';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardEstabelecimentos from './pages/dashboard/DashboardEstabelecimentos';
import DashboardEstabelecimentoEdit from './pages/dashboard/DashboardEstabelecimentoEdit';
import DashboardProdutos from './pages/dashboard/DashboardProdutos';
import DashboardPromocoes from './pages/dashboard/DashboardPromocoes';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/estabelecimentos" element={<Estabelecimentos />} />
          <Route path="/estabelecimento/:id" element={<Estabelecimento />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produto/:id" element={<Produto />} />
          <Route path="/promocoes" element={<Promocoes />} />
          <Route path="/promocao/:id" element={<Promocao />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="estabelecimentos" element={<DashboardEstabelecimentos />} />
            <Route path="estabelecimentos/:id/edit" element={<DashboardEstabelecimentoEdit />} />
            <Route path="produtos" element={<DashboardProdutos />} />
            <Route path="promocoes" element={<DashboardPromocoes />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
